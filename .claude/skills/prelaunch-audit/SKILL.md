---
name: prelaunch-audit
description: On-demand read-only security, privacy, accessibility and performance audit for the implemented Recanto Miami website.
argument-hint: "[branch-or-scope]"
disable-model-invocation: true
---

Only use this during implementation or prelaunch, **not** during Phase 04 Figma prototyping. Scope: **$ARGUMENTS**.

1. Read relevant changed files and the public conversion/media flows. Do not inspect unrelated directories without a concrete lead. Perform read-only checks; request consent before installing dependencies or running commands that modify files.
2. Audit: exposed secrets; XSS/untrusted HTML; external links; encoding and safety of personalized WhatsApp URLs; third-party scripts; possible privacy/consent problems; media rights; unsafe dependencies; CSP/HTTPS and any added forms or backend endpoints.
3. Audit accessibility: semantic hierarchy, alt text, captions as appropriate, keyboard/focus states, gallery touch interactions, contrast and `prefers-reduced-motion`.
4. Audit performance: hero video poster/size, lazy-loading, image formats/responsiveness, animation work, mobile behavior and Core Web Vitals as measured rather than guessed.
5. Report **finding, severity, precise location, evidence, proposed fix**. State what could not be verified. Do not edit, commit, push or assert the product is secure.
