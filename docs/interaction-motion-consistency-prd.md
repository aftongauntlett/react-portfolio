# PRD: Interaction Motion and Hover Consistency (App-Wide)

## Prompt Starter (Copy/Paste)

Use this prompt to start an implementation agent run:

"Implement the Interaction Motion and Hover Consistency PRD in docs/interaction-motion-consistency-prd.md across the React Portfolio app. Start with an audit, then apply the shared interaction/motion standards app-wide. Ensure all hover and motion behavior is consistent, reduced-motion safe, and toned appropriately. Include scrolling behavior validation and performance profiling, and fix any high-cost interaction patterns you find. Add a code hygiene pass: remove dead files, unused imports/classes, flag files over 200 LOC for decomposition, extract repeated styling into reusable primitives/tokens, and replace hard-coded utility colors with theme tokens where appropriate. Do not add dependencies. Keep accessibility first (focus-visible parity, keyboard support). Ship in phases with clear commits, tests, and a short before/after summary for each phase."

## Document Control

- Status: Draft (Ready for implementation planning)
- Date: 2026-05-22
- Product: React Portfolio
- Primary Goal: Standardize hover and motion behavior across the entire app so interactions feel cohesive, accessible, and intentionally restrained.

## Problem Statement

The app currently mixes multiple hover and animation styles across sections and shared components. This creates inconsistency in motion intensity, timing, and visual tone.

Examples of drift include:

1. Uneven hover intensity (some elements use strong glow/shadow while others use subtle color shifts).
2. Inconsistent transition timing and easing values.
3. Mixed interaction models (CSS-only hover, Framer `whileHover`, and custom transitions) without shared guardrails.
4. Reduced-motion support is present but not uniformly enforced across every interaction pathway.
5. Scroll behavior quality and motion-related performance characteristics have not been standardized app-wide.

The result is a UI that can feel over-animated in some places and under-signaled in others.

## Goals

1. Create a single interaction style system for hover, focus-visible, and motion transitions.
2. Ensure all motion behavior respects `prefers-reduced-motion` consistently.
3. Reduce excessive visual effects while preserving clear affordance and delight.
4. Define reusable standards for motion duration, easing, distance, and hover intensity.
5. Improve maintainability by reducing one-off animation/hover class strings.
6. Audit scrolling behavior and adjacent performance hotspots to ensure smooth, stable interactions across devices.
7. Improve code hygiene by removing dead code, trimming unused imports/classes, and reducing oversized component complexity.
8. Increase style consistency by extracting repeated class recipes and enforcing token-first styling.

## Non-Goals

1. Full visual redesign of color palette or typography.
2. Rewriting section content.
3. Introducing new dependencies.
4. Replacing Framer Motion architecture entirely.

## Design Principles

1. Motion should support comprehension, not decoration.
2. Hover should communicate interactivity with low visual noise.
3. Focus-visible and keyboard states must be at least as clear as hover states.
4. Reduced-motion mode should remove non-essential movement, not remove meaning.
5. Similar interaction patterns should feel identical regardless of section.

## Scope

### In Scope

1. Hover and focus interaction behavior for all interactive components.
2. Framer Motion entry/scroll/hover transitions used in section and shared components.
3. Duration/easing/distance normalization and tokenization.
4. Shadow/glow/intensity calibration and limits.
5. Reduced-motion behavior standardization.
6. Tests and QA updates for interaction and reduced-motion behavior where applicable.
7. Scrolling behavior consistency and performance profiling for motion-heavy and interaction-heavy paths.
8. Code hygiene cleanup directly related to interaction and shared UI architecture:
   - dead/unreferenced file audit,
   - unused import and class cleanup,
   - large-file decomposition planning,
   - reusable style primitive extraction,
   - token-first styling remediation.

### Out of Scope

1. Content rewrites unrelated to interaction.
2. New component library migration.
3. Backend or data model changes.

## Current Foundation (Already Available)

