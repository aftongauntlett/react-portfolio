# PRD: Section Spacing and Layout Rhythm Consistency

## Document Control

- Status: Draft (Ready for implementation planning)
- Date: 2026-05-22
- Product: React Portfolio
- Primary Goal: Establish a consistent spacing system across page sections and remove visual separators (divider lines) that feel out of place.

## Problem Statement

The portfolio currently uses multiple overlapping spacing strategies (global section gaps, per-section top padding, internal section spacing, and divider lines). This creates inconsistent visual rhythm, uneven whitespace density, and a less intentional reading flow across sections.

The divider lines (`<hr>`) between sections also feel stylistically disconnected from the rest of the design language and should be removed.

## Background and Audit Summary

The spacing audit found these issues:

1. Spacing is compounded by multiple layers:
   - Global main wrapper section gaps (`space-y-16 sm:space-y-20 lg:space-y-24`)
   - Per-section top padding (`pt-8 sm:pt-10`)
   - Per-section local margins/padding
   - Divider lines between every section
2. Section content density is inconsistent (tight vs very loose spacing depending on section).
3. Similar card/list patterns use differing padding and gap scales without a clear rule.
4. Similar "See more" expansion patterns use mismatched offsets.
5. Large-screen horizontal spacing appears asymmetrical due to mixed container and left-only offsets.
6. Spacing values are mostly ad hoc utility usage, with no shared spacing token layer.
7. Local one-off negative margins create isolated rhythm breaks.

## Goals

1. Create a coherent vertical rhythm across all major sections.
2. Remove section divider lines and rely on spacing, typography, and surface treatment for separation.
3. Introduce and apply reusable spacing tokens/conventions for section-level and component-level spacing.
4. Normalize similar UI patterns (cards, list spacing, expandable content controls) to shared spacing behavior.
5. Preserve accessibility and responsive behavior while improving visual consistency.

## Non-Goals

1. Redesigning color theme, typography system, or brand identity.
2. Rewriting section content or changing copy.
3. Replacing animation architecture (Framer Motion patterns remain).
4. Introducing new dependencies.

## User Experience Principles

1. Rhythm first: users should feel a consistent scan cadence from section to section.
2. Separation by structure, not lines: sections should be distinct without hard divider rules.
3. Density should match content type:
   - Narrative/content-heavy areas: moderate breathing room.
   - Data/chip/card-heavy areas: tighter but still readable spacing.
4. Similar interaction patterns should carry similar spacing behavior.

## Scope

### In Scope

- Section wrapper spacing strategy.
- Inter-section spacing between About, Skills, Experience, Projects, Education, Reviews, and Contact.
- Removal of inter-section `<hr>` divider lines.
- Internal spacing consistency in section components.
- Definition and usage of spacing tokens/conventions.
- Desktop and mobile spacing behavior.

### Out of Scope

- Non-layout visual refinements not related to spacing.
- Content edits.
- Navigation IA changes.

## Target Files (Initial)

- `src/pages/Home.tsx`
- `src/components/layout/Layout/index.tsx`
- `src/components/layout/PageSection/index.tsx`
- `src/index.css`
- `src/components/sections/About/index.tsx`
- `src/components/sections/Skills/SkillsSection.tsx`
- `src/components/sections/Experience/index.tsx`
- `src/components/sections/Projects/index.tsx`
- `src/components/sections/Education/index.tsx`
- `src/components/sections/Reviews/index.tsx`
- `src/components/sections/Contact/index.tsx`
- `src/components/shared/AwardsBranch.tsx`
- `src/components/shared/Footer.tsx`

## Functional Requirements

### FR1: Remove Divider Lines Between Sections

1. Remove all inter-section `<hr>` elements currently inserted in the Home page section stack.
2. Section separation must be achieved using spacing and existing visual language (headings/surfaces), not horizontal rules.
3. No new divider-like replacements should be added unless explicitly justified by component purpose.

### FR2: Establish a Single Source of Truth for Section Rhythm

1. Define a clear section rhythm model with one primary mechanism for inter-section vertical spacing.
2. Avoid stacking multiple unrelated spacing layers that produce compounding gaps.
3. Standardize section top/bottom spacing rules across all main sections.

### FR3: Standardize Spacing Tokens/Conventions

1. Add a documented spacing scale for section-level and component-level spacing (for example: section gap, card padding, cluster gap, micro gap).
2. Replace one-off spacing values where practical with token-driven or convention-driven classes.
3. Minimize arbitrary custom spacing values unless tied to a specific visual/structural need.

### FR4: Normalize Similar Components/Patterns

