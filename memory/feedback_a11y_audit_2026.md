---
name: a11y-audit-2026
description: Full WCAG 2.2 AA accessibility audit performed June 2026 — contrast failures, hover affordance, ARIA, meta tags, scroll
metadata:
  type: project
---

Comprehensive accessibility audit completed 2026-06-03. All issues below were fixed directly.

**Why:** Routine audit to ensure WCAG 2.2 AA compliance before any public launch / job-search visibility.

**How to apply:** When adding new text, components, or hover states, reference these findings to avoid re-introducing the same patterns.

## Contrast failures fixed

- `--color-muted` light mode was `hsl(25, 8%, 40%)` → 4.46:1 on linen bg (FAILS 4.5:1). Darkened to `hsl(25, 8%, 37%)` → 5.13:1 ✓
- `.text-description` CSS class had `color: var(--color-muted)` — changed to `var(--color-text)`. Affected Projects descriptions, Contact intro, and anywhere text-description was used without a color override.
- Testimonials intro text had `opacity-60` stacked on top of muted → effective contrast ~2.25:1 (severe). Removed the opacity modifier.
- Testimonials blockquote body text was `text-[var(--color-muted)]` → changed to `text-[var(--color-text)]` via `.text-description` class fix.
- ContactForm field labels were `text-[var(--color-muted)]` → changed to `text-[var(--color-text)]` (focus-within highlight to primary kept).
- MobileNav inactive link labels were `text-[var(--color-muted)]` → `text-[var(--color-text)]`.
- MobileNav theme toggle button text was `text-[var(--color-muted)]` → `text-[var(--color-text)]`.
- Credentials institution line was `text-[var(--color-muted)]` → `text-[var(--color-secondary)]` (5.53:1 ✓).
- SkillsSection skill name labels were `text-[var(--color-muted)]` at 11px → `text-[var(--color-text)]`.

## Hover-to-brighten affordance fixed

Removed `group-hover:text-[var(--color-text)]` (muted→full) patterns from non-interactive `<li>` containers in:
- Experience: job description, awards list
- Credentials: description
- SkillsSection: skill labels
- Testimonials: blockquote border color change, reviewer name color change, quote char color change

These patterns implied interactivity where none existed and were invisible to touch/keyboard users.

## ARIA fixes

- Removed `aria-label` from the project description `<div>` in Projects/index.tsx — generic divs have no implicit ARIA role; the attribute was silently ignored by screen readers and added noise.

## CSS variable bug fixed

- `--color-nameplate` was referenced in PageSection/index.tsx but never defined in theme.css. Browser silently inherited `--color-text` from parent div. Made explicit: replaced with `text-[var(--color-text)]`.

## Items confirmed passing (no changes needed)

- **Meta tags:** og:title, og:description, og:image, twitter:card, description — all present and populated in index.html ✓
- **Keyboard focus indicators:** Global `*:focus-visible { outline: 2px solid var(--color-primary) }` covers all interactive elements ✓
- **Skip to main content link:** Present in Layout/index.tsx ✓
- **ARIA on interactive elements:** icon-only buttons require aria-label enforced at runtime by Button component ✓
- **Mobile scroll:** No `overflow: hidden` on body/html; `overflow-x: hidden` only on mobile for horizontal bleed ✓
- **Scroll animations:** framer-motion `whileInView` with `usePrefersReducedMotion` guard throughout ✓
- **Touch targets:** All interactive elements ≥ 24×24px (WCAG 2.2 AA 2.5.8 threshold) ✓
- **Screen reader announcements:** SideNav uses aria-live polite region to announce active section changes ✓
- **Dark mode muted:** `hsl(198, 21%, 77%)` on dark bg gives ~11.3:1 — passes by wide margin ✓
