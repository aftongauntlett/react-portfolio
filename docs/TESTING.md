# Testing Strategy for React Portfolio

## ✅ Current Test Coverage

### Test Infrastructure

- **Framework**: Vitest 3.x with jsdom environment
- **Testing Library**: @testing-library/react (v16.3.0)
- **Configuration**: `vite.config.ts` with test setup
- **Test Commands**:
  - `npm run test` - Watch mode
  - `npm run test:run` - Single run
  - `npm run test:coverage` - Coverage report
  - `npm run test:ui` - Visual UI

### Test Files Added (26 Total Tests)

#### 1. **Button Component Tests** ✅

**File**: `src/components/shared/__tests__/Button.test.tsx`

- Tests rendering as button vs link
- Validates variant/color props
- Ensures semantic HTML

#### 2. **Card Component Tests** ✅ (NEW)

**File**: `src/components/shared/__tests__/Card.test.tsx`

- 10 comprehensive tests covering:
  - Rendering with required props
  - Link vs div behavior
  - Accessibility (ARIA labels, keyboard navigation)
  - Badge rendering (responsive variants)
  - Mouse hover interactions
  - Custom className support
  - Children rendering

**Highlights**:

- ♿ Accessibility-focused (keyboard nav, screen readers)
- 📱 Responsive design testing
- 🖱️ User interaction patterns

#### 3. **Date Formatter Utility Tests** ✅ (NEW)

**File**: `src/utils/__tests__/dateFormatter.test.ts`

- Pure function testing
- Edge cases (ISO 8601, single-digit dates)
- Timezone-aware assertions

**Shows**: Unit testing best practices for utility functions

#### 4. **Post-Mortem Helpers Tests** ✅ (NEW)

**File**: `src/utils/__tests__/blogHelpers.test.ts`

- 8 tests for post-mortem content validation logic
- Tests `addSeparatorsToSections` logic (auto-formatting)
- Validates `validatePostMortemStructure` rules (ensures consistent structure)
- Edge cases (duplicate separators, out-of-order sections, missing required sections)

**Shows**: Business logic testing, content validation, edge case handling

---

## 📊 Test Coverage Strategy

### What's Tested ✅

- ✅ **UI Components** (Button, Card) - User-facing behavior
- ✅ **Utility Functions** (Date formatting) - Pure logic
- ✅ **Content Validation** (Post-mortem structure validation) - Complex business rules
- ✅ **Accessibility** - Keyboard nav, ARIA, semantic HTML
- ✅ **User Interactions** - Hover, click, keyboard events

### What's NOT Tested (Intentionally)

- ❌ **Layout Components** - Mainly structural, low value
- ❌ **Context Providers** - Integration-level, overkill
- ❌ **Data Files** - Static exports
- ❌ **Animation Logic** - Visual QA better suited

---

## 🎯 Testing Philosophy

This portfolio demonstrates **strategic testing** rather than 100% coverage:

1. **High-Value Tests**: Focus on reusable components and business logic
2. **Accessibility First**: Ensure keyboard navigation and screen reader support
3. **User Behavior**: Test how users interact, not implementation details
4. **Edge Cases**: Validate boundary conditions and error states

### Coverage Targets

- **Components**: 50-60% coverage (high-value shared components)
- **Utilities**: 80%+ coverage (pure functions, critical logic)
- **Business Logic**: 90%+ coverage (validation, calculations)

---

## 🚀 Running Tests

```bash
# Watch mode (development)
npm run test

# Single run (CI/CD)
npm run test:run

# Coverage report
npm run test:coverage

# Interactive UI
npm run test:ui

# Full health check (includes tests)
npm run health:check
```

---

## 🔍 Example Test Patterns

### Component Test (Accessibility-Focused)

```tsx
it('includes accessibility label for links', () => {
  render(<Card {...defaultProps} link="https://example.com" />);

  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('aria-label', 'View Test Title (opens in new tab)');
});
```

### Utility Function Test (Edge Cases)

```tsx
it('handles ISO 8601 date strings', () => {
  const result = formatDate('2024-06-15T12:00:00Z');
  expect(result).toMatch(/June 1[45], 2024/);
});
```

### Content Validation Test (Post-Mortem Structure)

```tsx
it('detects out-of-order sections', () => {
  const sections = [
    /* out-of-order headings */
  ];
  const result = validatePostMortemStructure(sections);

  expect(result.valid).toBe(false);
  expect(result.errors.some((e) => e.includes('out of order'))).toBe(true);
});
```

**Purpose**: Ensures all post-mortems follow a consistent structure with required sections in the correct order, maintaining content quality and user experience.

---

## 📝 Next Steps (Optional)

If you want to expand testing:

### 1. **Integration Tests** (Optional)

- Test user workflows (navigation, filtering)
- Test context providers with consumers
- Use `@testing-library/react-hooks` for custom hooks

### 2. **Visual Regression Tests** (Advanced)

- Add Storybook for component documentation
- Use Chromatic or Percy for visual testing
- Catch unintended UI changes

### 3. **E2E Tests** (Production-Ready)

- Add Playwright or Cypress
- Test critical user journeys
- Run on preview deployments

### 4. **Performance Tests** (Advanced)

- Add `@testing-library/react-render-tracker`
- Monitor re-render counts
- Validate memoization effectiveness

---

## ✨ What This Showcases

✅ **Testing Skills**

- Unit testing (pure functions)
- Component testing (React)
- Accessibility testing (a11y)
- User interaction testing (events)
- Edge case handling

✅ **Best Practices**

- Semantic HTML validation
- ARIA label testing
- Keyboard navigation
- Timezone-aware assertions
- Responsive design testing

✅ **Professional Approach**

- Strategic test coverage (not 100% overkill)
- Focus on user-facing behavior
- Clear test descriptions
- Maintainable test structure

---

## 📚 Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [A11y Testing Guide](https://www.a11y-101.com/development/testing)

---

**Last Updated**: October 16, 2025
**Test Framework**: Vitest 3.2.4
**Total Tests**: 26 passing
**Test Files**: 4