1. Motion constants in `src/constants/animations.ts`.
2. Reduced-motion hook and helpers in `src/hooks/usePrefersReducedMotion.ts`.
3. Motion variant helpers in `src/utils/motionHelpers.ts`.
4. Lenis context and hooks in `src/context/LenisContext.tsx` and `src/hooks/useLenis.ts`.
5. Scroll utilities in `src/utils/domScroll.ts`.
6. Performance instrumentation in `src/hooks/usePerformanceMonitor.ts` and `src/components/dev/PerformanceOverlay.tsx`.

These should be expanded and treated as the canonical interaction/motion source.

## Current Maintenance Debt Snapshot (2026-05-23)

### Candidate dead/unreferenced files (non-test runtime importers: none)

1. `src/components/Timeline/TimelineItem.tsx`
2. `src/components/shared/Accordion.tsx`
3. `src/components/shared/BulletList.tsx`
4. `src/components/shared/HighlightText.tsx`
5. `src/components/shared/MotionSection.tsx`
6. `src/components/shared/StandalonePageHeader.tsx`
7. `src/data/skills.ts`

Notes:

1. `src/components/shared/Card.tsx` is currently imported only by tests.
2. `src/utils/dateFormatter.ts` is currently imported only by tests.
3. Dead-file candidates must be confirmed before deletion (for example, feature branches or planned near-term usage).

### Files currently over 200 LOC (decomposition candidates)

1. `src/components/sections/Contact/index.tsx` (385)
2. `src/components/sections/Education/index.tsx` (274)
3. `src/components/layout/MobileNav/index.tsx` (224)
4. `src/components/sections/Experience/index.tsx` (210)
5. `src/components/shared/Card.tsx` (209)
6. `src/pages/Home.tsx` (202)

Guidance:

1. Treat 200 LOC as a soft cap for production components.
2. Split by concern (view, interaction handlers, animation variants, a11y helpers, data transforms).
3. Prefer extracting reusable hooks/helpers before introducing more component nesting.

### Repeated styling patterns worth extraction

1. Focus ring recipe repeated across many files:
   - `focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2`
2. Surface card shell repeated across sections:
   - `rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]`
3. Hover glow shadow recipe repeated:
   - `hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.16)]`
   - `dark:hover:shadow-[0_0_22px_rgba(var(--color-primary-rgb),0.10)]`
4. Generic transition recipe repeated broadly:
   - `transition-colors duration-300`

### Token and hard-coded style drift examples

1. Tailwind color literals in loading skeleton:
   - `src/pages/Home.tsx` uses `bg-gray-300` and `dark:bg-gray-600`.
2. Inline backdrop color literal:
   - `src/components/layout/MobileNav/index.tsx` uses `rgba(0, 0, 0, 0.5)`.
3. Tech chip mapping relies heavily on color literals and hexes:
   - `src/constants/techChips.ts` contains many `blue-*`, `purple-*`, and hex color classes.

This PRD now requires normalization toward semantic token usage where feasible.

## Target Areas (Initial Pass)

1. Layout/navigation interactions:
   - `src/components/layout/MobileNav/index.tsx`
   - `src/components/layout/SideNav/index.tsx`
2. Section-level interactive surfaces:
   - `src/components/sections/About/index.tsx`
   - `src/components/sections/Skills/SkillsSection.tsx`
   - `src/components/sections/Experience/index.tsx`
   - `src/components/sections/Projects/index.tsx`
   - `src/components/sections/Education/index.tsx`
   - `src/components/sections/Reviews/index.tsx`
   - `src/components/sections/Contact/index.tsx`
3. Shared interaction primitives:
   - `src/components/shared/Button.tsx`
   - `src/components/shared/Card.tsx`
   - `src/components/shared/Tag.tsx`
   - `src/components/shared/TechTag.tsx`
   - `src/components/shared/Accordion.tsx`
   - `src/components/shared/Footer.tsx`
   - `src/components/shared/ErrorBoundary.tsx`
