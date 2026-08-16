const I18N = {
  'zh-CN': {
    appTitle: '🛡️ 插件安检门 · SecurityGate',
    appSub: '装插件，先过安检门 —— 安装前静态安检 + AI 复核 + 运行时盯防、社区评分与漏洞赏金。当前沙盒后端：本地静态分析（云端隔离试运行后端可插拔接入）。',
    tabSandbox: '🧪 试装沙盒',
    tabCommunity: '⭐ 社区评分',
    tabBounty: '🐛 漏洞赏金',
    guideTitle: '📖 使用指南',
    guideCollapse: '收起 ▲',
    guideExpand: '展开 ▼',
    guideUi: '🖥️ 方式一：设置界面（推荐）',
    guideStep1: '① 左侧栏底部打开 设置，选择「🛡️ 插件安检门」页签',
    guideStep2: '② 在「🧪 试装沙盒」粘贴插件源码，或输入本地文件 / 目录路径，点击「开始安检」',
    guideStep3: '③ 查看恶意风险分与分级结论、权限能力面、危险发现（带行号）、干跑预演与安检建议；可点「🤖 AI 复核」让 AI 判断误报',
    guideStep4: '④ 在「⭐ 社区评分」给插件打 1-5 星并评论，帮助其他人做安装决策',
    guideStep5: '⑤ 在「🐛 漏洞赏金」提交可疑插件报告，获得赏金积分',
    guideChat: '💬 方式二：对话直达',
    guideChat1: '直接说「用安检门扫一下这个插件」，我会自动调用 gate_scan 完成安检',
    guideChat2: '也可以直接说：「给 xxx 插件打个 4 星」「报告 xx 插件的可疑行为」「看看最近注册了哪些工具」',
    guideChat3: '会话顶部还有 🛡️ 按钮，可随时打开快检面板（无需进入设置）',
    guideTools: '模型可用的 4 个安检门工具：',
    toolScan: '静态扫描 + 干跑预演，返回恶意风险分、权限能力面与安装建议（可加 AI 复核）',
    toolRegistry: '运行时注册观察：安检门启动后新增 / 消失的工具',
    toolRate: '提交 1-5 星社区安全评分与评论',
    toolReport: '提交漏洞赏金报告，按严重程度获得积分',
    maliciousScore: '恶意风险分',
    permLevel: '权限面',
    linesUnit: '行',
    noFindings: '✅ 未发现恶意行为特征',
    findingsTitle: '🚨 恶意行为特征（',
    findingsClose: '）',
    lineAt: '（第 ',
    lineEnd: ' 行）',
    capsNone: '未识别到能力声明',
    capsTitle: '🔌 权限能力面（功能权限，非恶意证据）',
    aiSuspicious: '疑似恶意',
    aiBenign: '倾向正常',
    aiMixed: '混合/存疑',
    aiError: '复核失败',
    aiSkipped: '未复核',
    dirDone: '📁 目录扫描完成（',
    filesUnit: ' 个文件）',
    featureCount: ' 项特征',
    traceTitle: '🧾 干跑预演（声明级）',
    adviceTitle: '💡 安检建议',
    reviewBtn: '🤖 AI 复核（判断误报）',
    reviewing: '复核中…',
    shareBtn: '📤 分享报告',
    copyBtn: '复制',
    copied: '已复制',
    shareHint: '分享文本（可复制到社区 / 群聊）',
    exportFail: '导出失败：',
    registryTitle: '👁️ 运行时注册观察',
    registryLoading: '正在读取…',
    registryPending: '等待会话上下文就绪，稍后自动重试…',
    registrySummary: '当前会话可见工具 ',
    registryUnit: ' 个 · 安检门启动后新增 ',
    registryGone: ' 个 · 消失 ',
    registryRefresh: ' 个（每 8 秒自动刷新）',
    registryAdded: '新增工具：',
    registryRemoved: '消失工具：',
    registryArrivals: '最近上膛（记录）：',
    arrivalTitle: '🚨 检测到新插件上膛',
    arrivalObserved: '安检门已自动列入观察',
    gotIt: '知道了',
    sandboxTitle: '🧪 试装沙盒 · 粘贴源码安检',
    sandboxPh: '把插件的 host / client 源码粘贴到这里…',
    scanBtn: '开始安检',
    scanning: '安检中…',
    scanDirTitle: '📂 扫描本地文件 / 目录',
    scanDirPh: '例如 E:\\plugins\\my-plugin 或某个文件路径',
    scanBtn2: '扫描',
    aiReviewBtn: '🤖 AI 复核',
    aiReviewFail: 'AI 复核失败：',
    historyTitle: '📜 扫描历史',
    historyEmpty: '暂无扫描记录，先安检一个插件吧',
    historyCopy: '复制结论',
    historyCopied: '结论已复制',
    communityTitle: '⭐ 社区安全评分',
    communityIntro: '给插件打安全分，帮助其他人做安装决策（数据保存在本机安检门社区库）。',
    communitySubmit: '提交我的评分',
    pluginName: '插件名称 / pluginId',
    commentPh: '评论（可选）',
    authorPh: '署名（默认匿名）',
    submitRating: '提交评分',
    submitting: '提交中…',
    needPluginName: '请填写插件名称',
    ratedOk: '✅ 评分已提交',
    failPrefix: '❌ ',
    leaderboard: '社区评分榜（',
    leaderboardClose: ' 个插件）',
    people: ' 人评分',
    bountyTitle: '🐛 漏洞赏金计划',
    bountyIntro: '发现可疑或恶意插件？提交报告即可获得赏金积分：严重 1000 · 高危 500 · 中危 200 · 低危 50。核实后状态会更新。',
    reportForm: '提交报告',
    titlePh: '问题标题',
    descPh: '描述问题：行为、证据、复现步骤…',
    submitReport: '提交报告',
    needTitle: '请填写插件名称与问题标题',
    reportOk: '✅ 报告已提交，赏金 ',
    reportOk2: ' 积分',
    statusFlow: '状态流程：待核实 → 核实中 → 已确认（发放积分）/ 已驳回 / 已修复 / 已拉黑',
    statusUpdateOk: '状态已更新',
    statusUpdateFail: '状态更新失败：',
    awarded: '积分已发放',
    notAwarded: '未发放',
    stOpen: '待核实',
    stUnderReview: '核实中',
    stConfirmed: '已确认',
    stDismissed: '已驳回',
    stFixed: '已修复',
    stBlacklisted: '已拉黑',
    sevCritical: '严重',
    sevHigh: '高危',
    sevMedium: '中危',
    sevLow: '低危',
    vDanger: '危险',
    vHigh: '高风险',
    vMedium: '中风险',
    vLow: '低风险',
    vSafe: '安全',
    quickTitle: '插件安检门快检',
    quickPh: '粘贴插件源码，立即安检…',
    quickFooter: '完整功能在 设置 → 🛡️ 插件安检门',
    runTitle: '🛡️ 插件安检门已上岗',
    runStats: '已安检 ',
    runStats2: ' 次 · 观察工具 ',
    runStats3: ' 个 · 社区库 ',
    runLoading: '加载中…',
    runHint: '说「用安检门扫一下这个插件」即可安检；完整界面在 设置 → 🛡️ 插件安检门',
  },
  'en-US': {
    appTitle: '🛡️ SecurityGate · Plugin Inspection Gate',
    appSub: 'Inspect plugins before you install them — static scan + AI review + runtime watch, community ratings and bug bounty. Sandbox backend: local static analysis (cloud backend pluggable).',
    tabSandbox: '🧪 Preview Sandbox',
    tabCommunity: '⭐ Community Ratings',
    tabBounty: '🐛 Bug Bounty',
    guideTitle: '📖 How to Use',
    guideCollapse: 'Collapse ▲',
    guideExpand: 'Expand ▼',
    guideUi: '🖥️ Mode 1: Settings UI (recommended)',
    guideStep1: '① Open Settings at the bottom of the sidebar → select the 🛡️ SecurityGate tab',
    guideStep2: '② Paste plugin source, or enter a local file/directory path, then click Start Scan',
    guideStep3: '③ Review the malicious-risk score, capability surface, findings (with line numbers), dry-run trace and advice; click 🤖 AI Review to filter false positives',
    guideStep4: '④ Rate plugins 1-5 stars and comment in ⭐ Community Ratings',
    guideStep5: '⑤ Submit suspicious plugin reports in 🐛 Bug Bounty to earn points',
    guideChat: '💬 Mode 2: Just Ask',
    guideChat1: 'Say "scan this plugin" and the model will call gate_scan automatically',
    guideChat2: 'Or say: "rate plugin xxx 4 stars" / "report suspicious behavior in xx" / "what tools were registered recently"',
    guideChat3: 'A 🛡️ button in the session header opens the quick-scan panel anytime',
    guideTools: '4 tools available to the model:',
    toolScan: 'Static scan + dry-run preview: malicious-risk score, capability surface, install advice (optional AI review)',
    toolRegistry: 'Runtime registry watch: tools added/removed since the gate started',
    toolRate: 'Submit a 1-5 star community security rating',
    toolReport: 'Submit a bug bounty report; points by severity',
    maliciousScore: 'Malicious risk',
    permLevel: 'Capability',
    linesUnit: 'lines',
    noFindings: '✅ No malicious behavior patterns found',
    findingsTitle: '🚨 Malicious patterns (',
    findingsClose: ')',
    lineAt: 'line ',
    lineEnd: '',
    capsNone: 'No capability declarations recognized',
    capsTitle: '🔌 Capability surface (functional permissions, not malice evidence)',
    aiSuspicious: 'Suspicious',
    aiBenign: 'Likely benign',
    aiMixed: 'Mixed/unclear',
    aiError: 'Review failed',
    aiSkipped: 'Not reviewed',
    dirDone: '📁 Directory scan done (',
    filesUnit: ' files)',
    featureCount: ' patterns',
    traceTitle: '🧾 Dry-run trace (declaration level)',
    adviceTitle: '💡 Recommendations',
    reviewBtn: '🤖 AI Review (false-positive check)',
    reviewing: 'Reviewing…',
    shareBtn: '📤 Share Report',
    copyBtn: 'Copy',
    copied: 'Copied',
    shareHint: 'Share text (copy to community / chat)',
    exportFail: 'Export failed: ',
    registryTitle: '👁️ Runtime Registry Watch',
    registryLoading: 'Loading…',
    registryPending: 'Waiting for session context, retrying…',
    registrySummary: 'Tools visible in this session: ',
    registryUnit: ' · added since gate start: ',
    registryGone: ' · removed: ',
    registryRefresh: ' (auto-refresh every 8s)',
    registryAdded: 'Added:',
    registryRemoved: 'Removed:',
    registryArrivals: 'Recent arrivals:',
    arrivalTitle: '🚨 New plugin tools detected',
    arrivalObserved: 'Now under SecurityGate watch',
    gotIt: 'Got it',
    sandboxTitle: '🧪 Preview Sandbox · Paste source',
    sandboxPh: 'Paste the plugin host / client source here…',
    scanBtn: 'Start Scan',
    scanning: 'Scanning…',
    scanDirTitle: '📂 Scan local file / directory',
    scanDirPh: 'e.g. C:\\plugins\\my-plugin or a file path',
    scanBtn2: 'Scan',
    aiReviewBtn: '🤖 AI Review',
    aiReviewFail: 'AI review failed: ',
    historyTitle: '📜 Scan History',
    historyEmpty: 'No scans yet — inspect a plugin first',
    historyCopy: 'Copy Verdict',
    historyCopied: 'Verdict copied',
    communityTitle: '⭐ Community Security Ratings',
    communityIntro: 'Rate plugins to help others decide (data stored in the local SecurityGate community store).',
    communitySubmit: 'Submit My Rating',
    pluginName: 'Plugin name / pluginId',
    commentPh: 'Comment (optional)',
    authorPh: 'Author (default anonymous)',
    submitRating: 'Submit Rating',
    submitting: 'Submitting…',
    needPluginName: 'Please enter a plugin name',
    ratedOk: '✅ Rating submitted',
    failPrefix: '❌ ',
    leaderboard: 'Leaderboard (',
    leaderboardClose: ' plugins)',
    people: ' ratings',
    bountyTitle: '🐛 Bug Bounty Program',
    bountyIntro: 'Found a suspicious or malicious plugin? Submit a report for bounty points: critical 1000 · high 500 · medium 200 · low 50. Status updates after review.',
    reportForm: 'Submit Report',
    titlePh: 'Issue title',
    descPh: 'Describe the issue: behavior, evidence, reproduction steps…',
    submitReport: 'Submit Report',
    needTitle: 'Please enter plugin name and title',
    reportOk: '✅ Report submitted, bounty ',
    reportOk2: ' pts',
    statusFlow: 'Flow: pending → under review → confirmed (points awarded) / dismissed / fixed / blacklisted',
    statusUpdateOk: 'Status updated',
    statusUpdateFail: 'Status update failed: ',
    awarded: 'Points awarded',
    notAwarded: 'Not awarded',
    stOpen: 'Pending',
    stUnderReview: 'Under review',
    stConfirmed: 'Confirmed',
    stDismissed: 'Dismissed',
    stFixed: 'Fixed',
    stBlacklisted: 'Blacklisted',
    sevCritical: 'Critical',
    sevHigh: 'High',
    sevMedium: 'Medium',
    sevLow: 'Low',
    vDanger: 'Danger',
    vHigh: 'High risk',
    vMedium: 'Medium risk',
    vLow: 'Low risk',
    vSafe: 'Safe',
    quickTitle: '🛡️ SecurityGate Quick Scan',
    quickPh: 'Paste plugin source to scan now…',
    quickFooter: 'Full features in Settings → 🛡️ SecurityGate',
    runTitle: '🛡️ SecurityGate is on duty',
    runStats: 'Scans: ',
    runStats2: ' · tools watched: ',
    runStats3: ' · store: ',
    runLoading: 'Loading…',
    runHint: 'Say "scan this plugin" to inspect anything; full UI in Settings → 🛡️ SecurityGate',
  },
}

