# GitHub Copilot Instructions for React Portfolio

## Repository Context

This is a modern React 19 portfolio showcasing frontend engineering expertise with exceptional performance and accessibility standards.

### Core Technologies & Versions

- **React**: 19.1.0 (latest features, modern hooks)
- **TypeScript**: 5.8+ (strict mode, latest features)
- **Vite**: 7.x (build tool, HMR, bundle optimization)
- **Tailwind CSS**: 3.4+ (utility-first styling, custom theme)
- **Framer Motion**: 12.x (animations, performance optimized)
- **Vitest**: Testing framework (React Testing Library integration)

### Architecture Patterns

#### Component Structure

```
src/components/
├── layout/          # Layout components (SideNav, Header, etc.)
├── sections/        # Main page sections (About, Projects, etc.)
├── shared/          # Reusable components (Button, Card, etc.)
└── Timeline/        # Specialized timeline components
```

#### Code Style & Standards

- **TypeScript**: Strict mode enabled, prefer interfaces over types
- **React**: Functional components only, modern hooks patterns
- **Imports**: Use `@/` alias for src/, avoid default exports for utilities
- **Styling**: Tailwind utility classes, CSS custom properties for theming
- **Accessibility**: WCAG AA compliance required, semantic HTML

### Performance Requirements

- Maintain 100% Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- Bundle size optimization (current: ~550KB gzipped)
- Code splitting where appropriate
- Lazy loading for non-critical components

### Accessibility Standards (CRITICAL)

- **WCAG AA compliance**: All interactive elements must be keyboard accessible
- **Focus management**: Proper tab order, visible focus indicators
- **Screen readers**: Semantic HTML, proper ARIA labels
- **Color contrast**: Minimum 4.5:1 ratio for normal text
- **Reduced motion**: Respect user preferences

### Theme System

```typescript
// CSS Custom Properties (preferred)
var(--color-primary)     // Primary brand color
var(--color-secondary)   // Secondary accent
var(--color-text)        // Main text color
var(--color-background)  // Background color
var(--color-muted)       // Muted/disabled text
```

### Component Patterns

#### Button Component Example

```typescript
// Use discriminated unions for props
interface ButtonAsButton extends BaseProps {
  href?: never;
}
interface ButtonAsLink extends BaseProps {
  href: string;
}
type ButtonProps = ButtonAsButton | ButtonAsLink;
```

#### Animation Patterns

```typescript
// Use constants from /src/constants/animations.ts
import { fadeInUp, staggerContainer } from '@/constants/animations';

// Prefer performance-optimized animations
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};
```

### Testing Expectations

- Unit tests for all new components
- Accessibility testing (screen reader, keyboard navigation)
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile responsiveness verification

### Common Patterns to Follow

#### Error Boundaries

```typescript
// Always wrap components that might fail
<ErrorBoundary fallback={<ErrorFallback />}>
  <Component />
</ErrorBoundary>
```

#### Memoization

```typescript
// Use React.memo for expensive components
export default React.memo(Component);

// Use useMemo for expensive calculations
const expensiveValue = useMemo(() => heavyCalculation(props.data), [props.data]);
```

#### Custom Hooks

```typescript
// Follow naming convention: use[Purpose]
export function useActiveSection(): string | null {
  // Implementation
}
```

### Code Review Criteria

1. **TypeScript**: No `any` types, proper interfaces
2. **Performance**: No unnecessary re-renders, proper memoization
3. **Accessibility**: Keyboard navigation, screen reader support
4. **Responsive**: Mobile-first design, fluid typography
5. **Testing**: Comprehensive test coverage
6. **Security**: No XSS vulnerabilities, proper sanitization

### When Generating PRs

- Focus on performance impact and bundle size changes
- Highlight accessibility improvements or concerns
- Include before/after metrics when relevant
- Test cross-browser compatibility
- Verify mobile responsiveness
- Maintain Lighthouse scores

### Helpful Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run test         # Run tests
npm run type-check   # TypeScript validation
npm run lint         # Code linting
npm run health:check # Full project validation
```

## AI-Specific Guidelines

### For Pull Request Descriptions

- Always analyze performance implications
- Check accessibility compliance
- Note any breaking changes
- Highlight bundle size impact
- Include testing recommendations

### For Code Suggestions

- Prioritize accessibility and performance
- Use established patterns from existing codebase
- Maintain TypeScript strict compliance
- Follow React 19 best practices
- Consider mobile-first responsive design

### For Issue Analysis

- Consider cross-browser compatibility
- Evaluate accessibility impact
- Assess performance implications
- Check for responsive design issues
- Review TypeScript type safety

This context should help GitHub Copilot provide more accurate and valuable assistance for this high-standard portfolio project.