4. Scrolling and performance-critical utilities:
   - `src/context/LenisContext.tsx`
   - `src/hooks/useLenis.ts`
   - `src/hooks/usePerformanceMonitor.ts`
   - `src/utils/domScroll.ts`
   - `src/components/dev/PerformanceOverlay.tsx`

## Functional Requirements

### FR1: Interaction Intensity Scale

Define and adopt three sanctioned hover intensity levels:

1. Level 1 (`subtle`): color or border shift only.
2. Level 2 (`moderate`): Level 1 plus minimal background tint or tiny elevation cue.
3. Level 3 (`emphasis`): reserved for high-priority CTA only; must be intentional and rare.

Rules:

1. Most surfaces default to Level 1.
2. Repeated content containers (cards, list rows, chips) use Level 1 or Level 2 only.
3. Avoid glow-heavy hover shadows on standard content containers.

### FR2: Motion Timing and Easing Consistency

1. Define a compact timing scale and use it app-wide:
   - `fast`: 120-180ms (micro-interaction)
   - `normal`: 180-260ms (standard hover/focus)
   - `slow`: 280-420ms (entry/reveal)
2. Use one primary easing curve for UI state changes and one for reveal transitions.
3. Eliminate ad hoc durations/easing where a token exists.

### FR3: Motion Distance and Transform Limits

1. Cap hover transforms to very small values (for example: 1-2% scale or <=2px translation).
2. Entry/reveal movement should prioritize opacity first and avoid large travel distance.
3. For dense layouts, prefer opacity transitions over translate-heavy motion.

### FR4: Reduced Motion Enforcement

1. All Framer `whileHover`, `whileTap`, and reveal transitions must be gated by reduced-motion checks where movement is non-essential.
2. In reduced mode:
   - Remove transform-based motion for hover/reveal.
   - Keep instantaneous or near-instant state feedback (color/border/opacity).
3. Maintain usability cues in reduced mode through contrast and focus treatment.

### FR5: Hover-Focus Parity

1. Any semantic affordance conveyed on hover must also be available via keyboard focus-visible.
2. Focus-visible states must not be weaker than hover states.
3. Group hover patterns should include group focus-within equivalents where appropriate.

### FR6: Consistent Surface Behavior

1. Standardize interactive surface patterns across cards, list rows, and chips:
   - base state
   - hover state
   - active state
   - focus-visible state
2. Reuse shared classes/tokens to prevent drift.

### FR7: Scrolling Behavior Consistency

1. Define expected scrolling behavior for desktop and mobile (native vs smooth-scroll contexts).
2. Ensure section navigation, anchor jumps, and active-section tracking remain stable and predictable.
3. Confirm scroll behaviors do not conflict with reduced-motion expectations.
4. Ensure motion-heavy section transitions do not introduce visible scroll jank.

### FR8: Performance Guardrails for Motion and Interaction

1. Identify interaction and motion hotspots that can cause frame drops or long tasks.
2. Tone down expensive visual effects (for example large glow shadows or stacked transitions) when they add low UX value.
3. Prefer GPU-friendly and low-cost transitions where possible.
4. Establish a lightweight checklist for interaction performance review in each relevant PR.

### FR9: Code Hygiene and Decomposition Guardrails

1. Dead file cleanup:
   - Build an import graph from app entry and mark files with no production importers.
   - For each candidate, either delete it or document retention reason in PR notes.
2. Unused import cleanup:
   - Remove all unused imports/variables in touched files.
   - Ensure lint has zero warnings/errors related to unused symbols.
3. File size decomposition:
   - For every production file over 200 LOC, either:
     - split into smaller units in this effort, or
     - create a documented follow-up task with named extraction boundaries.
4. Reusable styling extraction:
   - If the same class recipe appears in 3 or more places, extract to shared constant/utility/component.
5. Unused class cleanup:
   - Remove obsolete/unreachable class recipes during touched-file refactors.
6. Token-first styling policy:
   - Prefer semantic tokens (`var(--color-*)`, shared style constants) over hard-coded utility colors.
   - Hard-coded color literals are allowed only in token-definition files or explicitly justified brand maps.

## Non-Functional Requirements

