# Copilot Instructions — React Portfolio

Follow repo prompts in .github/prompts. Ask clarifying questions first if anything is unclear or risky; otherwise propose a short edit plan, then implement.

Goals

- Clean, accessible, responsive React + TypeScript
- No `any` in production code; prefer precise types/generics/unions
- Reuse components/hooks/helpers; avoid repetition (≥3 → extract)
- Keep components focused; if >~200 LOC or mixed concerns → propose split

Standards

- Functional components + modern hooks patterns
- Use `@/` alias for src/ (named exports for utils)
- Tailwind utilities; respect reduced-motion; keyboard & SR support
- Prefer data-driven patterns (maps/arrays/config) over copy-paste
- Memoization: only for proven hot paths (avoid premature `React.memo`/`useMemo`)

Process

- Before edits: list assumptions/questions if any, then a minimal plan (files/sections, tests)
- After edits: summarize changes, a11y notes, and test updates
- Add/adjust tests for new/changed behavior (Vitest/RTL)
- Do not introduce dependencies without asking

Performance

- Keep bundle growth reasonable; propose code-splitting/lazy where it helps UX

For writing tasks, reference 50-writing-voice.md and follow the voice rules.
