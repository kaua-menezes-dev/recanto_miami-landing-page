# Recanto Miami — Workflow Documentation

## Purpose

This directory contains the operational workflows for the Recanto Miami website project.

Its purpose is to ensure consistent execution, clear approval checkpoints, efficient AI context usage, and strict separation between design and implementation.

The root `CLAUDE.md` is the primary instruction file. Documents in this directory provide additional task-specific guidance.

## Workflow Documents

| File                           | Purpose                                                                 |
| ------------------------------ | ----------------------------------------------------------------------- |
| `README.md`                    | Overview of the project's workflow documentation.                       |
| `claude-first-message.md`      | Initial onboarding instructions for Claude Code.                        |
| `design-approval.md`           | Design review, feedback, and approval requirements.                     |
| `figma-section-prototyping.md` | Section-by-section prototyping and approval procedures.                 |
| `claude-tooling.md`            | Tool configuration, skills, security practices, and token optimization. |

All documents must be treated as complementary instructions.

If conflicting instructions are discovered, Claude must report the conflict and request clarification rather than silently overriding an approved decision.

## Project Structure

The project follows this organization:

```text
recanto-miami/
├── .claude/
│   └── skills/
│       ├── prototype-section/
│       ├── critique-section/
│       └── prelaunch-audit/
├── assets/
├── docs/
│   ├── brand/
│   ├── content/
│   ├── conversion/
│   ├── decisions/
│   ├── design/
│   ├── references/
│   └── workflow/
├── CLAUDE.md
└── README.md
```

The `.claude` directory must be located at the project root, not inside `docs/`.

## Current Stage — Figma Prototyping

The initial discovery, visual identity, references, and website structure planning stages have been completed.

The current stage focuses exclusively on creating and refining the design in Figma.

### Required Execution Order

1. Review the approved documentation and design decisions.
2. Verify Figma MCP connectivity and relevant design tools.
3. Create and present the shared Design System.
4. Wait for explicit Design System approval.
5. Prototype the first website section in Figma.
6. Present the design for review.
7. Apply feedback until explicit approval is received.
8. Repeat for each remaining website section.
9. Begin frontend implementation only after the complete design has been approved.

Claude must not skip approval checkpoints or independently proceed to the next section.

### Design Requirements

- Follow the approved Botanical Luxury visual identity.
- Maintain consistency across all sections.
- Prioritize visual sophistication and strong commercial conversion.
- Respect approved gallery, testimonials, animation, and WhatsApp conversion specifications.
- Avoid unnecessary complexity and excessive motion.
- Keep accessibility, mobile responsiveness, and future implementation feasibility in mind.

### Implementation Restriction

During the Figma prototyping stage:

- Do not generate or modify production frontend code.
- Do not implement React components, HTML pages, or CSS layouts.
- Do not create application scaffolding without authorization.
- Do not begin deployment.
- Do not interpret prototype approval as implementation approval.

## Claude Code Skills

Project-specific skills are stored in `.claude/skills/`.

### Available Project Skills

- `/prototype-section` — Prototype one approved website section in Figma.
- `/critique-section` — Review the visual quality, consistency, and usability of a section.
- `/prelaunch-audit` — Review security, accessibility, performance, and production readiness.

Skills must be used only when appropriate for the current stage.

Third-party tools such as Impeccable and security plugins should be verified after installation.

## Token Efficiency

Claude should:

- Read only documentation relevant to the current task.
- Avoid repeatedly loading the entire project documentation.
- Use focused skills and concise instructions.
- Reuse previously approved decisions instead of reconsidering them.
- Keep responses focused on deliverables, issues, and required approvals.
- Avoid unnecessary tool calls and repeated analysis.

Token optimization must never compromise design quality, security, or explicit approval requirements.

## Approval and Git Policy

- Explicit user approval is required before progressing between design stages.
- Do not modify unrelated documentation or files.
- Do not perform destructive operations without permission.
- Do not commit, push, merge, or deploy without the required authorization.
- Preserve approved decisions and document meaningful changes.

## Source of Truth

The project documentation under `docs/` remains the source of truth for approved creative, structural, commercial, and workflow decisions.

The root `CLAUDE.md` defines project-wide behavior.

Task-specific workflow documents provide detailed execution instructions.

When uncertain, Claude must consult the relevant document and request clarification before making decisions that alter approved requirements.

---

**Current project status:** Stage 04 — Figma Design System and Section-by-Section Prototyping.

**Next milestone:** Validate tooling, approve the shared Design System, and begin the Hero section prototype.
