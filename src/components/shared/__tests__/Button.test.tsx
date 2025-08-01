import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/shared/Button';

describe('Button Component', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders as link when href is provided', () => {
    render(<Button href="https://example.com">Visit site</Button>);
    expect(screen.getByRole('link', { name: /visit site/i })).toBeInTheDocument();
  });

  it('applies primary variant by default', () => {
    render(<Button>Primary button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--solid');
    expect(button).toHaveClass('btn--primary');
  });

  it('applies secondary variant when specified', () => {
    render(
      <Button variant="solid" color="secondary">
        Secondary button
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn--solid');
    expect(button).toHaveClass('btn--secondary');
  });
});
