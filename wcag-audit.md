# WCAG Audit - React Portfolio (Code-Backed)

Last reviewed: 2026-05-22
Scope reviewed: current code in this repo (not generic guidance)

## Executive Summary

This is not a huge refactor.

The app already has a strong accessibility foundation:

- Semantic landmarks and skip link are present.
- Navigation is keyboard reachable on desktop and mobile.
- Form labels, status messaging, and reduced-motion handling are implemented.
- Automated tests are healthy (81 passing tests).

Most remaining work is targeted, low-to-medium effort fixes:

- Remove unnecessary tab stops from non-interactive content.
- Tighten a few semantics (skip-link focus target, dialog linkage, `time` datetime usage).
- Add automated accessibility checks in CI (currently missing).
- Normalize "opens in new tab" messaging.

Estimated effort:

- Quick wins: 1-3 hours
- Full recommended pass in this doc: 1-2 days
- Large redesign/refactor: not required

## Current Baseline (Evidence)

### What is already in good shape

- HTML language set: `index.html` uses `lang="en"`.
- Skip link exists in layout: `src/components/layout/Layout/index.tsx`.
- Mobile menu has `role="dialog"`, `aria-modal="true"`, Escape close, focus return.
- Contact form has visible labels + live status/alert messaging.
- Reduced motion is respected across CSS and component hooks.

### Current automation status

- Tests: passing (`npm run test` -> 81/81)
- Lint: failing (`npm run lint` -> 2 errors)
- CI currently runs typecheck + build only (`.github/workflows/ci.yml`)
- No automated Lighthouse/axe/pa11y checks are configured

## Findings and Priorities

Severity labels:

- `High`: likely WCAG-impacting issue or broad UX impact
- `Medium`: meaningful accessibility improvement, lower risk
- `Low`: quality hardening or consistency

### High

1) Keyboard flow has extra non-interactive tab stops

- Files:
   - `src/components/sections/Projects/index.tsx` (tabIndex on static heading/description + `role="text"`)
   - `src/components/shared/BulletList.tsx` (`BulletItem` uses `tabIndex={0}`)
- Why it matters:
   - Adds noise to keyboard navigation and can degrade focus order quality.
   - Static text should not be in the tab sequence.
- Fix direction:
   - Remove `tabIndex={0}` from non-interactive elements.
   - Remove `role="text"` from description block unless a very specific AT behavior is required and validated.

2) No accessibility gate in CI

- Files:
   - `.github/workflows/ci.yml`
   - `package.json`
- Why it matters:
   - Accessibility regressions can ship silently.
- Fix direction:
   - Add automated a11y checks (at minimum one route with axe or pa11y, then expand).
   - Include these checks in PR workflow.

### Medium

3) Skip link target is not explicitly programmatically focusable

- File:
   - `src/components/layout/Layout/index.tsx`
- Why it matters:
   - Skip links are strongest when focus can move directly to main region.
- Fix direction:
   - Add `tabIndex={-1}` to `main#main-content` so skip-link activation can land focus reliably.

4) Mobile menu trigger lacks explicit `aria-controls` linkage

- Files:
   - `src/components/layout/MobileHeader/index.tsx`
   - `src/components/layout/MobileNav/index.tsx`
- Why it matters:
   - Improves assistive technology relationship between trigger and controlled dialog.
- Fix direction:
   - Add stable `id` to dialog container (for example `id="mobile-nav-dialog"`).
   - Add `aria-controls="mobile-nav-dialog"` on opener button.

5) `time` element uses non-machine-readable values in `dateTime`

- Files:
   - `src/components/sections/Experience/index.tsx`
   - `src/data/jobs.ts`
- Why it matters:
   - `dateTime` should be valid machine-readable date/time, but strings like `03/2023 - 05/2025` are not valid ISO dates.
- Fix direction:
   - Either remove `dateTime` for range text, or split data into ISO start/end and render valid metadata.

### Low

6) Automatic external-link new-tab behavior needs explicit UX consistency

- Files:
   - `src/components/shared/Button.tsx` (auto `_blank` for `http` links)
   - Instances in nav/footer where links open new tabs
- Why it matters:
   - New-tab behavior should be clearly communicated in visible text or accessible name.
- Fix direction:
   - Standardize a helper/pattern so all `_blank` links include consistent hinting (visible text and/or sr-only suffix).

7) Lint baseline currently broken (non-a11y but blocks confidence)

- Files:
   - `src/components/sections/About/index.tsx`
   - `src/components/sections/Skills/SkillsSection.tsx`
- Why it matters:
   - Keep baseline clean so new accessibility changes are easier to trust.

## Contrast Risk Note (Needs Measurement, Not Guessing)

