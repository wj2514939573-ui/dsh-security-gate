// publish-rest.mjs — create the GitHub repo and upload every file via the REST API.
//
// Why REST instead of `git push`: this machine's system TLS store is broken for
// schannel/curl/git (SEC_E_NO_CREDENTIALS), while Node's bundled CA works.
// This script uses only verified-TLS https calls — never disables verification.
//
// Usage: GITHUB_TOKEN=<fine-grained PAT> node scripts/publish-rest.mjs [repo-name]
import { request as httpsRequest } from 'node:https'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve, join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
if (!token) {
  console.error('FAIL: set GITHUB_TOKEN (fine-grained PAT, Contents: Read and write on the target repo)')
  process.exit(1)
}

const repoName = process.argv[2] || 'dsh-security-gate'
const root = resolve(fileURLToPath(new URL('.', import.meta.url)), '..')

function request(method, urlPath, body) {
  return new Promise((resolvePromise, reject) => {
    const bodyBuf = body === undefined ? null : Buffer.from(JSON.stringify(body))
    const req = httpsRequest({
      hostname: 'api.github.com',
      path: urlPath,
      method,
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'dsh-security-gate-publish',
        'Content-Type': 'application/json',
        ...(bodyBuf ? { 'Content-Length': bodyBuf.length } : {}),
      },
    }, (res) => {
      let data = ''
      res.on('data', (c) => { data += c })
      res.on('end', () => {
        let parsed = null
        try { parsed = JSON.parse(data) } catch { /* keep raw */ }
        if (res.statusCode >= 400) {
          reject(new Error(`${method} ${urlPath} -> ${res.statusCode} ${parsed && parsed.message ? parsed.message : data.slice(0, 200)}`))
        } else {
          resolvePromise(parsed || data)
        }
      })
    })
    req.on('error', reject)
    if (bodyBuf) req.write(bodyBuf)
    req.end()
  })
}

async function main() {
  // 1. identity
  const me = await request('GET', '/user')
  const owner = me.login
  console.log(`publishing as ${owner} / ${repoName}`)

  // 2. create repo (tolerate "already exists")
  try {
    const created = await request('POST', '/user/repos', {
      name: repoName,
      description: 'SecurityGate（插件安检门）— inspect DSH plugins before install: dual-dimension static scan + LLM AI review + runtime watch + community ratings & bug bounty.',
      private: false,
      has_issues: true,
      has_wiki: false,
    })
    console.log('repo created:', created.html_url)
  } catch (e) {
    if (!String(e.message).includes('already exists')) throw e
    console.log('repo already exists — updating files')
  }

  // 3. collect files (excluding nothing; .gitignore uploads fine)
  const files = []
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name)
      if (statSync(p).isDirectory()) walk(p)
      else files.push({ path: relative(root, p).split('\\').join('/'), abs: p })
    }
  }
  walk(root)
  files.sort((a, b) => a.path.localeCompare(b.path))

  // 4. upload each file (create, or update with sha when it already exists)
  for (const f of files) {
    if (f.path.startsWith('.git/')) continue
    const content = readFileSync(f.abs)
    if (content.length > 90 * 1024 * 1024) { console.log('  skip (too big):', f.path); continue }
    const apiPath = '/repos/' + owner + '/' + repoName + '/contents/' + f.path.split('/').map(encodeURIComponent).join('/')
    let body = { message: 'Add ' + f.path, content: content.toString('base64') }
    try {
      await request('PUT', apiPath, body)
      console.log('  uploaded', f.path)
    } catch (e) {
      if (String(e.message).includes('sha')) {
        try {
          const existing = await request('GET', apiPath)
          body = { message: 'Update ' + f.path, content: content.toString('base64'), sha: existing.sha }
          await request('PUT', apiPath, body)
          console.log('  updated ', f.path)
        } catch (e2) {
          console.error('  FAILED  ', f.path, e2.message)
        }
      } else {
        console.error('  FAILED  ', f.path, e.message)
      }
    }
  }

  console.log('done → https://github.com/' + owner + '/' + repoName)
}

main().catch((e) => { console.error('FAIL:', e.message); process.exit(1) })