const CSS = `
.gate-wrap{font-size:13px;line-height:1.55;color:var(--text-primary,#1f2328)}
.gate-hero{border:1px solid var(--border-subtle,rgba(128,128,128,.28));border-radius:12px;padding:14px 16px;margin-bottom:14px;background:linear-gradient(135deg,rgba(59,130,246,.10),rgba(16,185,129,.08))}
.gate-hero h2{margin:0 0 4px;font-size:16px}
.gate-hero p{margin:0;color:var(--text-secondary,#57606a);font-size:12.5px}
.gate-tabs{display:flex;gap:4px;border-bottom:1px solid var(--border-subtle,rgba(128,128,128,.28));margin-bottom:14px}
.gate-tab{border:none;background:transparent;padding:9px 14px;cursor:pointer;font-size:13px;color:var(--text-secondary,#57606a);border-bottom:2px solid transparent}
.gate-tab-on{color:var(--text-primary,#1f2328);font-weight:600;border-bottom-color:#2563eb}
.gate-card{border:1px solid var(--border-subtle,rgba(128,128,128,.28));border-radius:12px;padding:12px 14px;margin-bottom:12px}
.gate-card h3{margin:0 0 8px;font-size:14px}
.gate-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}
.gate-input{flex:1;min-width:220px;padding:8px 10px;border-radius:8px;border:1px solid var(--border-subtle,rgba(128,128,128,.35));background:var(--bg-input,transparent);color:var(--text-primary,#1f2328);font-size:13px}
.gate-textarea{width:100%;min-height:120px;padding:8px 10px;border-radius:8px;border:1px solid var(--border-subtle,rgba(128,128,128,.35));background:var(--bg-input,transparent);color:var(--text-primary,#1f2328);font-size:12.5px;font-family:ui-monospace,SFMono-Regular,Consolas,monospace;box-sizing:border-box;resize:vertical}
.gate-btn{border:none;border-radius:8px;padding:8px 14px;cursor:pointer;font-size:13px;background:#2563eb;color:#fff;font-weight:600}
.gate-btn:disabled{opacity:.5;cursor:default}
.gate-btn-ghost{background:transparent;color:var(--text-primary,#1f2328);border:1px solid var(--border-subtle,rgba(128,128,128,.4))}
.gate-badge{display:inline-block;padding:2px 10px;border-radius:999px;font-size:12px;font-weight:700;color:#fff}
.gate-meter{height:8px;border-radius:999px;background:var(--border-subtle,rgba(128,128,128,.25));overflow:hidden;margin:6px 0 2px}
.gate-meter-fill{height:100%;border-radius:999px}
.gate-find{padding:6px 8px;border-radius:8px;margin:4px 0;font-size:12.5px;border:1px solid transparent}
.gate-chip{display:inline-block;margin:2px 4px 2px 0;padding:2px 8px;border-radius:999px;font-size:11.5px;background:rgba(37,99,235,.10);color:var(--text-primary,#1f2328);border:1px solid rgba(37,99,235,.25)}
.gate-trace{margin:3px 0;font-size:12.5px;color:var(--text-secondary,#57606a)}
.gate-muted{color:var(--text-secondary,#57606a);font-size:12px}
.gate-star{border:none;background:transparent;font-size:18px;cursor:pointer;padding:0 2px;color:#d1d5db}
.gate-star-on{color:#f59e0b}
.gate-list{max-height:340px;overflow:auto}
.gate-item{border-top:1px dashed var(--border-subtle,rgba(128,128,128,.28));padding:8px 2px}
.gate-item:first-child{border-top:none}
.gate-error{color:#dc2626;font-size:12.5px;margin-top:6px}
.gate-ok{color:#16a34a;font-size:12.5px;margin-top:6px}
.gate-guide-grid{display:flex;gap:16px;flex-wrap:wrap;margin-top:10px}
.gate-guide-col{flex:1;min-width:270px}
.gate-guide-title{font-weight:700;margin:0 0 6px;font-size:13px}
.gate-guide-step{margin:4px 0;font-size:12.5px;color:var(--text-secondary,#57606a)}
.gate-code{display:inline-block;padding:1px 7px;border-radius:6px;background:rgba(37,99,235,.10);border:1px solid rgba(37,99,235,.25);font-family:ui-monospace,SFMono-Regular,Consolas,monospace;font-size:12px;color:var(--text-primary,#1f2328);margin:2px 6px 2px 0}
.gate-guide-row{display:flex;align-items:center;gap:8px;margin:4px 0;flex-wrap:wrap}
.gate-share{white-space:pre-wrap;background:var(--bg-input,transparent);border:1px dashed var(--border-subtle,rgba(128,128,128,.35));border-radius:8px;padding:8px;margin-top:8px;font-size:12px;max-height:220px;overflow:auto;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}
`

