# Security Policy

## Scope

This plugin inspects **other plugins** for malicious behavior. Its own runtime makes no network calls and stores community data only in the local workspace (`<workspace>/.security-gate-store.json`).

## Reporting a vulnerability

If you find a vulnerability in SecurityGate itself (e.g., the scanner can be tricked, findings are misleading, or the plugin mishandles data), please report it via the GitHub issue tracker with the `security` label, or use the plugin's built-in Bug Bounty tab (report the plugin as `dsh-security-gate`).

Include:

- Plugin / package version
- A minimal reproduction (paste the scanned source or describe the scenario)
- Expected vs actual behavior

## What SecurityGate does NOT guarantee

- Static analysis is heuristic: a clean report does **not** prove a plugin is safe, and a finding is **not** proof of malice — use the 🤖 AI review and human judgment before installing anything
- The community store is local-only in v1.x; ratings are not independently verified
- Scanned plugin source is never executed by the scanner and is never uploaded anywhere
