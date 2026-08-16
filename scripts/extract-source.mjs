// extract-source.mjs — extract the exact pkg-18 host/client source from a cordis_inspect_self spill
// and write it into the distributable repo layout (plugin/host.js, client.js, raw bodies, source.json).
// Usage: node scripts/extract-source.mjs <spill-file> <target-dir>
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const spillPath = process.argv[2]
const targetDir = process.argv[3]

const data = JSON.parse(readFileSync(spillPath, 'utf8'))
const host = data.code.host
const client = data.code.client

if (typeof host !== 'string' || !host.includes('apply(ctx)')) {
  console.error('FAIL: host code missing or malformed')
  process.exit(1)
}
if (typeof client !== 'string' || !client.includes('apply(ctx)')) {
  console.error('FAIL: client code missing or malformed')
  process.exit(1)
}

// Syntax check: each half is a function body that must compile as a function.
try {
  new Function(host)
  new Function(client)
} catch (e) {
  console.error('FAIL: syntax check:', e.message)
  process.exit(1)
}

const pluginDir = join(targetDir, 'plugin')
mkdirSync(pluginDir, { recursive: true })

const banner = (half) => `/**
 * dsh-security-gate — ${half} half
 *
 * Source: extracted verbatim from the running dynamic Cordis Plugin
 * (gate-2 / pkg-18) of the DeepSeek Harness session that produced it.
 *
 * Usage: when loading this plugin into DSH via \`cordis_define\`, pass this
 * file's module export as \`code.${half}\`. The file exports a factory
 * function whose body is exactly what the Host records as the Plugin source;
 * \`plugin/${half}.raw.js\` contains the bare function body without the wrapper.
 */

'use strict'

module.exports = function ${half}Half() {
`

writeFileSync(join(pluginDir, 'host.js'), banner('host') + host + '\n}\n', 'utf8')
writeFileSync(join(pluginDir, 'client.js'), banner('client') + client + '\n}\n', 'utf8')
writeFileSync(join(pluginDir, 'host.raw.js'), host + '\n', 'utf8')
writeFileSync(join(pluginDir, 'client.raw.js'), client + '\n', 'utf8')
writeFileSync(join(pluginDir, 'source.json'), JSON.stringify({
  plugin: { kind: 'new', idPrefix: 'gate' },
  name: 'security-gate 插件安检门',
  purpose: '安装插件前先过安检门：双维静态安全扫描（恶意风险分 + 权限能力面）、LLM AI 复核、运行时注册观察、社区安全评分与漏洞赏金。',
  host,
  client,
}, null, 2), 'utf8')

console.log('OK:')
console.log('  host chars   :', host.length)
console.log('  client chars :', client.length)
console.log('  files        :', readdirSync(pluginDir).join(', '))