1. No new dependencies.
2. No measurable performance regression from animation changes.
3. Maintain or improve accessibility conformance.
4. Keep implementation maintainable through shared utilities/tokens.
5. No new scroll-jank regressions in key navigation and section transitions.
6. Motion and hover changes should preserve acceptable frame stability on common laptop and mobile viewport profiles.
7. No net increase in dead files, unused imports, or orphaned style recipes after implementation.

## Performance Budget (Initial Targets)

Use these as implementation-time guardrails and QA pass/fail thresholds.

1. Scroll/frame stability:
   - Target >=55 FPS median on laptop during representative scroll + hover interactions.
   - Target >=50 FPS median on mobile viewport simulation during representative scroll interactions.
2. Long tasks:
   - No long-task clusters during normal scrolling and section navigation.
   - No single interaction-related long task should exceed 200ms.
3. Interaction responsiveness:
   - Pointer and keyboard-triggered UI state changes should feel immediate (target <=100ms visual response for common interactions).
   - Hash navigation and section-jump behavior should settle without visible stutter.
4. Animation cost discipline:
   - Favor opacity/color/border transitions over expensive paint-heavy effects.
   - Use high-intensity glow/shadow only in sanctioned emphasis contexts.
5. Reduced motion:
   - In reduced mode, remove non-essential transform motion while preserving clear visual feedback.
6. Verification tools:
   - Use browser performance profiling plus existing in-app instrumentation (for example `usePerformanceMonitor` and `PerformanceOverlay`) to validate hotspots and regressions.

## Proposed Implementation Strategy

### Phase 1: Audit and Classification

1. Inventory all hover/motion occurrences (`hover:`, `group-hover`, `whileHover`, transition classes).
2. Classify each interaction into pattern families:
   - navigational links
   - content surfaces
   - CTA/button controls
   - tags/chips
   - reveal/entrance motion
3. Mark outliers that violate desired intensity/timing standards.
4. Audit scrolling behavior pathways (wheel/trackpad, keyboard nav, anchor jumps, section spy behavior).

Deliverable:

- Interaction inventory with assigned intensity level per pattern.
- Scroll behavior inventory with known friction points and jank suspects.

### Phase 2: Define Shared Tokens and Utilities

1. Extend `src/constants/animations.ts` with normalized timing/easing presets.
2. Add or refine shared class patterns for hover/focus intensity levels.
3. Document reduced-motion behavior matrix by interaction type.
4. Define scroll-behavior guardrails and performance heuristics for heavy interaction surfaces.

Deliverable:

- Canonical motion and interaction token set.
- Scroll and performance guardrail notes tied to implementation patterns.

### Phase 3: App-Wide Refactor by Pattern Family

1. Update shared primitives first (`Button`, `Card`, `Tag`, `TechTag`, `Accordion`).
2. Update section components to consume shared patterns.
3. Normalize any remaining one-off heavy glows/transforms.

Deliverable:

- Consistent interaction behavior across sections.

### Phase 4: Reduced-Motion Hardening

1. Verify all transform/reveal motion paths honor reduced motion.
2. Add or update tests for reduced-motion-sensitive components.
3. Run keyboard and screen-reader interaction checks.
4. Profile scrolling and interaction-heavy paths to catch layout thrashing, long tasks, or effect-heavy hotspots.

Deliverable:

- Accessibility-compliant motion behavior in all key paths.
- Reduced-motion and scroll behavior verified with no major performance red flags.

### Phase 5: QA and Final Calibration

1. Perform visual QA at mobile/tablet/desktop breakpoints.
2. Tone calibration pass for any interaction that still feels excessive.
3. Finalize docs with interaction rules and examples.
4. Complete a final performance pass on representative pages and interaction flows.

Deliverable:

- Stable, coherent interaction language with implementation guidance.

## Acceptance Criteria