Theme token spot-check suggests some light-mode accent-on-background combinations may be near or below 4.5:1 for normal text.

This is a risk signal, not a final failure declaration.

Required next step:

- Run real contrast checks on rendered UI states (normal/hover/focus/disabled) for links, buttons, chips, and secondary text.

## Implementation Plan (Copilot-Executable)

### Phase 1 - Quick Wins (same day)

Goal: eliminate high-confidence keyboard/semantics issues with minimal code churn.

- Remove static-content tab stops and `role="text"` in projects/bullets.
- Add `tabIndex={-1}` on `main#main-content`.
- Add mobile trigger/dialog linkage (`aria-controls` + dialog id).
- Fix current lint errors.

Acceptance checks:

- `npm run lint` passes.
- `npm run test` passes.
- Keyboard Tab order no longer lands on static project description or bullet text.

### Phase 2 - Semantics and Link Behavior (0.5-1 day)

Goal: improve machine readability and consistency.

- Resolve `time` / `dateTime` semantics in Experience.
- Standardize external-link messaging policy.

Acceptance checks:

- No invalid `dateTime` values remain.
- All `_blank` links use consistent user-facing/accessibility hints.

### Phase 3 - Automation and Regression Protection (0.5-1 day)

Goal: prevent future accessibility regressions.

- Add automated accessibility test script(s) in `package.json`.
- Add workflow job/steps in `.github/workflows/ci.yml` to run them on PRs.

Acceptance checks:

- CI fails when a11y checks fail.
- CI passes on main branch after baseline fixes.

## Copy/Paste Prompts For Copilot

Use these one phase at a time.

### Prompt A - Phase 1 execution

```text
Execute Phase 1 from wcag-audit.md for this repo.

Constraints:
- Make minimal, safe diffs.
- Do not add new dependencies.
- Keep current design and behavior unless required for accessibility.

Tasks:
1) Remove unnecessary tab stops and role="text" from non-interactive content:
    - src/components/sections/Projects/index.tsx
    - src/components/shared/BulletList.tsx
2) Improve skip-link destination focusability:
    - src/components/layout/Layout/index.tsx (main#main-content should be programmatically focusable)
3) Add mobile menu trigger/dialog linkage:
    - src/components/layout/MobileHeader/index.tsx
    - src/components/layout/MobileNav/index.tsx
4) Fix current lint blockers discovered during audit:
    - src/components/sections/About/index.tsx
    - src/components/sections/Skills/SkillsSection.tsx

Validation:
- Run npm run lint and npm run test.
- Report changed files and a brief before/after accessibility impact.
```

### Prompt B - Phase 2 execution

```text
Execute Phase 2 from wcag-audit.md.

Constraints:
- Minimal diffs.
- No new dependencies.

Tasks:
1) Fix Experience time semantics:
    - src/components/sections/Experience/index.tsx
    - src/data/jobs.ts
    Ensure dateTime values are valid or removed when not machine-readable.
2) Standardize external-link new-tab messaging pattern:
    - src/components/shared/Button.tsx
    - update relevant callsites where needed

Validation:
- Run npm run lint and npm run test.
- Show final policy for when and how "opens in new tab" is announced.
```

### Prompt C - Phase 3 execution

```text
Execute Phase 3 from wcag-audit.md.

Goal:
Add accessibility regression checks in CI.

Tasks:
1) Add an a11y script strategy to package.json using existing tooling where possible.
2) Update .github/workflows/ci.yml to run lint, test, and a11y checks on pull requests.
3) Keep runtime dependencies unchanged unless absolutely required.

Validation:
- Document commands run locally.
- Explain CI failure conditions.
- Summarize any unavoidable dependency additions and why.
```

## Manual QA Script (Required Before Claiming WCAG Progress)

Run this after each phase:

1) Keyboard only

- Tab from top of page through header, nav, section content, contact form, and footer.
- Confirm no dead-end focus targets and no decorative/static text in tab sequence.

2) Screen reader smoke test (VoiceOver on macOS)

- Confirm landmarks: banner, nav, main, content sections, footer.
- Confirm mobile menu open/close announcement and focus return.
- Confirm contact form labels and status/error announcements.

3) Reduced motion

- Enable reduced motion in OS settings.
- Confirm animations are minimized and interface remains usable.

4) Contrast checks

- Check primary/secondary text, links, chips, and button states in both themes.
- Verify AA contrast for normal and interactive states.

## Public Wording Guidance (For README/Site Copy)

Until automated and manual checks above are completed and documented, avoid strict legal-sounding claims like "WCAG compliant".

Prefer:

- "Built with accessibility in mind and reviewed against WCAG 2.2 AA best practices."
- "Accessibility checks are part of our CI and manual QA workflow."
