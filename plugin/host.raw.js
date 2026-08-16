const STORE_FILE = '.security-gate-store.json'
const OWN_TOOL_PREFIX = 'gate_'
const GATE_VERSION = 'v10'
const SEV_BOUNTY = { critical: 1000, high: 500, medium: 200, low: 50 }
const SEV_ORDER = { critical: 4, high: 3, medium: 2, low: 1 }
const REPORT_STATUSES = ['open', 'under-review', 'confirmed', 'dismissed', 'fixed', 'blacklisted']

const MALICIOUS_RULES = [
  { id: 'shell-exec', severity: 'high', weight: 22, label: '外部命令 / 进程执行', hint: '启动子进程、终端或系统命令（可能是经允许的子进程服务，需结合来源判断）', re: 'child_process|execSync|spawnSync|\\bspawn\\s*\\(|\\bpty\\b' },
  { id: 'dynamic-code', severity: 'critical', weight: 30, label: '动态代码执行', hint: 'eval / new Function 等运行时执行任意代码', re: '\\beval\\s*\\(|new\\s+Function\\b|new\\s+AsyncFunction|vm\\.runIn' },
  { id: 'fs-raw', severity: 'high', weight: 18, label: '原生文件系统访问', hint: '直接读写或删除本地文件', re: 'require\\s*\\(\\s*[\\x22\\x27]fs[\\x22\\x27]|node:fs|readFile|writeFile|unlinkSync|rmSync|mkdirSync' },
  { id: 'obfuscation', severity: 'high', weight: 15, label: '疑似混淆 / 编码载荷', hint: 'base64 解码、转义编码等可能隐藏恶意逻辑', re: '\\batob\\s*\\(|\\bbtoa\\s*\\(|base64|\\\\x[0-9a-fA-F]{2}|\\\\u00[0-9a-fA-F]{2}' },
  { id: 'approval-policy', severity: 'medium', weight: 8, label: '审批 / 沙盒策略操作', hint: '尝试影响审批策略或沙盒权限', re: 'setPolicy|sandboxPermissions|danger-full-access|overrideOf' },
  { id: 'persistence', severity: 'medium', weight: 8, label: '持久化 / 自启动痕迹', hint: '安装脚本、开机自启等持久化行为', re: 'postinstall|install\\.js|startup|autorun|schtasks|reg\\.add' },
  { id: 'exfil', severity: 'medium', weight: 8, label: '数据外发迹象', hint: '向外部服务上传或转发数据', re: '\\bexfil\\b|webhook|\\btelegram\\b|discord|upload\\s*\\(|formdata' },
]

const CAPABILITY_RULES = [
  { id: 'net', label: '网络访问', detail: '可发起 HTTP / WebSocket 请求（外联）', re: 'https?\\.request|\\bfetch\\s*\\(|net\\.connect|\\baxios\\b|WebSocket|undici|node-fetch|web\\.fetch' },
  { id: 'fs-write', label: '文件写入', detail: '可通过 DSH 文件服务写入 / 修改文件', re: '\\.writeText\\s*\\(|\\.editText\\s*\\(|writeText\\s*\\(|editText\\s*\\(' },
  { id: 'env', label: '环境变量读取', detail: '读取环境变量（可能是凭据兜底）', re: 'process\\.env' },
  { id: 'shell-svc', label: 'Shell / 子进程服务', detail: '可能调用 shell / 子进程服务', re: 'ctx\\.get\\s*\\(\\s*[\\x22\\x27](shell|subprocess|terminals)[\\x22\\x27]' },
]

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }

function countMatches(text, reSrc) {
  let re
  try { re = new RegExp(reSrc, 'gi') } catch (e) { return 0 }
  const m = text.match(re)
  return m ? m.length : 0
}

function snippetOf(text, reSrc) {
  let re
  try { re = new RegExp(reSrc, 'i') } catch (e) { return null }
  const m = re.exec(text)
  if (!m) return null
  const idx = m.index
  let line = 1
  for (let i = 0; i < idx; i++) { if (text.charAt(i) === '\n') line++ }
  const start = Math.max(0, idx - 40)
  const end = Math.min(text.length, idx + 60)
  return { line: line, text: text.slice(start, end).replace(/\s+/g, ' ').trim() }
}

function verdictOf(score) {
  if (score >= 85) return { key: 'danger', label: '危险', color: '#dc2626' }
  if (score >= 60) return { key: 'high', label: '高风险', color: '#ea580c' }
  if (score >= 35) return { key: 'medium', label: '中风险', color: '#d97706' }
  if (score >= 15) return { key: 'low', label: '低风险', color: '#2563eb' }
  return { key: 'safe', label: '安全', color: '#16a34a' }
}

