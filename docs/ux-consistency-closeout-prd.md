# PRD: UX Consistency Closeout (Remaining Work)

## Prompt Starter (Copy/Paste)

Use this prompt to continue implementation later:

"Execute the remaining work in docs/ux-consistency-closeout-prd.md. Focus only on open items: interaction/motion consistency hardening, section spacing normalization, dead-code/decomposition cleanup, and closeout QA evidence. Keep current visual direction for colors and hover tone as-is unless this PRD explicitly asks for adjustment. Do not add dependencies. Keep accessibility and reduced-motion support intact. Ship in small phases with validation at each phase (lint, test, test:a11y, typecheck, build)."

## Document Control

- Status: Completed (Closeout Passed)
- Date: 2026-05-23
- Product: React Portfolio
- Source: Consolidates remaining work from prior interaction/motion and section spacing PRDs.

## Why This Exists

Most foundational work is done. This document captures only what is still open so implementation can resume quickly without re-auditing completed items.

## Current State Snapshot (Completed)

1. Home inter-section layout no longer relies on section-stack `<hr>` separators.
2. Shared spacing tokens exist in `src/constants/spacing.ts` and are used in key paths.
3. Contact decomposition is complete and under 200 LOC per unit:
   - `src/components/sections/Contact/index.tsx`
   - `src/components/sections/Contact/ContactForm.tsx`
   - `src/components/sections/Contact/useContactForm.ts`
4. CI quality gates are active (`lint`, `test`, `test:a11y`, `typecheck`, `build`).
5. Design direction for current colors and hover tone is intentionally approved and should be preserved.

## Completed (2026-05-23)

### RW1: Resolve Outstanding Dead-Code Candidates

1. Deleted unreferenced `src/components/shared/MotionSection.tsx`.
2. Deleted test-only `src/components/shared/Card.tsx`.
3. Deleted orphaned test `src/components/shared/__tests__/Card.test.tsx`.

### RW2: Close Over-200 LOC Rule

1. `src/components/layout/MobileNav/index.tsx` decomposed to 175 LOC (from 225 LOC).
2. Accessibility/focus-trap side effects extracted to:
   - `src/components/layout/MobileNav/useMobileNavA11y.ts`
3. `src/components/shared/Card.tsx` removed (no longer a production-file LOC exception).

### RW3: Finish Spacing Rhythm Normalization

1. Removed non-purpose divider line from `src/components/sections/About/index.tsx` (bottom `<hr>` removed).
2. Expanded spacing token adoption:
   - `src/components/shared/SectionEntryList.tsx` now uses `COMPONENT_SPACING.STACK_STANDARD`.
   - `src/components/sections/Contact/index.tsx` now uses `COMPONENT_SPACING.STACK_STANDARD`.
   - `src/components/sections/Testimonials/index.tsx` now uses `COMPONENT_SPACING.STACK_STANDARD`.

### RW4: Complete Interaction/Motion Consistency Hardening

1. Standardized motion timing/easing usage in touched components:
   - `src/components/layout/MobileNav/index.tsx` now uses shared `DURATION` and `EASING` tokens.
   - `src/components/sections/Testimonials/index.tsx` now uses shared `DURATION` and `EASING` tokens.
2. Reduced-motion behavior hardened:
   - Testimonials “See more” panel now toggles content without transform animation in reduced-motion mode.
3. Hover/focus-visible parity improved for touched surfaces:
   - Testimonials LinkedIn link now has explicit `focus-visible` styling parity with hover state.
   - Testimonials toggle button now mirrors hover background/border in focus-visible state.

### RW5: Performance and Scroll Evidence (Closeout Artifacts)

Profiling run date: 2026-05-23 (local run on `http://127.0.0.1:4173/`)

1. Full-home scroll flow:
   - Approx FPS: 60.0
   - Duration sampled: 1999.9 ms
2. Section navigation jumps:
   - Approx FPS: 59.6
   - Duration sampled: 989.6 ms
3. Interaction-heavy flow (Testimonials toggle + MobileNav open/close):
   - Approx FPS: 59.6
   - Duration sampled: 1073.5 ms
4. Long-task summary:
   - Long tasks observed: 0
   - Long tasks over 50 ms: 0
   - Longest long task: 0 ms

### RW6: Documentation Closeout

1. This PRD updated with completed status and RW1-RW5 implementation evidence.
2. Screenshot artifacts captured for target breakpoints:
   - Mobile (375x812): `docs/artifacts/ux-closeout-mobile-375x812.png`
   - Tablet (768x1024): `docs/artifacts/ux-closeout-tablet-768x1024.png`
   - Desktop (1280x800): `docs/artifacts/ux-closeout-desktop-1280x800.png`