return {
  inject: ['timer'],
  apply(ctx) {
    styles.insert(CSS)

    const el = function (type, props) {
      const children = Array.prototype.slice.call(arguments, 2)
      return React.createElement.apply(React, [type, props].concat(children))
    }

    const localeSvc = ctx.get('locale')
    let translateFn = null
    if (localeSvc && typeof localeSvc.bind === 'function') {
      try { translateFn = localeSvc.bind('security-gate') } catch (e) {}
      try {
        localeSvc.register('security-gate', 'zh-CN', I18N['zh-CN'])
        localeSvc.register('security-gate', 'zh', I18N['zh-CN'])
        localeSvc.register('security-gate', 'en-US', I18N['en-US'])
        localeSvc.register('security-gate', 'en', I18N['en-US'])
      } catch (e) {}
    }
    const t = function (key) {
      if (translateFn) {
        try {
          const v = translateFn(key)
          if (typeof v === 'string' && v && v !== key) return v
        } catch (e) {}
      }
      return (I18N['zh-CN'] && I18N['zh-CN'][key]) || key
    }
    const useLocaleTick = function () {
      const [, force] = React.useState(0)
      React.useEffect(function () {
        if (!localeSvc || typeof localeSvc.subscribe !== 'function') return undefined
        return localeSvc.subscribe(function () { force(function (n) { return n + 1 }) })
      }, [])
    }

    const VERDICT_META = {
      danger: { color: '#dc2626' },
      high: { color: '#ea580c' },
      medium: { color: '#d97706' },
      low: { color: '#2563eb' },
      safe: { color: '#16a34a' },
    }
    const VERDICT_KEY = { danger: 'vDanger', high: 'vHigh', medium: 'vMedium', low: 'vLow', safe: 'vSafe' }
    const verdictLabel = function (key) { return t(VERDICT_KEY[key] || 'vMedium') }
    const verdictColor = function (key) { return (VERDICT_META[key] || VERDICT_META.medium).color }
    const SEV_LABEL = { critical: 'sevCritical', high: 'sevHigh', medium: 'sevMedium', low: 'sevLow' }
    const sevLabel = function (key) { return t(SEV_LABEL[key] || 'sevMedium') }

    const quickState = { open: false, listeners: [] }
    const setQuickOpen = function (v) {
      quickState.open = v
      quickState.listeners.forEach(function (fn) { try { fn(v) } catch (e) {} })
    }
    const subscribeQuick = function (fn) {
      quickState.listeners.push(fn)
      return function () {
        const i = quickState.listeners.indexOf(fn)
        if (i >= 0) quickState.listeners.splice(i, 1)
      }
    }

    const copyText = function (text, done) {
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
          navigator.clipboard.writeText(text).then(function () { done(true) }).catch(function () { done(false) })
          return
        }
      } catch (e) {}
      done(false)
    }

    const TabButton = function (props) {
      return el('button', { className: props.active ? 'gate-tab gate-tab-on' : 'gate-tab', onClick: props.onClick }, props.label)
    }

    const GuideView = function () {
      const [open, setOpen] = React.useState(true)
      const tools = [
        ['gate_scan', t('toolScan')],
        ['gate_registry', t('toolRegistry')],
        ['gate_rate', t('toolRate')],
        ['gate_report', t('toolReport')],
      ]
      return el('div', { className: 'gate-card' },
        el('div', { className: 'gate-row' },
          el('h3', { style: { margin: 0, flex: 1 } }, t('guideTitle')),
          el('button', { className: 'gate-btn gate-btn-ghost', onClick: function () { setOpen(!open) } }, open ? t('guideCollapse') : t('guideExpand')),
        ),
        open ? el('div', { className: 'gate-guide-grid' },
          el('div', { className: 'gate-guide-col' },
            el('div', { className: 'gate-guide-title' }, t('guideUi')),
            el('div', { className: 'gate-guide-step' }, t('guideStep1')),
            el('div', { className: 'gate-guide-step' }, t('guideStep2')),
            el('div', { className: 'gate-guide-step' }, t('guideStep3')),
            el('div', { className: 'gate-guide-step' }, t('guideStep4')),
            el('div', { className: 'gate-guide-step' }, t('guideStep5')),
          ),
          el('div', { className: 'gate-guide-col' },
            el('div', { className: 'gate-guide-title' }, t('guideChat')),
            el('div', { className: 'gate-guide-step' }, t('guideChat1')),
            el('div', { className: 'gate-guide-step' }, t('guideChat2')),
            el('div', { className: 'gate-guide-step' }, t('guideChat3')),
            el('div', { className: 'gate-guide-title', style: { marginTop: 8 } }, t('guideTools')),
            tools.map(function (tl, i) {
              return el('div', { className: 'gate-guide-row', key: i },
                el('span', { className: 'gate-code' }, tl[0]),
                el('span', { className: 'gate-muted' }, tl[1]),
              )
            }),
          ),
        ) : null,
      )
    }

    const VerdictRow = function (props) {
      const r = props.report
      return el('div', null,
        el('div', { className: 'gate-row' },
          el('span', { className: 'gate-badge', style: { background: verdictColor(r.verdict.key) } }, verdictLabel(r.verdict.key)),
          el('span', { className: 'gate-muted' }, t('maliciousScore') + ' ' + r.score + ' / 100 · ' + t('permLevel') + ' ' + r.capabilityLevel + ' · ' + r.lines + ' ' + t('linesUnit')),
        ),
        el('div', { className: 'gate-meter' },
          el('div', { className: 'gate-meter-fill', style: { width: r.score + '%', background: verdictColor(r.verdict.key) } }),
        ),
      )
    }

    const FindingsView = function (props) {
      const findings = props.findings || []
      if (!findings.length) return el('div', { className: 'gate-muted' }, t('noFindings'))
      const colorOf = { critical: '#dc2626', high: '#ea580c', medium: '#d97706' }
      const bgOf = { critical: 'rgba(220,38,38,.07)', high: 'rgba(234,88,12,.07)', medium: 'rgba(217,119,6,.07)' }
      return el('div', null,
        el('h3', null, t('findingsTitle') + findings.length + t('findingsClose')),
        findings.map(function (f, i) {
          return el('div', { className: 'gate-find', key: i, style: { background: bgOf[f.severity] || 'rgba(128,128,128,.06)', borderColor: (colorOf[f.severity] || '#d97706') + '55' } },
            el('span', { className: 'gate-badge', style: { background: colorOf[f.severity] || '#d97706' } }, sevLabel(f.severity)),
            el('span', null, ' ' + f.label + ' ×' + f.count),
            f.line ? el('span', { className: 'gate-muted' }, t('lineAt') + f.line + t('lineEnd')) : null,
            el('div', { className: 'gate-muted' }, f.snippet),
          )
        }),
      )
    }

    const CapsView = function (props) {
      const caps = props.capabilities || []
      if (!caps.length) return el('div', { className: 'gate-muted' }, t('capsNone'))
      return el('div', null,
        el('h3', null, t('capsTitle')),
        el('div', null, caps.map(function (c, i) { return el('span', { className: 'gate-chip', key: i }, c.detail) })),
      )
    }

    const AiReviewView = function (props) {
      const r = props.review
      if (!r) return null
      const colorMap = { suspicious: '#dc2626', benign: '#16a34a', mixed: '#d97706', error: '#6b7280', skipped: '#6b7280' }
      const labelMap = { suspicious: t('aiSuspicious'), benign: t('aiBenign'), mixed: t('aiMixed'), error: t('aiError'), skipped: t('aiSkipped') }
      const color = colorMap[r.verdict] || '#6b7280'
      const label = labelMap[r.verdict] || r.verdict
      return el('div', { className: 'gate-find', style: { background: 'rgba(37,99,235,.06)', borderColor: 'rgba(37,99,235,.25)' } },
        el('span', { className: 'gate-badge', style: { background: color } }, '🤖 ' + label),
        el('div', null, r.summary),
        r.details ? el('div', { className: 'gate-muted' }, r.details) : null,
      )
    }

    const ReportView = function (props) {
      const res = props.result
      const reviewing = props.reviewing
      const onReview = props.onReview
      const [share, setShare] = React.useState(null)
      const [copied, setCopied] = React.useState('')
      if (!res || !res.ok) return null
      const doExport = function () {
        const target = res.kind === 'dir' ? res.aggregate : res.report
        host.call('gate.exportReport', { report: target }).then(function (out) {
          setShare(out && out.ok ? out.text : (t('exportFail') + ((out && out.error) || '?')))
        }).catch(function (e) { setShare(t('exportFail') + String((e && e.message) || e)) })
      }
      const doCopy = function () {
        if (!share) return
        copyText(share, function (ok) { setCopied(ok ? t('copied') : '') })
      }
      const shareBlock = el('div', null,
        el('div', { className: 'gate-row', style: { marginTop: 8 } },
          el('button', { className: 'gate-btn gate-btn-ghost', onClick: doExport }, t('shareBtn')),
          share ? el('button', { className: 'gate-btn gate-btn-ghost', onClick: doCopy }, copied || t('copyBtn')) : null,
        ),
        share ? el('div', null,
          el('div', { className: 'gate-muted', style: { marginTop: 6 } }, t('shareHint')),
          el('pre', { className: 'gate-share' }, share),
        ) : null,
      )
      const reviewBtn = el('div', { className: 'gate-row', style: { marginTop: 8 } },
        el('button', { className: 'gate-btn gate-btn-ghost', disabled: reviewing, onClick: onReview }, reviewing ? t('reviewing') : t('reviewBtn')),
      )
      if (res.kind === 'dir') {
        const agg = res.aggregate
        return el('div', { className: 'gate-card' },
          el('h3', null, t('dirDone') + res.files + t('filesUnit')),
          el(VerdictRow, { report: agg }),
          el('div', { className: 'gate-list' }, (res.reports || []).map(function (item) {
            return el('div', { className: 'gate-item', key: item.file },
              el('div', { className: 'gate-row' },
                el('span', { className: 'gate-chip' }, item.file),
                el('span', { className: 'gate-muted' }, t('maliciousScore') + ' ' + item.score + ' · ' + item.findingsCount + t('featureCount')),
              ),
            )
          })),
          el(FindingsView, { findings: agg.findings }),
          el(CapsView, { capabilities: agg.capabilities }),
          agg.aiReview ? el(AiReviewView, { review: agg.aiReview }) : null,
          onReview ? reviewBtn : null,
          shareBlock,
        )
      }
      const r = res.report
      return el('div', { className: 'gate-card' },
        el(VerdictRow, { report: r }),
        el(FindingsView, { findings: r.findings }),
        el(CapsView, { capabilities: r.capabilities }),
        r.aiReview ? el(AiReviewView, { review: r.aiReview }) : null,
        el('h3', null, t('traceTitle')),
        el('div', null, (r.trace || []).map(function (step, i) { return el('div', { className: 'gate-trace', key: i }, '▸ ' + step) })),
        el('h3', null, t('adviceTitle')),
        el('div', null, (r.advice || []).map(function (a, i) { return el('div', { className: 'gate-trace', key: i }, '• ' + a) })),
        onReview ? reviewBtn : null,
        shareBlock,
      )
    }

    const RegistryView = function (props) {
      const r = props.registry
      if (!r || !r.ok) return el('div', { className: 'gate-card' }, el('h3', null, t('registryTitle')), el('div', { className: 'gate-muted' }, t('registryLoading')))
      if (r.ready === false) return el('div', { className: 'gate-card' }, el('h3', null, t('registryTitle')), el('div', { className: 'gate-muted' }, t('registryPending')))
      return el('div', { className: 'gate-card' },
        el('h3', null, t('registryTitle')),
        el('div', { className: 'gate-muted' }, t('registrySummary') + r.total + t('registryUnit') + r.added.length + t('registryGone') + r.removed.length + t('registryRefresh')),
        r.added.length ? el('div', null, el('div', { className: 'gate-muted' }, t('registryAdded')), r.added.map(function (n) { return el('span', { className: 'gate-chip', key: n }, '+ ' + n) })) : null,
        r.removed.length ? el('div', null, el('div', { className: 'gate-muted' }, t('registryRemoved')), r.removed.map(function (n) { return el('span', { className: 'gate-chip', key: n }, '− ' + n) })) : null,
        r.arrivals && r.arrivals.length ? el('div', { style: { marginTop: 6 } }, el('div', { className: 'gate-muted' }, t('registryArrivals')), r.arrivals.slice(-5).map(function (a) { return el('span', { className: 'gate-chip', key: a.name + a.at }, '+ ' + a.name) })) : null,
      )
    }

    const SandboxTab = function () {
      const [source, setSource] = React.useState('')
      const [path, setPath] = React.useState('')
      const [result, setResult] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      const [reviewing, setReviewing] = React.useState(false)
      const [error, setError] = React.useState('')
      const [registry, setRegistry] = React.useState(null)
      const [history, setHistory] = React.useState([])
      const [dismissed, setDismissed] = React.useState({})
      const [copiedAt, setCopiedAt] = React.useState('')

      React.useEffect(function () {
        const refresh = function () {
          host.call('gate.registry').then(function (r) { setRegistry(r) }).catch(function () {})
        }
        refresh()
        host.call('gate.scanHistory').then(function (r) { if (r && r.ok) setHistory(r.history || []) }).catch(function () {})
        const dispose = ctx.interval(refresh, 8000)
        return function () { if (dispose) dispose() }
      }, [])

      const refreshHistory = function () {
        host.call('gate.scanHistory').then(function (r) { if (r && r.ok) setHistory(r.history || []) }).catch(function () {})
      }

      const scan = function (mode) {
        setBusy(true); setError(''); setResult(null)
        const method = mode === 'path' ? 'gate.scanPath' : 'gate.scanSource'
        const args = mode === 'path' ? { path: path } : { source: source }
        host.call(method, args).then(function (res) {
          setResult(res); setBusy(false); refreshHistory()
        }).catch(function (e) { setError(String((e && e.message) || e)); setBusy(false) })
      }

      const runReview = function () {
        if (!result || !result.ok) return
        setReviewing(true); setError('')
        const target = result.kind === 'dir'
          ? Object.assign({ name: '目录扫描:' + (result.path || '') }, result.aggregate)
          : result.report
        host.call('gate.review', { report: target }).then(function (res) {
          if (res && res.ok) {
            setResult(function (prev) {
              if (!prev || !prev.ok) return prev
              if (prev.kind === 'dir') return Object.assign({}, prev, { aggregate: res.report })
              return Object.assign({}, prev, { report: res.report })
            })
          } else {
            setError(t('aiReviewFail') + (res && res.error ? res.error : '?'))
          }
          setReviewing(false)
        }).catch(function (e) { setError(t('aiReviewFail') + String((e && e.message) || e)); setReviewing(false) })
      }

      const copyVerdict = function (h) {
        const text = '🛡️ SecurityGate · ' + h.name + ' → ' + verdictLabel(h.verdictKey) + '（' + t('maliciousScore') + ' ' + h.score + '/100 · ' + t('permLevel') + ' ' + h.capabilityLevel + '）'
        copyText(text, function (ok) { setCopiedAt(ok ? h.at : '') })
      }

      const arrivals = (registry && registry.arrivals ? registry.arrivals : []).filter(function (a) { return !dismissed[a.name] })

      return el('div', null,
        arrivals.length ? el('div', { className: 'gate-card', style: { borderColor: 'rgba(220,38,38,.45)' } },
          el('div', { className: 'gate-row' },
            el('strong', null, t('arrivalTitle')),
            el('span', { className: 'gate-muted' }, t('arrivalObserved')),
            el('button', { className: 'gate-btn gate-btn-ghost', style: { marginLeft: 'auto', padding: '2px 10px' }, onClick: function () { const d = {}; arrivals.forEach(function (a) { d[a.name] = true }); setDismissed(d) } }, t('gotIt')),
          ),
          el('div', { className: 'gate-trace', style: { marginTop: 6 } }, arrivals.slice(0, 6).map(function (a) { return '+ ' + a.name }).join('　')),
        ) : null,
        el('div', { className: 'gate-card' },
          el('h3', null, t('sandboxTitle')),
          el('textarea', { className: 'gate-textarea', value: source, placeholder: t('sandboxPh'), onChange: function (e) { setSource(e.target.value) } }),
          el('div', { className: 'gate-row', style: { marginTop: 8 } },
            el('button', { className: 'gate-btn', disabled: busy || !source.trim(), onClick: function () { scan('source') } }, busy ? t('scanning') : t('scanBtn')),
          ),
        ),
        el('div', { className: 'gate-card' },
          el('h3', null, t('scanDirTitle')),
          el('div', { className: 'gate-row' },
            el('input', { className: 'gate-input', value: path, placeholder: t('scanDirPh'), onChange: function (e) { setPath(e.target.value) } }),
            el('button', { className: 'gate-btn', disabled: busy || !path.trim(), onClick: function () { scan('path') } }, t('scanBtn2')),
          ),
        ),
        error ? el('div', { className: 'gate-error' }, error) : null,
        el(ReportView, { result: result, reviewing: reviewing, onReview: runReview }),
        el('div', { className: 'gate-card' },
          el('h3', null, t('historyTitle')),
          history.length ? el('div', { className: 'gate-list' }, history.slice(0, 10).map(function (h) {
            return el('div', { className: 'gate-item', key: h.at + h.name },
              el('div', { className: 'gate-row' },
                el('span', { className: 'gate-chip' }, h.name),
                el('span', { className: 'gate-badge', style: { background: verdictColor(h.verdictKey) } }, verdictLabel(h.verdictKey)),
                el('span', { className: 'gate-muted' }, t('maliciousScore') + ' ' + h.score + ' · ' + String(h.at).slice(5, 16).replace('T', ' ')),
                el('button', { className: 'gate-btn gate-btn-ghost', style: { marginLeft: 'auto', padding: '2px 10px', fontSize: 12 }, onClick: function () { copyVerdict(h) } }, copiedAt === h.at ? t('copied') : t('historyCopy')),
              ),
            )
          })) : el('div', { className: 'gate-muted' }, t('historyEmpty')),
        ),
        el(RegistryView, { registry: registry }),
      )
    }

    const renderStars = function (value, onPick) {
      return el('div', null, [1, 2, 3, 4, 5].map(function (n) {
        return el('button', { className: n <= value ? 'gate-star gate-star-on' : 'gate-star', key: n, onClick: function () { onPick(n) } }, '★')
      }))
    }

    const CommunityTab = function () {
      const [store, setStore] = React.useState(null)
      const [plugin, setPlugin] = React.useState('')
      const [score, setScore] = React.useState(5)
      const [comment, setComment] = React.useState('')
      const [author, setAuthor] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const [msg, setMsg] = React.useState('')

      const refresh = function () { host.call('gate.store').then(function (s) { setStore(s) }).catch(function () {}) }
      React.useEffect(function () { refresh() }, [])

      const submit = function () {
        if (!plugin.trim()) { setMsg(t('needPluginName')); return }
        setBusy(true); setMsg('')
        host.call('gate.rate', { plugin: plugin.trim(), score: score, comment: comment.trim(), author: author.trim() }).then(function (res) {
          if (res && res.ok) {
            setComment('')
            setStore(function (s) { return Object.assign({}, s, { ratings: res.ratings }) })
            setMsg(t('ratedOk'))
          } else {
            setMsg(t('failPrefix') + (res && res.error ? res.error : '?'))
          }
          setBusy(false)
        }).catch(function (e) { setMsg(t('failPrefix') + String((e && e.message) || e)); setBusy(false) })
      }

      const ratings = store && store.ratings ? store.ratings : []
      return el('div', null,
        el('div', { className: 'gate-card' },
          el('h3', null, t('communityTitle')),
          el('div', { className: 'gate-muted' }, t('communityIntro')),
        ),
        el('div', { className: 'gate-card' },
          el('h3', null, t('communitySubmit')),
          el('div', { className: 'gate-row' },
            el('input', { className: 'gate-input', value: plugin, placeholder: t('pluginName'), onChange: function (e) { setPlugin(e.target.value) } }),
            renderStars(score, setScore),
          ),
          el('input', { className: 'gate-input', style: { width: '100%', marginTop: 8, boxSizing: 'border-box' }, value: comment, placeholder: t('commentPh'), onChange: function (e) { setComment(e.target.value) } }),
          el('div', { className: 'gate-row', style: { marginTop: 8 } },
            el('input', { className: 'gate-input', style: { maxWidth: 180 }, value: author, placeholder: t('authorPh'), onChange: function (e) { setAuthor(e.target.value) } }),
            el('button', { className: 'gate-btn', disabled: busy, onClick: submit }, busy ? t('submitting') : t('submitRating')),
          ),
          msg ? el('div', { className: msg.charAt(0) === '✅' ? 'gate-ok' : 'gate-error' }, msg) : null,
        ),
        el('div', { className: 'gate-card' },
          el('h3', null, t('leaderboard') + ratings.length + t('leaderboardClose')),
          el('div', { className: 'gate-list' }, ratings.map(function (r) {
            return el('div', { className: 'gate-item', key: r.plugin },
              el('div', { className: 'gate-row' },
                el('strong', null, r.plugin),
                renderStars(Math.round(r.avg), function () {}),
                el('span', { className: 'gate-muted' }, r.avg + ' / 5 · ' + r.count + t('people')),
              ),
              r.latest.map(function (c, i) { return el('div', { className: 'gate-trace', key: i }, '“' + c.comment + '” — ' + c.author + '（' + c.score + '★）') }),
            )
          })),
        ),
      )
    }

    const BountyTab = function () {
      const [store, setStore] = React.useState(null)
      const [plugin, setPlugin] = React.useState('')
      const [title, setTitle] = React.useState('')
      const [description, setDescription] = React.useState('')
      const [severity, setSeverity] = React.useState('high')
      const [author, setAuthor] = React.useState('')
      const [busy, setBusy] = React.useState(false)
      const [msg, setMsg] = React.useState('')
      const STATUS_KEYS = { open: 'stOpen', 'under-review': 'stUnderReview', confirmed: 'stConfirmed', dismissed: 'stDismissed', fixed: 'stFixed', blacklisted: 'stBlacklisted' }

      const refresh = function () { host.call('gate.store').then(function (s) { setStore(s) }).catch(function () {}) }
      React.useEffect(function () { refresh() }, [])

      const submit = function () {
        if (!plugin.trim() || !title.trim()) { setMsg(t('needTitle')); return }
        setBusy(true); setMsg('')
        host.call('gate.report', { plugin: plugin.trim(), title: title.trim(), description: description.trim(), severity: severity, author: author.trim() }).then(function (res) {
          if (res && res.ok) {
            setTitle(''); setDescription('')
            setStore(function (s) { return Object.assign({}, s, { reports: res.reports }) })
            setMsg(t('reportOk') + res.report.bounty + t('reportOk2'))
          } else {
            setMsg(t('failPrefix') + (res && res.error ? res.error : '?'))
          }
          setBusy(false)
        }).catch(function (e) { setMsg(t('failPrefix') + String((e && e.message) || e)); setBusy(false) })
      }

      const setStatus = function (id, status) {
        host.call('gate.reportStatus', { id: id, status: status }).then(function (res) {
          if (res && res.ok) {
            setStore(function (s) { return Object.assign({}, s, { reports: res.reports }) })
            setMsg(t('statusUpdateOk'))
          } else {
            setMsg(t('statusUpdateFail') + (res && res.error ? res.error : '?'))
          }
        }).catch(function (e) { setMsg(t('statusUpdateFail') + String((e && e.message) || e)) })
      }

      const sevColor = { critical: '#dc2626', high: '#ea580c', medium: '#d97706', low: '#16a34a' }
      const reports = store && store.reports ? store.reports : []
      return el('div', null,
        el('div', { className: 'gate-card' },
          el('h3', null, t('bountyTitle')),
          el('div', { className: 'gate-muted' }, t('bountyIntro')),
          el('div', { className: 'gate-muted', style: { marginTop: 4 } }, t('statusFlow')),
        ),
        el('div', { className: 'gate-card' },
          el('h3', null, t('reportForm')),
          el('div', { className: 'gate-row' },
            el('input', { className: 'gate-input', value: plugin, placeholder: t('pluginName'), onChange: function (e) { setPlugin(e.target.value) } }),
            el('select', { className: 'gate-input', style: { flex: 'none', minWidth: 110 }, value: severity, onChange: function (e) { setSeverity(e.target.value) } },
              el('option', { value: 'critical' }, t('sevCritical')),
              el('option', { value: 'high' }, t('sevHigh')),
              el('option', { value: 'medium' }, t('sevMedium')),
              el('option', { value: 'low' }, t('sevLow')),
            ),
            el('input', { className: 'gate-input', style: { flex: 'none', minWidth: 120 }, value: author, placeholder: t('authorPh'), onChange: function (e) { setAuthor(e.target.value) } }),
          ),
          el('input', { className: 'gate-input', style: { width: '100%', marginTop: 8, boxSizing: 'border-box' }, value: title, placeholder: t('titlePh'), onChange: function (e) { setTitle(e.target.value) } }),
          el('textarea', { className: 'gate-textarea', style: { marginTop: 8, minHeight: 80 }, value: description, placeholder: t('descPh'), onChange: function (e) { setDescription(e.target.value) } }),
          el('div', { className: 'gate-row', style: { marginTop: 8 } },
            el('button', { className: 'gate-btn', disabled: busy, onClick: submit }, busy ? t('submitting') : t('submitReport')),
          ),
          msg ? el('div', { className: msg.charAt(0) === '✅' ? 'gate-ok' : 'gate-error' }, msg) : null,
        ),
        el('div', { className: 'gate-card' },
          el('h3', null, t('bountyTitle') + '（' + reports.length + '）'),
          el('div', { className: 'gate-list' }, reports.map(function (r) {
            return el('div', { className: 'gate-item', key: r.id },
              el('div', { className: 'gate-row' },
                el('span', { className: 'gate-badge', style: { background: sevColor[r.severity] || '#16a34a' } }, sevLabel(r.severity)),
                el('strong', null, r.title),
                el('span', { className: 'gate-chip' }, '+' + r.bounty + ' ' + t('points')),
                r.awarded ? el('span', { className: 'gate-chip', style: { background: 'rgba(22,163,74,.12)', borderColor: 'rgba(22,163,74,.35)' } }, '✅ ' + t('awarded')) : null,
              ),
              el('div', { className: 'gate-muted' }, r.plugin + ' · ' + r.author + ' · ' + String(r.at).slice(0, 10)),
              r.description ? el('div', { className: 'gate-trace' }, r.description) : null,
              el('div', { className: 'gate-row', style: { marginTop: 4 } },
                el('span', { className: 'gate-muted' }, t('statusLabel') + '：'),
                el('select', { className: 'gate-input', style: { flex: 'none', minWidth: 120, padding: '2px 6px', fontSize: 12 }, value: r.status || 'open', onChange: function (e) { setStatus(r.id, e.target.value) } },
                  el('option', { value: 'open' }, t('stOpen')),
                  el('option', { value: 'under-review' }, t('stUnderReview')),
                  el('option', { value: 'confirmed' }, t('stConfirmed')),
                  el('option', { value: 'dismissed' }, t('stDismissed')),
                  el('option', { value: 'fixed' }, t('stFixed')),
                  el('option', { value: 'blacklisted' }, t('stBlacklisted')),
                ),
              ),
            )
          })),
        ),
      )
    }

    const QuickButton = function () {
      useLocaleTick()
      const [active, setActive] = React.useState(quickState.open)
      React.useEffect(function () {
        return subscribeQuick(setActive)
      }, [])
      return el('button', {
        title: t('quickTitle'),
        onClick: function () { setQuickOpen(!quickState.open) },
        style: { border: 'none', background: active ? 'rgba(37,99,235,.22)' : 'transparent', cursor: 'pointer', fontSize: 15, borderRadius: 8, padding: '4px 6px', lineHeight: 1 },
      }, '🛡️')
    }

    const ArrivalsAlert = function () {
      useLocaleTick()
      const [registry, setRegistry] = React.useState(null)
      const [dismissed, setDismissed] = React.useState({})
      React.useEffect(function () {
        const refresh = function () {
          host.call('gate.registry').then(function (r) { setRegistry(r) }).catch(function () {})
        }
        refresh()
        const dispose = ctx.interval(refresh, 8000)
        return function () { if (dispose) dispose() }
      }, [])
      const arrivals = (registry && registry.arrivals ? registry.arrivals : []).filter(function (a) { return !dismissed[a.name] })
      if (!arrivals.length) return null
      return el('div', { style: { position: 'fixed', right: 16, bottom: 84, zIndex: 9999, maxWidth: 360, background: 'var(--bg-card, #1f2430)', color: 'var(--text-primary, #e6e6e6)', border: '1px solid rgba(220,38,38,.45)', borderRadius: 12, padding: '10px 14px', boxShadow: '0 6px 24px rgba(0,0,0,.35)' } },
        el('div', { style: { fontWeight: 700, fontSize: 13 } }, t('arrivalTitle')),
        el('div', { className: 'gate-muted', style: { marginTop: 4 } }, arrivals.slice(0, 4).map(function (a) { return a.name }).join('、') + (arrivals.length > 4 ? ' 等' : '') + ' — ' + t('arrivalObserved')),
        el('div', { className: 'gate-row', style: { marginTop: 8 } },
          el('button', { className: 'gate-btn gate-btn-ghost', style: { padding: '4px 10px', fontSize: 12 }, onClick: function () { setQuickOpen(true) } }, t('quickTitle')),
          el('button', { className: 'gate-btn gate-btn-ghost', style: { padding: '4px 10px', fontSize: 12 }, onClick: function () { const d = {}; arrivals.forEach(function (a) { d[a.name] = true }); setDismissed(d) } }, t('gotIt')),
        ),
      )
    }

    const QuickPanel = function () {
      useLocaleTick()
      const [open, setOpen] = React.useState(quickState.open)
      React.useEffect(function () {
        return subscribeQuick(setOpen)
      }, [])
      const [source, setSource] = React.useState('')
      const [result, setResult] = React.useState(null)
      const [busy, setBusy] = React.useState(false)
      const [reviewing, setReviewing] = React.useState(false)
      const [error, setError] = React.useState('')
      if (!open) return null
      const scan = function () {
        setBusy(true); setError(''); setResult(null)
        host.call('gate.scanSource', { source: source }).then(function (res) {
          setResult(res); setBusy(false)
        }).catch(function (e) { setError(String((e && e.message) || e)); setBusy(false) })
      }
      const runReview = function () {
        if (!result || !result.ok) return
        setReviewing(true); setError('')
        host.call('gate.review', { report: result.report }).then(function (res) {
          if (res && res.ok) {
            setResult(function (prev) { return prev && prev.ok ? Object.assign({}, prev, { report: res.report }) : prev })
          } else {
            setError(t('aiReviewFail') + (res && res.error ? res.error : '?'))
          }
          setReviewing(false)
        }).catch(function (e) { setError(t('aiReviewFail') + String((e && e.message) || e)); setReviewing(false) })
      }
      return el('div', { style: { position: 'fixed', right: 16, bottom: 190, zIndex: 9998, width: 380, maxWidth: 'calc(100vw - 32px)', background: 'var(--bg-card, #1f2430)', color: 'var(--text-primary, #e6e6e6)', border: '1px solid var(--border-subtle, rgba(128,128,128,.35))', borderRadius: 14, padding: 12, boxShadow: '0 10px 32px rgba(0,0,0,.4)' } },
        el('div', { className: 'gate-row' },
          el('strong', null, t('quickTitle')),
          el('button', { className: 'gate-btn gate-btn-ghost', style: { marginLeft: 'auto', padding: '2px 8px' }, onClick: function () { setQuickOpen(false) } }, '✕'),
        ),
        el('textarea', { className: 'gate-textarea', style: { minHeight: 90, marginTop: 8 }, value: source, placeholder: t('quickPh'), onChange: function (e) { setSource(e.target.value) } }),
        el('div', { className: 'gate-row', style: { marginTop: 8 } },
          el('button', { className: 'gate-btn', disabled: busy || !source.trim(), onClick: scan }, busy ? t('scanning') : t('scanBtn')),
          el('button', { className: 'gate-btn gate-btn-ghost', disabled: reviewing || !result || !result.ok, onClick: runReview }, reviewing ? t('reviewing') : t('aiReviewBtn')),
        ),
        error ? el('div', { className: 'gate-error' }, error) : null,
        el(ReportView, { result: result, reviewing: reviewing, onReview: runReview }),
        el('div', { className: 'gate-muted', style: { marginTop: 6 } }, t('quickFooter')),
      )
    }

    const RunCard = function () {
      useLocaleTick()
      const [status, setStatus] = React.useState(null)
      React.useEffect(function () {
        host.call('gate.status').then(function (r) { if (r && r.ok) setStatus(r) }).catch(function () {})
      }, [])
      return el('div', { style: { padding: '8px 12px', fontSize: 12.5, lineHeight: 1.6, border: '1px solid var(--border-subtle, rgba(128,128,128,.25))', borderRadius: 10, marginTop: 8 } },
        el('div', { style: { fontWeight: 700 } }, t('runTitle') + (status ? ' · v' + status.version : '')),
        el('div', { className: 'gate-muted' }, status ? t('runStats') + status.scanCount + t('runStats2') + status.tools + t('runStats3') + status.storePath : t('runLoading')),
        el('div', { className: 'gate-muted' }, t('runHint')),
      )
    }

    const GateApp = function () {
      useLocaleTick()
      const [tab, setTab] = React.useState('sandbox')
      return el('div', { className: 'gate-wrap' },
        el('div', { className: 'gate-hero' },
          el('h2', null, t('appTitle')),
          el('p', null, t('appSub')),
        ),
        el(GuideView),
        el('div', { className: 'gate-tabs' },
          el(TabButton, { active: tab === 'sandbox', label: t('tabSandbox'), onClick: function () { setTab('sandbox') } }),
          el(TabButton, { active: tab === 'community', label: t('tabCommunity'), onClick: function () { setTab('community') } }),
          el(TabButton, { active: tab === 'bounty', label: t('tabBounty'), onClick: function () { setTab('bounty') } }),
        ),
        tab === 'sandbox' ? el(SandboxTab) : tab === 'community' ? el(CommunityTab) : el(BountyTab),
      )
    }

    const slots = ctx.get('slots')
    if (slots === undefined) return
    slots.inject('settings.section', () => slots.register(
      { name: 'settings.section', id: 'security-gate', order: 25, label: '🛡️ 插件安检门' },
      () => React.createElement(GateApp),
    ))
    slots.inject('tool.view.cordis', () => slots.register(
      { name: 'tool.view.cordis', key: 'self' },
      () => React.createElement(RunCard),
    ))
    slots.inject('conversation.session.header.actions', () => slots.register(
      { name: 'conversation.session.header.actions', id: 'gate-quick', order: 90, label: '插件安检门快检' },
      () => React.createElement(QuickButton),
    ))
    slots.inject('shell.overlay', () => slots.register(
      { name: 'shell.overlay', id: 'gate-arrivals', order: 40, label: '安检门新工具提醒' },
      () => React.createElement(ArrivalsAlert),
    ))
    slots.inject('shell.overlay', () => slots.register(
      { name: 'shell.overlay', id: 'gate-quick-panel', order: 50, label: '安检门快检面板' },
      () => React.createElement(QuickPanel),
    ))
  },
}

