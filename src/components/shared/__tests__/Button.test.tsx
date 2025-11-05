import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/shared/Button';
import { FaGithub } from 'react-icons/fa';

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

  describe('Icon-only button accessibility', () => {
    it('should render icon-only button with aria-label', () => {
      render(<Button icon={<FaGithub />} aria-label="View on GitHub" />);

      const button = screen.getByRole('button', { name: 'View on GitHub' });
      expect(button).toBeInTheDocument();
    });

    it('should throw error when icon-only button lacks aria-label', () => {
      expect(() => {
        // @ts-expect-error - Testing runtime error for missing aria-label
        render(<Button icon={<FaGithub />} />);
      }).toThrow('Icon-only Button requires an explicit aria-label');
    });

    it('should not require aria-label when button has children', () => {
      render(<Button icon={<FaGithub />}>View Repo</Button>);

      const button = screen.getByRole('button', { name: 'View Repo' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('External link security', () => {
    it('should add rel="noopener noreferrer" for external links', () => {
      render(
        <Button href="https://external-site.com" icon={<FaGithub />} aria-label="External link" />,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should not add rel/target for internal links', () => {
      render(<Button href="/internal-page">Internal Link</Button>);

      const link = screen.getByRole('link');
      expect(link).not.toHaveAttribute('rel');
      expect(link).not.toHaveAttribute('target');
    });

    it('should allow custom rel and target attributes', () => {
      render(
        <Button href="https://example.com" target="_self" rel="custom">
          Custom Link
        </Button>,
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('rel', 'custom');
      expect(link).toHaveAttribute('target', '_self');
    });
  });
});
