import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Layout from '../index';

// Mock ThemeContext
vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

// Mock child components
vi.mock('../../SideNav', () => ({
  default: () => <div data-testid="side-nav">SideNav</div>,
}));

vi.mock('../../MobileHeader', () => ({
  default: () => <div data-testid="mobile-header">MobileHeader</div>,
}));

vi.mock('../../../shared/Footer', () => ({
  default: () => <footer data-testid="footer">Footer</footer>,
}));

// Mock Vercel Analytics
vi.mock('@vercel/analytics/react', () => ({
  Analytics: () => null,
}));

vi.mock('@vercel/speed-insights/react', () => ({
  SpeedInsights: () => null,
}));

describe('Layout - Accessibility', () => {
  beforeEach(() => {
    // Reset document focus
    document.body.focus();
  });

  it('renders skip to main content link', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toBeInTheDocument();
  });

  it('skip link points to #main-content', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const skipLink = screen.getByText(/skip to main content/i) as HTMLAnchorElement;
    expect(skipLink.getAttribute('href')).toBe('#main-content');
  });

  it('skip link is visually hidden by default', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toHaveClass('sr-only');
  });

  it('skip link becomes visible on keyboard focus', async () => {
    const user = userEvent.setup();

    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const skipLink = screen.getByText(/skip to main content/i);

    // Initially has sr-only class
    expect(skipLink).toHaveClass('sr-only');

    // Tab to focus the skip link
    await user.tab();

    // When focused, should have focus:not-sr-only class (which removes sr-only)
    expect(skipLink).toHaveFocus();
    expect(skipLink).toHaveClass('focus:not-sr-only');
  });

  it('main content area has id="main-content"', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('id', 'main-content');
  });

  it('main content area has proper ARIA label', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('aria-label', 'Main content');
  });

  it('renders children inside main content area', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Child Component</div>
      </Layout>,
    );

    const mainContent = screen.getByRole('main');
    const testChild = screen.getByTestId('test-child');

    expect(mainContent).toContainElement(testChild);
  });

  it('skip link has proper focus styles for visibility', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const skipLink = screen.getByText(/skip to main content/i);

    // Check for focus-related classes
    expect(skipLink.className).toContain('focus:absolute');
    expect(skipLink.className).toContain('focus:top-4');
    expect(skipLink.className).toContain('focus:left-4');
    expect(skipLink.className).toContain('focus:z-50');
    expect(skipLink.className).toContain('focus:px-4');
    expect(skipLink.className).toContain('focus:py-2');
  });

  it('renders SideNav component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('side-nav')).toBeInTheDocument();
  });

  it('renders MobileHeader component', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    expect(screen.getByTestId('mobile-header')).toBeInTheDocument();
  });

  it('renders Footer component inside main', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>,
    );

    const footer = screen.getByTestId('footer');
    const mainContent = screen.getByRole('main');

    expect(mainContent).toContainElement(footer);
  });
});
