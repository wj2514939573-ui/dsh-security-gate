# 🛡️ dsh-security-gate · 插件安检门 / SecurityGate

> **装插件，先过安检门。**
> A DSH (DeepSeek Harness / Cordis) plugin that inspects other plugins **before you install them** — static scan + AI review + runtime watch, community ratings and bug bounty.

- Plugin ID: `gate-2` · Package: `pkg-18` (v1.0.0 / v10)
- Platform: DeepSeek Harness dynamic Cordis plugin (Host + Client)

---

## Why SecurityGate

dsh-plugin-marketplace validates plugins and dsh-suite tests compatibility, but those are **after-the-fact checks**. SecurityGate moves security to **proactive defense before install**:

```
                   ┌──────────────────────────────────────────┐
                   │   🛡️ SecurityGate · 插件安检门            │
   new plugin ───▶ │ ① Static scan (malicious score + caps)    │
                   │ ② 🤖 LLM AI review (false-positive check) │
                   │ ③ Runtime registry watch (live arrivals)  │
                   │ ④ Community ratings + bug bounty          │
                   │  → verdict & advice → install with trust  │
                   └──────────────────────────────────────────┘
```

## Features

| # | Feature | Description |
| --- | --- | --- |
| 1 | **Dual-dimension scan** | `恶意风险分` (malicious-risk score 0-100: dynamic code / shell / raw fs / obfuscation / policy bypass / persistence / exfil) **separated from** `权限能力面` (capability surface: network / file write / env read / services / tools — functional permissions, not malice) |
| 2 | **🤖 LLM AI review** | One click: the current model re-judges static findings to filter false positives (`gate_scan` `ai_review` param) |
| 3 | **Runtime registry watch** | Baselines the visible tool set at startup, subscribes `tools/change`, tracks added/removed tools and recent arrivals |
| 4 | **New-tool alert** | A floating "🚨 new plugin tools detected" toast appears when any plugin registers tools during the session |
| 5 | **Quick access** | A 🛡️ button in the session header opens a floating quick-scan panel — no need to open Settings |
| 6 | **Scan history** | Last 20 scans persisted with the community store; per-entry verdict copy |
| 7 | **Share report** | One-click export + copy of a shareable inspection report with the "✅ passed SecurityGate" stamp |
| 8 | **Community ratings** | 1-5 star security ratings + comments, leaderboard (local store; cloud sync on the roadmap) |
| 9 | **Bug bounty flow** | Submit reports (critical 1000 / high 500 / medium 200 / low 50 pts), audit flow: pending → under review → confirmed (points awarded) / dismissed / fixed / blacklisted |
| 10 | **i18n** | zh-CN / en-US UI via the `locale` service (auto-falls back to Chinese) |
| 11 | **Onboarding** | A "SecurityGate is on duty" card in the Run card + in-app usage guide |

## Installation

This is a dynamic Cordis plugin for DSH. Two ways:

### A. From the define payload (recommended, reproducible)

The file [`plugin/source.json`](plugin/source.json) contains the exact `cordis_define` payload:

```
plugin:  { kind: 'new', idPrefix: 'gate' }
name:    security-gate 插件安检门
purpose: 安装插件前先过安检门：双维静态安全扫描（恶意风险分 + 权限能力面）、
         LLM AI 复核、运行时注册观察、社区安全评分与漏洞赏金。
code.host:    plugin/host.js (or host.raw.js)
code.client:  plugin/client.js (or client.raw.js)
```

Ask your DSH agent to define it with `code.host` = `plugin/host.raw.js` content and `code.client` = `plugin/client.raw.js` content, then run it. Approve the client half when prompted.

### B. Manual copy

`plugin/host.raw.js` and `plugin/client.raw.js` are the bare function bodies exactly as recorded by the Host — paste them into `cordis_define`.

## How to use

**Settings UI:** Sidebar → Settings → **🛡️ 插件安检门**
- 🧪 Preview Sandbox: paste source or scan a local file/directory → risk score, capability surface, findings (with line numbers), dry-run trace, advice; **🤖 AI Review** button
- ⭐ Community Ratings: rate plugins 1-5 stars, leaderboard
- 🐛 Bug Bounty: submit reports, drive the audit status flow

**Conversation:** just say *"用安检门扫一下这个插件"* — the model calls `gate_scan` automatically. Four model tools:

| Tool | Purpose |
| --- | --- |
| `gate_scan` | static scan + dry-run preview; `source` or `path`; optional `ai_review` |
| `gate_registry` | runtime registry watch: tools added/removed since gate start, recent arrivals |
| `gate_rate` | submit a 1-5 star community rating |
| `gate_report` | submit a bug bounty report |

## Architecture

```
Host (Node process):
  static scan engine (7 malicious rules × weights → 0-100 score; 4 capability markers)
  AI review (llm service + agentDefaultModel, JSON verdict parsing)
  runtime watcher (tools baseline + tools/change subscription, arrivals log)
  community store (ratings + reports + history, persisted to <workspace>/.security-gate-store.json)
  scan history + share-text exporter
  4 model tools + 11 package-private RPCs
Client (browser):
  settings page (3 tabs) + usage guide (i18n)
  session-header 🛡️ quick button + floating quick-scan panel
  floating new-arrival alert (8s poll)
  Run card "on duty" status card
```

## Data & privacy

- Community data lives **locally**: `<workspace>/.security-gate-store.json` (ratings, reports, scan history)
- SecurityGate itself makes **no network calls** (the plugin's own runtime sends nothing anywhere)
- Scanning is **read-only**: inspected code is never executed
- AI review sends only scan findings/snippets to the configured model

## Roadmap

- [ ] v2.0: cloud community backend (shared ratings / blacklist / bounty across users — minimal JSON API or serverless)
- [ ] Cloud preview sandbox backend (e2b / container) behind the `backend` seam
- [ ] Marketplace integration (install button → inspection gate)
- [ ] Behavior signature library (known-malicious fingerprints + auto-blacklist)

## License

MIT — see [LICENSE](LICENSE).
