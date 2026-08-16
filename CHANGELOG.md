# Changelog

## v1.0.0 (2026-08) — initial open-source release

Extracted verbatim from the running DSH dynamic plugin `gate-2/pkg-18` (v10 of the development line).

### Development history (in-session builds)

- **v1** — initial SecurityGate: static scan (10 heuristic rules), dry-run preview, runtime registry observation, local community ratings + bug bounty, 4 model tools, settings page
- **v2** — fixed `harness.defineTool` DSL shape (`{ parameters, output: { schema, render }, execute }`)
- **v3/v4** — runtime observation moved to the agent scope (sandboxed plugin ctx only saw its own tools); baseline-ready sequencing
- **v5/v6** — community store anchored to the session workspace via `sandboxPolicy.resolve({ session })`, write policy attached; persistence self-check (`storePath` / `persistOk`)
- **v7** — fixed "dynamic code execution" false positive (removed case-insensitive `Function(` match)
- **v8** — in-app usage guide (settings UI + conversation modes)
- **v9** — dual-dimension scoring (malicious-risk score vs capability surface); LLM AI review; new-tool arrival alerts; session-header quick button + floating panel; Run-card on-duty card
- **v10** — scan history persisted with the store; share/export report with copy; zh-CN/en-US i18n via the `locale` service; bug-bounty audit flow (pending → under review → confirmed/dismissed/fixed/blacklisted, points awarded badge)