3. Final quality gate validated:
   - `npm run ci:check` passed.

## Remaining Work

### RW1: Resolve Outstanding Dead-Code Candidates

1. Decide and execute disposition for:
   - `src/components/shared/MotionSection.tsx` (currently unreferenced in production code)
   - `src/components/shared/Card.tsx` (currently test-only importer)
2. For each file, do one of:
   - delete it, or
   - retain it with explicit rationale in this PRD under "Retention Notes".

### RW2: Close Over-200 LOC Rule

1. Current production files still over 200 LOC:
   - `src/components/layout/MobileNav/index.tsx`
   - `src/components/shared/Card.tsx`
2. For each file, do one of:
   - split now, or
   - add a documented decomposition ticket/plan with extraction boundaries and owner/date.

### RW3: Finish Spacing Rhythm Normalization

1. Remove remaining divider-like section separation inside section content where not purpose-specific:
   - `src/components/sections/About/index.tsx` (bottom `<hr>`)
2. Audit remaining section files for ad hoc spacing and align with `SECTION_SPACING` and `COMPONENT_SPACING` conventions.
3. Expand token adoption across sections not yet migrated to shared spacing tiers.

### RW4: Complete Interaction/Motion Consistency Hardening

1. Standardize timing/easing usage where ad hoc durations remain.
2. Verify all non-essential transform hover/reveal motion is reduced-motion safe.
3. Confirm hover/focus-visible parity for interactive surfaces touched in this phase.
4. Keep existing approved color/hover aesthetic intact while reducing unnecessary effect drift.

### RW5: Performance and Scroll Evidence (Closeout Artifacts)

1. Run targeted profiling on representative flows:
   - scrolling through full home page
   - section navigation jumps
   - interaction-heavy sections (Projects, Reviews, MobileNav)
2. Capture and store a short evidence summary in PR notes:
   - fps observations
   - long-task spikes
   - any hotspots and fixes applied

### RW6: Documentation Closeout

1. Update this file with a "Completed" section once RW1-RW5 pass.
2. Record any retained exceptions (for example, intentional file >200 LOC pending ticket).
3. Add links to before/after screenshots (mobile, tablet, desktop) in PR notes.

## Retention Notes

Use this section only when a candidate is intentionally retained.

- No dead-code candidates retained. Both candidate files were removed.

## Implementation Plan (Remaining-Only)

### Phase 1: Cleanup and Decomposition Decision Pass

1. Resolve RW1 and RW2.
2. Commit with clear rationale in commit body for retain-vs-delete decisions.

Validation:

- `npm run lint`
- `npm run test`

### Phase 2: Spacing Rhythm Finalization

1. Resolve RW3 across section files.
2. Remove non-essential divider treatment in About.

Validation:

- `npm run lint`
- `npm run test`
- breakpoint visual check (375x812, 768x1024, 1280x800)

### Phase 3: Motion/Interaction Hardening

1. Resolve RW4 with minimal visual drift from current approved style.
2. Confirm reduced-motion behavior remains consistent.

Validation:

- `npm run test:a11y`
- keyboard focus pass

### Phase 4: Performance + Documentation Closeout

1. Resolve RW5 and RW6.
2. Final repo-wide checks.

Validation:

- `npm run ci:check`

## Acceptance Criteria (Remaining Work Done)

1. Dead-code candidates are either removed or explicitly documented with rationale.
2. No production file remains >200 LOC without documented decomposition ticket and boundaries.
3. About section no longer uses non-essential divider line treatment for section separation.
4. Shared spacing tokens are consistently applied across primary section patterns.
5. Reduced-motion behavior remains intact for non-essential transform motion.
6. Hover/focus-visible parity holds for touched interactive components.
7. Performance summary artifacts are included in PR notes.
8. `npm run ci:check` passes.

## Risks and Guardrails

1. Risk: Over-normalization could flatten section personality.
   - Guardrail: preserve currently approved color and hover tone.
2. Risk: Decomposition churn could introduce regressions.
   - Guardrail: split by concern and validate every phase.
3. Risk: Spacing-only edits can still break responsive rhythm.
   - Guardrail: required visual checks at three target breakpoints.

## Definition of Done

1. All remaining acceptance criteria in this file are satisfied.
2. PR includes screenshot links and performance summary notes.
3. Exceptions (if any) are documented in this file under "Retention Notes".