1. Align card paddings across comparable section cards (Education, Reviews, Contact, Projects where applicable).
2. Align expansion-control spacing for "See more/See less" patterns across Projects, Reviews, and AwardsBranch.
3. Normalize heading-to-body and body-to-meta spacing patterns where sections use the same structural pattern.

### FR5: Preserve Responsive Intent

1. Ensure spacing decisions are consistent on mobile, tablet, and desktop.
2. Avoid large desktop-only asymmetry unless intentionally designed and documented.
3. Keep reading width and scan flow balanced after spacing changes.

### FR6: Preserve Accessibility and Behavior

1. No regressions in keyboard navigation, focus visibility, or screen reader semantics.
2. Removing divider lines must not impact semantic heading navigation.
3. Motion/reduced-motion behavior must remain unchanged unless spacing adjustments require minor non-functional updates.

## Non-Functional Requirements

1. Maintain current bundle profile (no new dependencies).
2. Keep performance neutral (spacing-only refactors should not add runtime cost).
3. Keep code maintainability high by reducing ad hoc spacing decisions.

## Implementation Strategy (Phased)

### Phase 1: Foundation and Rhythm Decision

1. Choose the primary inter-section spacing mechanism:
   - Option A: Parent stack spacing (recommended baseline).
   - Option B: Per-section top padding.
2. Remove competing secondary mechanism(s) where they duplicate purpose.
3. Define spacing conventions in a central location (constants and/or CSS utilities with clear naming).

Deliverable:

- Approved spacing map for section, card, list, and control spacing.

### Phase 2: Remove Dividers and Rebalance Global Layout

1. Remove `<hr>` separators from the Home section stack.
2. Rebalance global section rhythm so transitions remain clear without divider lines.
3. Validate top-of-page and footer transitions for visual continuity.

Deliverable:

- Section transitions feel intentional without hard separator lines.

### Phase 3: Section-by-Section Normalization

1. About: reduce hero-local spacing compounding where needed.
2. Skills/Experience/Projects/Education/Reviews/Contact: align internal spacing tiers to shared conventions.
3. AwardsBranch and other expansion blocks: unify control and reveal spacing.

Deliverable:

- Sections feel part of one spacing system while preserving content-specific density.

### Phase 4: QA, Regression Testing, and Documentation

1. Validate responsive snapshots and visual checks at key breakpoints.
2. Run and update tests if needed for affected structure.
3. Document spacing conventions for future contributors.

Deliverable:

- Merged implementation with test validation and spacing guidance.

## Acceptance Criteria

1. No inter-section `<hr>` divider lines remain in the primary page flow.
2. Inter-section spacing is driven by one primary strategy without visible compounding artifacts.
3. Similar section patterns (cards, list groups, expandable controls) use consistent spacing tiers.
4. Desktop and mobile maintain balanced whitespace relative to content density.
5. No accessibility regressions in navigation/focus/semantics.
6. No new dependencies introduced.

## QA Plan

### Visual QA

1. Compare before/after screenshots at:
   - Mobile: 375x812
   - Tablet: 768x1024
   - Desktop: 1280x800
2. Verify consistent perceived rhythm between adjacent sections.
3. Confirm section boundaries are legible without divider lines.

### Functional QA

1. Verify hash navigation still lands and scrolls correctly.
2. Verify focus behavior for section headings and interactive controls.
3. Verify expandable blocks in Projects/Reviews/Experience awards.

### Automated QA

1. Run existing test suite.
2. Update/add tests only where structure-dependent behavior changed.

## Risks and Mitigations

1. Risk: Removing divider lines may make boundaries feel unclear.
   - Mitigation: tune section rhythm and heading spacing before/after each section.
2. Risk: Over-normalization can flatten section character.
   - Mitigation: keep a small allowed variance band by content type.
3. Risk: Hidden regressions at specific breakpoints.
   - Mitigation: enforce breakpoint visual QA checklist.

## Open Decisions

1. Final section rhythm baseline values by breakpoint.
2. Whether spacing tokens live in TypeScript constants, CSS custom properties, or a hybrid.
3. Whether to standardize card padding to one baseline (for example p-5) or two sanctioned variants.

## Proposed Task Breakdown

1. Create spacing convention source (tokens/rules).
2. Remove Home section `<hr>` separators.
3. Select and apply single section rhythm strategy.
4. Normalize section internals by pattern category:
   - Card-like containers
   - List stacks
   - Expandable control blocks
5. Validate responsive and accessibility behavior.
6. Update docs with spacing conventions.

## Definition of Done

1. All acceptance criteria satisfied.
2. PR includes before/after screenshots at required breakpoints.
3. Tests pass.
4. Spacing conventions documented for future contributors.
