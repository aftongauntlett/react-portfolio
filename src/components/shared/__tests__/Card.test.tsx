import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import Card from '@/components/shared/Card';

describe('Card Component', () => {
  const defaultProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    date: 'March 2024',
  };

  it('renders card with required props', () => {
    render(<Card {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    expect(screen.getByText('March 2024')).toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    render(<Card {...defaultProps} link="https://example.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders as div when no link provided', () => {
    render(<Card {...defaultProps} />);

    const card = screen.getByText('Test Title').closest('div');
    expect(card?.tagName).toBe('DIV');
  });

  it('includes accessibility label for links', () => {
    render(<Card {...defaultProps} link="https://example.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View Test Title (opens in new tab)');
  });

  it('renders badge when provided', () => {
    render(<Card {...defaultProps} badge="Featured" />);

    // Badge appears in two responsive variants (mobile/desktop)
    const badges = screen.getAllByText('Featured');
    expect(badges.length).toBeGreaterThanOrEqual(1);
  });

  it('renders description when provided', () => {
    render(<Card {...defaultProps} description="Test description" />);

    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('handles mouse events', async () => {
    const user = userEvent.setup();
    const onMouseEnter = vi.fn();
    const onMouseLeave = vi.fn();

    render(<Card {...defaultProps} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} />);

    const card = screen.getByRole('article');

    await user.hover(card);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);

    await user.unhover(card);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const { container } = render(<Card {...defaultProps} className="custom-class" />);

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('custom-class');
  });

  it('renders children when provided', () => {
    render(
      <Card {...defaultProps}>
        <div data-testid="child-element">Child Content</div>
      </Card>,
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
  });

  it('is keyboard accessible when link', () => {
    render(<Card {...defaultProps} link="https://example.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('tabIndex', '0');
  });

  it('uses custom ariaLabel when provided with string title', () => {
    render(
      <Card {...defaultProps} link="https://example.com" ariaLabel="Custom accessible label" />,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Custom accessible label');
  });

  it('uses custom ariaLabel when provided with ReactNode title', () => {
    render(
      <Card
        {...defaultProps}
        title={<span>Complex Title</span>}
        link="https://example.com"
        ariaLabel="Descriptive label for Complex Title"
      />,
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Descriptive label for Complex Title');
  });

  it('falls back to generic label when title is ReactNode and no ariaLabel provided', () => {
    render(<Card {...defaultProps} title={<span>Complex Title</span>} link="https://example.com" />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'View content (opens in new tab)');
  });
});