function capabilityLevelOf(caps) {
  const classes = new Set()
  for (const c of caps) if (c.class) classes.add(c.class)
  const n = classes.size
  return n >= 6 ? '广泛' : n >= 3 ? '中等' : '轻量'
}

function extractCapabilities(text, out) {
  const quote = '[\\x22\\x27]'
  let m
  let re = new RegExp('ctx\\.get\\s*\\(\\s*' + quote + '([^\\x22\\x27]+)' + quote, 'g')
  while ((m = re.exec(text))) out.push({ kind: 'service-read', class: 'services', detail: '读取服务: ' + m[1] })
  re = new RegExp('inject\\s*:\\s*\\[([^\\]]+)\\]', 'g')
  while ((m = re.exec(text))) {
    const inner = new RegExp(quote + '([^\\x22\\x27]+)' + quote, 'g')
    let n
    while ((n = inner.exec(m[1]))) out.push({ kind: 'inject', class: 'services', detail: '硬依赖: ' + n[1] })
  }
  re = new RegExp('harness\\.handle\\s*\\(\\s*' + quote + '([^\\x22\\x27]+)' + quote, 'g')
  while ((m = re.exec(text))) out.push({ kind: 'rpc', class: 'rpc', detail: 'Host RPC 方法: ' + m[1] })
  if (/harness\.registerTool|\.registerTool\s*\(|defineTool/.test(text)) out.push({ kind: 'tool', class: 'tools', detail: '注册模型工具' })
  re = new RegExp('ctx\\.on\\s*\\(\\s*' + quote + '([^\\x22\\x27]+)' + quote, 'g')
  while ((m = re.exec(text))) out.push({ kind: 'event', class: 'events', detail: '监听事件: ' + m[1] })
  if (/slots\.(inject|register)/.test(text)) out.push({ kind: 'ui', class: 'ui', detail: '注入浏览器 UI 插槽' })
  if (/ctx\.provide/.test(text)) out.push({ kind: 'provide', class: 'services', detail: '向运行时发布新服务' })
  re = new RegExp('host\\.call\\s*\\(\\s*' + quote + '([^\\x22\\x27]+)' + quote, 'g')
  while ((m = re.exec(text))) out.push({ kind: 'rpc-client', class: 'rpc', detail: 'Client→Host 调用: ' + m[1] })
}

function buildTrace(caps) {
  const steps = ['接收插件包（不执行，仅静态解析）']
  const inj = caps.filter((c) => c.kind === 'inject')
  const services = caps.filter((c) => c.kind === 'service-read')
  const rpcs = caps.filter((c) => c.kind === 'rpc')
  const tools = caps.filter((c) => c.kind === 'tool')
  const events = caps.filter((c) => c.kind === 'event')
  const ui = caps.filter((c) => c.kind === 'ui')
  const provides = caps.filter((c) => c.kind === 'provide')
  if (inj.length) steps.push('声明硬依赖 → ' + inj.map((c) => c.detail.split(': ')[1]).join('、'))
  if (services.length) steps.push('申请读取服务 → ' + services.map((c) => c.detail.split(': ')[1]).join('、'))
  if (rpcs.length) steps.push('注册 Host RPC → ' + rpcs.map((c) => c.detail.split(': ')[1]).join('、'))
  if (tools.length) steps.push('注册模型工具（安装后模型即可调用）')
  if (events.length) steps.push('订阅运行时事件 → ' + events.map((c) => c.detail.split(': ')[1]).join('、'))
  if (ui.length) steps.push('注入浏览器 UI 插槽')
  if (provides.length) steps.push('向运行时发布新服务')
  steps.push('—— 干跑结束：以上为声明级预演，源码未在隔离容器中真实执行')
  return steps
}

function buildAdvice(verdict, score, caps, findings) {
  const advice = []
  const wide = caps.filter((c) => c.class).length >= 3
  if (verdict.key === 'safe') {
    advice.push('未发现恶意行为特征：可安装后打开「运行时注册观察」核对实际行为')
    if (wide) advice.push('注意：该插件权限面较广（' + caps.filter((c) => c.class).length + ' 类能力），请确认这些能力是插件功能所需')
    advice.push('仍建议只从可信来源获取插件，并参考社区评分页的他人评价')
  } else if (verdict.key === 'low') {
    advice.push('恶意特征较少：请对照下面的发现逐条确认是否属于该插件的合理功能')
    advice.push('可点「🤖 AI 复核」让 AI 判断误报；安装后核对「运行时注册观察」')
  } else if (verdict.key === 'medium') {
    advice.push('存在明显恶意特征：建议先点「🤖 AI 复核」，并在隔离环境试运行')
    advice.push('对照插件官方说明，核实每一条发现是否合理')
  } else {
    advice.push('不建议直接安装：请优先点「🤖 AI 复核」并在隔离沙盒中观察其真实行为')
    advice.push('若无法确认来源可信，可通过「漏洞赏金」页提交可疑报告')
    if (findings.some((f) => f.severity === 'critical')) advice.push('存在严重危险特征：切勿在日常数据所在环境运行')
  }
  return advice
}

function analyzeSource(source, name) {
  const text = String(source || '')
  const findings = []
  const capabilities = []
  let score = 0
  for (const rule of MALICIOUS_RULES) {
    const count = countMatches(text, rule.re)
    if (count > 0) {
      const snip = snippetOf(text, rule.re)
      findings.push({
        id: rule.id, severity: rule.severity, weight: rule.weight, label: rule.label, hint: rule.hint, count: count,
        line: snip ? snip.line : null, snippet: snip ? snip.text : '',
      })
      score += rule.weight
    }
  }
  for (const rule of CAPABILITY_RULES) {
    const count = countMatches(text, rule.re)
    if (count > 0) {
      capabilities.push({ kind: 'marker', class: rule.id, detail: rule.label + '：' + rule.detail, count: count })
    }
  }
  score = clamp(score, 0, 100)
  extractCapabilities(text, capabilities)
  const verdict = verdictOf(score)
  return {
    name: name, chars: text.length, lines: text.split(/\r?\n/).length,
    score: score, verdict: verdict,
    capabilityLevel: capabilityLevelOf(capabilities),
    findings: findings, capabilities: capabilities,
    trace: buildTrace(capabilities), advice: buildAdvice(verdict, score, capabilities, findings),
    backend: 'local-static',
  }
}

function buildShareText(report) {
  const lines = []
  lines.push('🛡️ DSH 插件安检门 · SecurityGate 安检报告')
  lines.push('──────────────────────────────')
  lines.push('对象：' + (report.name || '未知'))
  lines.push('结论：' + (report.verdict && report.verdict.label ? report.verdict.label : '?') + '（恶意风险分 ' + (typeof report.score === 'number' ? report.score : 0) + ' / 100 · 权限面 ' + (report.capabilityLevel || '?') + '）')
  if (report.findings && report.findings.length) {
    lines.push('恶意特征：')
    report.findings.slice(0, 6).forEach((f) => lines.push('  [' + f.severity + '] ' + f.label + (f.line ? '（第 ' + f.line + ' 行）' : '')))
  } else {
    lines.push('恶意特征：无')
  }
  if (report.capabilities && report.capabilities.length) {
    lines.push('权限能力面：' + report.capabilities.slice(0, 8).map((c) => c.detail).join('；'))
  }
  if (report.aiReview && report.aiReview.summary) lines.push('🤖 AI 复核：' + report.aiReview.summary)
  lines.push('')
  lines.push('✅ 已通过安检门检查（本报告由 SecurityGate 生成，仅供参考）')
  return lines.join('\n')
}

return {
  inject: ['fs', 'sandboxPolicy'],
  apply(ctx) {
    const fs = ctx.fs
    let scanCount = 0
    let reviewSeq = 0
    let scanHistory = []

    async function pushScanHistory(entry) {
      scanHistory.unshift(entry)
      if (scanHistory.length > 20) scanHistory.length = 20
      try {
        await ensureStore()
        store.history = scanHistory.slice()
        await persistStore()
      } catch (e) {}
    }

    async function walkDir(dirTarget, depth, out) {
      if (depth > 3 || out.length >= 50) return
      let entries
      try { entries = await fs.listDir(dirTarget) } catch (e) { return }
      for (const entry of entries) {
        if (out.length >= 50) break
        const name = entry && typeof entry.name === 'string' ? entry.name : ''
        const type = entry && typeof entry.type === 'string' ? entry.type : ''
        const child = entry && entry.target
        if (!child || !name) continue
        if (name === 'node_modules' || name.charAt(0) === '.') continue
        if (type === 'file') {
          if (/\.(js|mjs|cjs|ts|jsx|tsx)$/i.test(name)) {
            try {
              const text = await fs.readText(child)
              if (text && text.length <= 200000) out.push({ name: name, text: text })
            } catch (e) {}
          }
        } else if (type === 'directory') {
          if (name !== 'dist' && name !== 'build') await walkDir(child, depth + 1, out)
        }
      }
    }

    async function scanPath(path) {
      let target
      try { target = await fs.resolve(String(path)) } catch (e) { return { ok: false, error: '无法解析路径：' + String(path) } }
      try {
        const text = await fs.readText(target)
        const report = analyzeSource(text, String(path))
        scanCount += 1
        pushScanHistory({ at: new Date().toISOString(), name: String(path), kind: 'file', score: report.score, verdictKey: report.verdict.key, capabilityLevel: report.capabilityLevel, findingsCount: report.findings.length })
        return { ok: true, kind: 'file', path: String(path), report: report }
      } catch (e) {}
      try {
        const files = []
        await walkDir(target, 0, files)
        if (!files.length) return { ok: false, error: '目录中没有可扫描的文本文件' }
        const reports = files.map((f) => ({ file: f.name, report: analyzeSource(f.text, f.name) }))
        const sorted = reports.slice().sort((a, b) => b.report.score - a.report.score)
        const worst = sorted[0]
        const allFindings = []
        reports.forEach((r) => r.report.findings.forEach((f) => allFindings.push({ file: r.file, severity: f.severity, weight: f.weight, label: f.label, hint: f.hint, count: f.count, line: f.line, snippet: f.snippet })))
        allFindings.sort((a, b) => SEV_ORDER[b.severity] - SEV_ORDER[a.severity] || b.weight - a.weight)
        const capMap = {}
        reports.forEach((r) => r.report.capabilities.forEach((c) => { capMap[c.detail] = true }))
        const aggCaps = Object.keys(capMap).map((d) => ({ kind: 'detected', class: 'aggregate', detail: d }))
        const agg = {
          name: '目录扫描:' + String(path),
          score: worst ? worst.report.score : 0,
          verdict: worst ? worst.report.verdict : verdictOf(0),
          capabilityLevel: worst ? worst.report.capabilityLevel : '轻量',
          lines: files.length,
          chars: reports.reduce((s, r) => s + r.report.chars, 0),
          findings: allFindings.slice(0, 30),
          capabilities: aggCaps,
        }
        scanCount += 1
        pushScanHistory({ at: new Date().toISOString(), name: '目录:' + String(path), kind: 'dir', score: agg.score, verdictKey: agg.verdict.key, capabilityLevel: agg.capabilityLevel, findingsCount: agg.findings.length })
        return {
          ok: true, kind: 'dir', path: String(path), files: files.length,
          reports: reports.slice(0, 40).map((r) => ({ file: r.file, score: r.report.score, verdictKey: r.report.verdict.key, findingsCount: r.report.findings.length })),
          aggregate: agg,
          backend: 'local-static',
        }
      } catch (e) {
        return { ok: false, error: '路径既不是文件也不是可读目录：' + String(path) }
      }
    }

    async function reviewReport(report) {
      const llm = ctx.get('llm')
      const modelSvc = ctx.get('agentDefaultModel')
      if (!llm || !modelSvc) return { verdict: 'skipped', summary: '当前环境无 llm 服务，跳过 AI 复核', details: '' }
      let sel = null
      try { sel = modelSvc.currentSelection() } catch (e) {}
      if (!sel || typeof sel.provider !== 'string' || !sel.provider || typeof sel.model !== 'string' || !sel.model) {
        return { verdict: 'skipped', summary: '无法读取默认模型配置，跳过 AI 复核', details: '' }
      }
      const lines = []
      lines.push('插件：' + (report.name || '未知'))
      lines.push('恶意风险分：' + (typeof report.score === 'number' ? report.score : 0) + '（结论：' + (report.verdict && report.verdict.label ? report.verdict.label : '?') + '）')
      lines.push('权限面：' + (report.capabilityLevel || '未知'))
      if (report.capabilities && report.capabilities.length) {
        lines.push('能力清单：')
        report.capabilities.slice(0, 30).forEach((c) => lines.push('- ' + c.detail))
      }
      if (report.findings && report.findings.length) {
        lines.push('静态发现：')
        report.findings.slice(0, 15).forEach((f) => lines.push('- [' + f.severity + '] ' + f.label + (f.line ? '（第 ' + f.line + ' 行）' : '') + (f.snippet ? ' 片段：' + f.snippet : '') + ' — ' + (f.hint || '')))
      } else {
        lines.push('静态发现：无')
      }
      const userText = lines.join('\n')
      const system = '你是 DSH 插件安全分析员。根据静态扫描结果判断：哪些发现是真正的恶意/危险行为（窃取数据、执行任意代码、绕过审批、持久化后门等），哪些是插件正常功能（消息网关必然联网、文件处理插件必然写文件等）。只输出一个 JSON 对象：{"verdict":"suspicious|benign|mixed","summary":"一句话总体结论","details":"逐条发现判断，每条一行"}。不要输出 JSON 以外的内容。'
      let text = ''
      try {
        const gen = {
          provider: sel.provider,
          model: sel.model,
          system: system,
          messages: [{ id: 'gate-rev-' + (++reviewSeq), role: 'user', content: [{ type: 'text', text: userText }], source: { kind: 'user' } }],
          maxTokens: 800,
          temperature: 0.1,
        }
        for await (const chunk of llm.stream(gen)) {
          if (chunk.type === 'text-delta') text += chunk.text
          else if (chunk.type === 'block-end' && !text && chunk.block && chunk.block.type === 'text') text += chunk.block.text
          else if (chunk.type === 'finish') {
            const r = chunk.reason
            if (r && (r.kind === 'error' || r.kind === 'aborted')) throw new Error(r.error && r.error.message ? r.error.message : r.kind)
          }
        }
      } catch (e) {
        return { verdict: 'error', summary: 'AI 复核失败：' + String(e && e.message ? e.message : e), details: '' }
      }
      const trimmed = String(text || '').trim()
      try {
        const start = trimmed.indexOf('{')
        const end = trimmed.lastIndexOf('}')
        if (start >= 0 && end > start) {
          const parsed = JSON.parse(trimmed.slice(start, end + 1))
          return {
            verdict: parsed && typeof parsed.verdict === 'string' ? parsed.verdict : 'mixed',
            summary: parsed && typeof parsed.summary === 'string' ? parsed.summary.slice(0, 300) : trimmed.slice(0, 300),
            details: parsed && typeof parsed.details === 'string' ? parsed.details.slice(0, 800) : '',
          }
        }
      } catch (e) {}
      return { verdict: 'mixed', summary: trimmed.slice(0, 300), details: '' }
    }

    function initiatorAgent() {
      try {
        const agentsSvc = ctx.get('agents')
        if (agentsSvc && typeof agentsSvc.requireInitiator === 'function') return agentsSvc.requireInitiator()
      } catch (e) {}
      return undefined
    }

    function toolsServiceView() {
      const agent = initiatorAgent()
      if (agent && agent.ctx && typeof agent.ctx.get === 'function') {
        try {
          const svc = agent.ctx.get('tools')
          if (svc && typeof svc.schemas === 'function') return { svc: svc, scope: agent }
        } catch (e) {}
      }
      return { svc: undefined, scope: undefined }
    }

    function safeToolNames(svc, scope) {
      const map = function (schemas) {
        return (schemas || []).map((s) => (s && typeof s.name === 'string' ? s.name : '')).filter(Boolean)
      }
      if (scope !== undefined) {
        try { return map(svc.schemas(scope)) } catch (e) {}
      }
      try { return map(svc.schemas()) } catch (e) { return [] }
    }

    let toolBaseline = new Set()
    let baselineReady = false
    let registryView = { added: [], removed: [], tools: [], total: 0, baselineSize: 0, ready: false, arrivals: [] }

    function refreshRegistry() {
      const view = toolsServiceView()
      if (view.svc === undefined || view.scope === undefined) {
        registryView = { added: [], removed: [], tools: [], total: 0, baselineSize: 0, ready: false, arrivals: registryView.arrivals }
        return
      }
      const names = safeToolNames(view.svc, view.scope)
      if (!baselineReady) {
        toolBaseline = new Set(names)
        baselineReady = true
      }
      const current = new Set(names)
      const added = names.filter((n) => !toolBaseline.has(n) && n.indexOf(OWN_TOOL_PREFIX) !== 0)
      const removed = Array.from(toolBaseline).filter((n) => !current.has(n) && n.indexOf(OWN_TOOL_PREFIX) !== 0)
      let tools = []
      try {
        const schemas = view.svc.schemas(view.scope) || []
        tools = schemas.map((s) => ({
          name: s && typeof s.name === 'string' ? s.name : '',
          description: s && typeof s.description === 'string' ? s.description.slice(0, 160) : '',
        }))
      } catch (e) {}
      const arrivals = registryView.arrivals.slice()
      if (baselineReady && added.length) {
        for (const n of added) {
          if (arrivals.some((a) => a.name === n)) continue
          const desc = tools.find((t) => t.name === n)
          arrivals.push({ name: n, description: desc ? desc.description : '', at: new Date().toISOString() })
        }
        while (arrivals.length > 20) arrivals.shift()
      }
      registryView = { added: added, removed: removed, tools: tools, total: names.length, baselineSize: toolBaseline.size, ready: true, arrivals: arrivals }
    }

    let store = { version: 1, ratings: {}, reports: [], history: [] }
    let storeTarget = null
    let storePolicy = null

    function resolveStoreRoot() {
      try {
        const agent = initiatorAgent()
        if (agent && agent.session && agent.session.header && typeof agent.session.header.cwd === 'string' && agent.session.header.cwd) {
          const policy = ctx.sandboxPolicy.resolve({ session: agent.session })
          if (policy && typeof policy.workspaceRoot === 'string' && policy.workspaceRoot) {
            return { root: policy.workspaceRoot, policy: policy }
          }
        }
      } catch (e) {}
      try {
        const policy = ctx.sandboxPolicy.resolve()
        if (policy && typeof policy.workspaceRoot === 'string' && policy.workspaceRoot) {
          return { root: policy.workspaceRoot, policy: policy }
        }
      } catch (e) {}
      try {
        const root = ctx.sandboxPolicy.workspaceRoot
        if (typeof root === 'string' && root) return { root: root, policy: undefined }
      } catch (e) {}
      return null
    }

    async function ensureStore() {
      if (storeTarget) return
      const resolved = resolveStoreRoot()
      if (!resolved) return
      try {
        const target = await fs.resolve(resolved.root + '/' + STORE_FILE)
        storeTarget = target
        storePolicy = resolved.policy
        try {
          const text = await fs.readText(target)
          const parsed = JSON.parse(text)
          if (parsed && typeof parsed === 'object') {
            store.ratings = parsed.ratings && typeof parsed.ratings === 'object' ? parsed.ratings : {}
            store.reports = Array.isArray(parsed.reports) ? parsed.reports : []
            if (Array.isArray(parsed.history)) scanHistory = parsed.history.slice(0, 20)
          }
        } catch (e) {}
      } catch (e) {
        console.log('[安检门] 社区库初始化失败：' + String((e && e.message) || e))
      }
    }

    async function persistStore() {
      if (!storeTarget) return false
      try {
        await fs.writeText(storeTarget, JSON.stringify(store, null, 2), undefined, undefined, storePolicy || undefined)
        return true
      } catch (e) {
        console.error('[安检门] 社区库保存失败：' + String((e && e.message) || e))
        return false
      }
    }

    function currentStorePath() {
      if (!storeTarget) return ''
      try { return fs.processPath(storeTarget) } catch (e) { return '' }
    }

    function ratingsSummary() {
      const out = []
      for (const key of Object.keys(store.ratings)) {
        const entry = store.ratings[key]
        const scores = entry && Array.isArray(entry.scores) ? entry.scores : []
        if (!scores.length) continue
        let sum = 0
        scores.forEach((s) => { sum += Number(s.score) || 0 })
        out.push({
          plugin: key,
          avg: Math.round((sum / scores.length) * 10) / 10,
          count: scores.length,
          latest: scores.slice(-3).reverse(),
        })
      }
      out.sort((a, b) => b.avg - a.avg || b.count - a.count)
      return out
    }

    async function doRate(args) {
      await ensureStore()
      const plugin = String((args && args.plugin) || '').trim().slice(0, 120)
      const score = clamp(Math.round(Number((args && args.score) || 0)), 1, 5)
      if (!plugin) return { ok: false, error: '请填写插件名称' }
      if (!(score >= 1)) return { ok: false, error: '评分需为 1-5 星' }
      const entry = store.ratings[plugin] = store.ratings[plugin] || { scores: [] }
      entry.scores.push({ score: score, comment: String((args && args.comment) || '').slice(0, 500), author: String((args && args.author) || '匿名').slice(0, 40), at: new Date().toISOString() })
      const persistOk = await persistStore()
      return { ok: true, ratings: ratingsSummary(), storePath: currentStorePath(), persistOk: persistOk }
    }

    async function doReport(args) {
      await ensureStore()
      const plugin = String((args && args.plugin) || '').trim().slice(0, 120)
      const title = String((args && args.title) || '').trim().slice(0, 160)
      const description = String((args && args.description) || '').slice(0, 2000)
      if (!plugin || !title) return { ok: false, error: '请填写插件名称与问题标题' }
      const sev = args && args.severity ? args.severity : 'low'
      const severity = SEV_BOUNTY[sev] !== undefined ? sev : 'low'
      const report = {
        id: 'R' + Date.now().toString(36).toUpperCase(),
        plugin: plugin, title: title, description: description, severity: severity,
        bounty: SEV_BOUNTY[severity], status: 'open',
        author: String((args && args.author) || '匿名').slice(0, 40),
        at: new Date().toISOString(),
      }
      store.reports.unshift(report)
      const persistOk = await persistStore()
      return { ok: true, reports: store.reports.slice(0, 100), report: report, storePath: currentStorePath(), persistOk: persistOk }
    }

    const renderScan = function (args, value) {
      if (!value) return [{ type: 'text', text: '（无结果）' }]
      if (value.ok === false) return [{ type: 'text', text: '❌ ' + (value.error || '未知错误') }]
      const lines = []
      if (value.kind === 'dir') {
        const a = value.aggregate
        lines.push('📁 目录扫描 ' + value.files + ' 个文件 | 恶意风险分 ' + a.score + '/100 | 结论：' + a.verdict.label + ' | 权限面：' + a.capabilityLevel)
        if (a.findings.length) {
          lines.push('恶意行为特征：')
          a.findings.slice(0, 8).forEach(function (f) {
            lines.push('• [' + f.severity + '] ' + f.label + (f.line ? '（第 ' + f.line + ' 行）' : '') + (f.file ? ' ← ' + f.file : ''))
          })
        } else {
          lines.push('✅ 未发现恶意行为特征')
        }
      } else {
        const r = value.report
        lines.push('🔍 恶意风险分 ' + r.score + '/100 | 结论：' + r.verdict.label + ' | 权限面：' + r.capabilityLevel + ' | ' + r.lines + ' 行')
        if (r.findings.length) {
          lines.push('恶意行为特征：')
          r.findings.slice(0, 8).forEach(function (f) {
            lines.push('• [' + f.severity + '] ' + f.label + ' ×' + f.count + (f.line ? '（第 ' + f.line + ' 行）' : ''))
          })
        } else {
          lines.push('✅ 未发现恶意行为特征')
        }
        if (r.capabilities && r.capabilities.length) lines.push('权限能力面：' + r.capabilities.slice(0, 12).map(function (c) { return c.detail }).join('；'))
        if (r.aiReview) lines.push('🤖 AI 复核：' + r.aiReview.verdict + ' — ' + r.aiReview.summary)
        if (r.advice.length) lines.push('建议：' + r.advice[0])
      }
      return [{ type: 'text', text: lines.join('\n') }]
    }

    const renderRegistry = function (args, value) {
      if (!value || value.ok === false) return [{ type: 'text', text: '（无数据）' }]
      if (value.ready === false) return [{ type: 'text', text: '运行时观察尚未就绪（等待会话上下文），稍后再试' }]
      const extra = value.arrivals && value.arrivals.length ? '；最近上膛：' + value.arrivals.slice(-3).map(function (a) { return a.name }).join('、') : ''
      return [{ type: 'text', text: '当前会话可见工具 ' + value.total + ' 个；安检门启动后新增：' + (value.added.length ? value.added.join('、') : '无') + '；消失：' + (value.removed.length ? value.removed.join('、') : '无') + extra }]
    }

    const renderRate = function (args, value) {
      if (!value) return [{ type: 'text', text: '（无结果）' }]
      if (value.ok === false) return [{ type: 'text', text: '❌ ' + (value.error || '提交失败') }]
      return [{ type: 'text', text: '✅ 已提交社区评分（落盘' + (value.persistOk ? '成功' : '未持久化') + '：' + value.storePath + '）' }]
    }

    const renderReport = function (args, value) {
      if (!value) return [{ type: 'text', text: '（无结果）' }]
      if (value.ok === false) return [{ type: 'text', text: '❌ ' + (value.error || '提交失败') }]
      return [{ type: 'text', text: '✅ 报告已提交（编号 ' + value.report.id + '，赏金 ' + value.report.bounty + ' 积分，落盘' + (value.persistOk ? '成功' : '未持久化') + '）' }]
    }

    const gateScanTool = harness.defineTool({
      name: 'gate_scan',
      description: '【插件安检门】安装前安全检测：对插件源码做静态扫描 + 干跑预演，返回恶意风险分（0-100）、权限能力面、危险发现与安装建议。传 source 粘贴源码，或传 path 扫描本地文件/目录；ai_review 为 true 时调用 LLM 复核发现是否误报。',
      parameters: {
        type: 'object',
        properties: {
          source: { type: 'string', description: '要检测的插件源码文本' },
          path: { type: 'string', description: '本地插件文件或目录的路径' },
          ai_review: { type: 'boolean', description: '是否让 LLM 复核静态发现（判断误报），默认 false' },
        },
      },
      output: { schema: { type: 'json' }, render: renderScan },
      execute: async (args) => {
        if (args && typeof args.source === 'string' && args.source.trim()) {
          scanCount += 1
          const report = analyzeSource(args.source, '粘贴源码')
          pushScanHistory({ at: new Date().toISOString(), name: '粘贴源码', kind: 'source', score: report.score, verdictKey: report.verdict.key, capabilityLevel: report.capabilityLevel, findingsCount: report.findings.length })
          if (args.ai_review) report.aiReview = await reviewReport(report)
          return { ok: true, kind: 'source', report: report }
        }
        if (args && typeof args.path === 'string' && args.path.trim()) {
          const res = await scanPath(args.path)
          if (res && res.ok && args.ai_review) {
            const target = res.kind === 'dir' ? res.aggregate : res.report
            target.aiReview = await reviewReport(target)
          }
          return res
        }
        return { ok: false, error: '请提供 source（源码）或 path（路径）之一' }
      },
    })

    const gateRegistryTool = harness.defineTool({
      name: 'gate_registry',
      description: '【插件安检门】运行时注册观察：列出当前可见工具，并返回安检门启动后新增 / 消失的工具与最近上膛记录，用于观察新安装插件实际注册了什么。',
      parameters: { type: 'object', properties: {} },
      output: { schema: { type: 'json' }, render: renderRegistry },
      execute: async () => {
        refreshRegistry()
        return { ok: true, added: registryView.added, removed: registryView.removed, tools: registryView.tools, total: registryView.total, ready: registryView.ready, arrivals: registryView.arrivals }
      },
    })

    const gateRateTool = harness.defineTool({
      name: 'gate_rate',
      description: '【插件安检门】社区评分：为某个插件提交 1-5 星评分与评论。',
      parameters: {
        type: 'object',
        properties: {
          plugin: { type: 'string', description: '插件名称或 pluginId' },
          score: { type: 'number', description: '1-5 星' },
          comment: { type: 'string', description: '评论' },
          author: { type: 'string', description: '署名（可选）' },
        },
        required: ['plugin', 'score'],
      },
      output: { schema: { type: 'json' }, render: renderRate },
      execute: async (args) => doRate(args),
    })

    const gateReportTool = harness.defineTool({
      name: 'gate_report',
      description: '【插件安检门】漏洞赏金：报告可疑或恶意插件，按严重程度获得赏金积分。',
      parameters: {
        type: 'object',
        properties: {
          plugin: { type: 'string', description: '插件名称或 pluginId' },
          title: { type: 'string', description: '问题标题' },
          description: { type: 'string', description: '问题描述与证据' },
          severity: { type: 'string', enum: ['critical', 'high', 'medium', 'low'], description: '严重程度' },
          author: { type: 'string', description: '署名（可选）' },
        },
        required: ['plugin', 'title', 'severity'],
      },
      output: { schema: { type: 'json' }, render: renderReport },
      execute: async (args) => doReport(args),
    })

    harness.registerTool(ctx, gateScanTool)
    harness.registerTool(ctx, gateRegistryTool)
    harness.registerTool(ctx, gateRateTool)
    harness.registerTool(ctx, gateReportTool)

    refreshRegistry()
    ctx.on('tools/change', refreshRegistry)

    harness.handle('gate.scanSource', async (args) => {
      const src = args && typeof args.source === 'string' ? args.source : ''
      if (!src.trim()) return { ok: false, error: '请先粘贴插件源码' }
      scanCount += 1
      const report = analyzeSource(src, '粘贴源码')
      pushScanHistory({ at: new Date().toISOString(), name: '粘贴源码', kind: 'source', score: report.score, verdictKey: report.verdict.key, capabilityLevel: report.capabilityLevel, findingsCount: report.findings.length })
      return { ok: true, kind: 'source', report: report }
    })

    harness.handle('gate.scanPath', async (args) => {
      const p = args && typeof args.path === 'string' ? args.path.trim() : ''
      if (!p) return { ok: false, error: '请输入本地路径' }
      return await scanPath(p)
    })

    harness.handle('gate.review', async (args) => {
      const report = args && args.report
      if (!report || typeof report !== 'object') return { ok: false, error: '缺少报告数据' }
      const reviewed = await reviewReport(report)
      return { ok: true, report: Object.assign({}, report, { aiReview: reviewed }) }
    })

    harness.handle('gate.exportReport', async (args) => {
      const report = args && args.report
      if (!report || typeof report !== 'object') return { ok: false, error: '缺少报告数据' }
      return { ok: true, text: buildShareText(report) }
    })

    harness.handle('gate.scanHistory', async () => {
      return { ok: true, history: scanHistory.slice(0, 20) }
    })

    harness.handle('gate.registry', async () => {
      refreshRegistry()
      return { ok: true, added: registryView.added, removed: registryView.removed, tools: registryView.tools, total: registryView.total, baselineSize: registryView.baselineSize, ready: registryView.ready, arrivals: registryView.arrivals }
    })

    harness.handle('gate.status', async () => {
      refreshRegistry()
      return { ok: true, version: GATE_VERSION, scanCount: scanCount, tools: registryView.total, arrivals: registryView.arrivals, ready: registryView.ready, storePath: currentStorePath() }
    })

    harness.handle('gate.store', async () => {
      await ensureStore()
      return { ok: true, ratings: ratingsSummary(), reports: store.reports.slice(0, 100), storePath: currentStorePath() }
    })

    harness.handle('gate.reportStatus', async (args) => {
      await ensureStore()
      const id = args && typeof args.id === 'string' ? args.id : ''
      const status = args && typeof args.status === 'string' ? args.status : ''
      if (!id) return { ok: false, error: '缺少报告编号' }
      if (REPORT_STATUSES.indexOf(status) < 0) return { ok: false, error: '未知状态：' + status }
      const r = store.reports.find((x) => x.id === id)
      if (!r) return { ok: false, error: '报告不存在：' + id }
      r.status = status
      if (status === 'confirmed') r.awarded = true
      const persistOk = await persistStore()
      return { ok: true, reports: store.reports.slice(0, 100), report: r, persistOk: persistOk }
    })

    harness.handle('gate.rate', async (args) => doRate(args))
    harness.handle('gate.report', async (args) => doReport(args))
  },
}