1. All major interactive components use sanctioned intensity levels.
2. Hover timing/easing values are tokenized and consistent.
3. Reduced-motion mode removes non-essential movement app-wide.
4. Hover and focus-visible affordances are equivalent for keyboard users.
5. Excessive glow/shadow effects are reduced to approved cases only.
6. Tests pass and no accessibility regressions are introduced.
7. Scrolling behavior is consistent and stable across supported viewport sizes.
8. No significant performance regressions are observed in motion/interaction-heavy flows.
9. Dead-file candidate list is resolved (deleted or explicitly retained with rationale).
10. No unused imports remain in touched files.
11. Every production component over 200 LOC has either been split or has a documented decomposition ticket.
12. Repeated styling recipes used in 3 or more locations are extracted to shared tokens/utilities.
13. Hard-coded utility color drift is reduced and token-first styling is enforced for touched surfaces.

## QA Plan

### Visual QA

1. Validate interaction tone at:
   - Mobile: 375x812
   - Tablet: 768x1024
   - Desktop: 1280x800
2. Compare representative components side by side to confirm consistent intensity.
3. Verify no section appears noticeably "louder" than neighboring sections.

### Reduced Motion QA

1. Enable `prefers-reduced-motion: reduce` and verify:
   - no unnecessary transforms on hover or reveal,
   - no delayed motion that impairs reading,
   - all controls retain clear visual feedback.
2. Confirm behavior parity across CSS-only and Framer-driven interactions.

### Performance and Scroll QA

1. Validate scroll smoothness and responsiveness for:
   - manual scroll (trackpad/mouse wheel),
   - hash navigation and section jumps,
   - active-section updates during scroll.
2. Inspect key pages for interaction-induced jank and long-task spikes.
3. Confirm heavy hover effects have been toned to approved intensity levels.
4. Verify reduced-motion mode does not keep expensive non-essential effects enabled.

### Accessibility QA

1. Keyboard-only traversal verifies clear focus states.
2. Hover-dependent meaning is also available via focus-visible.
3. No regressions in semantics or control discoverability.

### Automated QA

1. Run existing test suite.
2. Add/update targeted tests for reduced-motion and interaction state behavior where logic changed.
3. Run lint and confirm no unused import/unused symbol regressions in touched files.

## Risks and Mitigations

1. Risk: Over-toning may make UI feel lifeless.
   - Mitigation: keep intentional emphasis on primary CTAs.
2. Risk: Incomplete reduced-motion coverage due to mixed CSS and Framer usage.
   - Mitigation: include explicit reduced-motion checklist in code review.
3. Risk: Style drift returns over time.
   - Mitigation: codify interaction rules and prefer shared tokens/utilities over per-component classes.
4. Risk: Scroll handling and animation interplay may hide performance regressions until later.
   - Mitigation: include explicit scroll and performance checks in QA and PR review templates.

## Open Decisions

1. Final threshold for "excessive" shadow/glow values.
2. Whether to centralize interaction class recipes in a dedicated file or keep them near shared primitives.
3. Whether high-emphasis hover is allowed outside top-level CTA contexts.
4. Whether scroll smoothing configuration should vary by device/input profile.

## Proposed Task Breakdown

1. Build interaction inventory and classify current patterns.
2. Build scroll/performance inventory and identify high-cost hotspots.
3. Build dead-file/unused-import inventory and classify delete vs retain candidates.
4. Build >200 LOC decomposition plan with concrete extraction boundaries.
5. Finalize motion, hover, and style token set (including reusable class recipes).
6. Refactor shared primitives.
7. Refactor section components.
8. Validate reduced-motion, keyboard parity, scroll behavior, and token-first styling compliance.
9. Ship QA evidence and updated docs.

## Definition of Done

1. Acceptance criteria satisfied.
2. App-wide interaction behavior is visually and behaviorally consistent.
3. Reduced-motion behavior is verified in all key interaction paths.
4. Tests pass.
5. Documentation is updated for future contributors.
6. Scroll quality and motion-related performance checks are completed and documented.
7. Dead files and unused imports/classes in scope are cleaned up or explicitly tracked.
8. Oversized files have been decomposed or ticketed with clear boundaries.
