# Claude Code Tooling, Security, and Context Budget

## Principles
- **No magic token-saving skill:** token efficiency comes mostly from reading fewer files, invoking focused skills on demand, keeping root `CLAUDE.md` short, reusing approved decisions and clearing irrelevant session history.
- Keep **permanent rules** in a concise root `CLAUDE.md`, **reference information** in topical docs, and **repeatable procedures** in `.claude/skills/<skill>/SKILL.md` so the full skill loads only when used.
- Use one task and one approved section per session or clear context when switching scope.
- Read only what the active task needs. Avoid repeating large documentation files or command logs in chat.
- Use `/context` to inspect active context; `/clear` between independent tasks; `/compact` to continue a long active task. Prefer `@`-mentioning specific relevant files. Set model/effort before the task and avoid changing them mid-session solely for a marginal gain.
- Disable irrelevant MCP connections/tools in the current session if they unnecessarily inflate context. Never disable a tool needed for the task.
- Prefer concise completion reports with Figma links and blockers, not long descriptions of every action.
- Installing more plugins is **not** automatically more efficient: use only those relevant to the active phase.

## Phase 04 — Recommended
### Figma plugin / MCP (essential)
The connected MCP must be able to **write editable canvas content**, not merely read designs. If not yet installed, official installation path inside Claude Code CLI: `claude plugin install figma@claude-plugins-official`. Reload/reconnect and authenticate as needed. Follow the Figma-provided `figma-use` guidance before calling `use_figma`. Avoid duplicate Figma connections if your existing setup already works.

### Impeccable (design support)
Useful for visual quality, hierarchy, typography, design critique and later UI QA; it **does not replace** Figma tooling or user approvals. Recommended project-scoped install from the repository root: `npx impeccable install` (select Claude Code and project scope); then in Claude Code: `/impeccable init`. Alternative plugin path: `/plugin marketplace add pbakaus/impeccable`, then install from `/plugin` Discover. Choose one installation path rather than stacking duplicate copies. Check whether it is already installed in this repository first. Hooks and automated UI checks become more relevant during code implementation and may consume additional resources.

### Project-specific manual skills (included)
- `/prototype-section Hero` — creates or refines **only** the requested editable Figma section, then stops at the approval gate.
- `/critique-section Hero` — focused read/review of one existing Figma section without editing it.

## Phase 05 — Implementation and prelaunch (later)
### Security Guidance (Anthropic official plugin)
Install inside Claude Code: `/plugin install security-guidance@claude-plugins-official`. It performs pattern checks, LLM diff review, and commit-time agentic review. Its LLM reviews **use additional tokens/cost** and should be enabled when implementation starts, not mistaken for a free optimization. Prerequisites include compatible Claude Code and Python. It supplements, not replaces, manual review, secret scanning and dependency checks.

### Claude Security (optional, high-cost deep scan)
A more comprehensive on-demand codebase or diff vulnerability scan exists as `/plugin install claude-security@claude-plugins-official`, then `/claude-security`. Reserve for a substantive production release or complex integration; it can incur significant model usage. A simple static landing page may not need it initially.

### `/prelaunch-audit` (included project skill)
Manual scoped security, accessibility, and performance checklist that reports findings and proposed fixes **without editing files**. Keep it separate from design work.

## Security requirements for eventual site
- No plaintext secrets or private tokens in client code, repository or Figma frames.
- Safely build WhatsApp URL query parameters; keep messages and external destinations predictable and reviewed.
- Do not inject untrusted gallery captions, reviews or messages as raw HTML.
- Avoid unnecessary tracking and personal information collection. If external analytics/forms are introduced, review data retention, consent and applicable privacy requirements before deployment.
- Check image/video sharing rights and testimonial consent.
- Review third-party packages, links, video performance, browser privacy and dependency vulnerabilities.
- Use HTTPS and safe external-link patterns; validate any future server-side input and authentication if such features are added.

## Tools are not substitutes for gates
Design quality: human review + Impeccable + Figma.  
Security: focused manual audit + automated security plugins + independent verification.  
Launch: performance/accessibility testing on real devices + final explicit approval.

## Primary references
- Anthropic: https://code.claude.com/docs/en/skills
- Anthropic session efficiency: https://claude.com/resources/articles/maximizing-the-value-of-your-claude-code-sessions
- Figma MCP: https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/
- Impeccable: https://impeccable.style/docs/
- Security Guidance: https://github.com/anthropics/claude-code/blob/main/plugins/security-guidance/README.md
- Claude Security: https://github.com/anthropics/claude-plugins-official/blob/main/plugins/claude-security/README.md
