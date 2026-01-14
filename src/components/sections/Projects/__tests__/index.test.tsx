import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectsSection from '../index';

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
  getMotionDuration: () => 0,
}));

describe('ProjectsSection', () => {
  it('renders a design process link for Bloop Museum (no GitHub link)', () => {
    render(<ProjectsSection />);

    const heading = screen.getByRole('heading', { name: /bloop museum/i });
    const projectItem = heading.closest('li');
    expect(projectItem).not.toBeNull();

    const scoped = within(projectItem as HTMLElement);

    const designProcessLink = scoped.getByRole('link', { name: /design process/i });
    expect(designProcessLink).toHaveAttribute('href', '/projects/bloop-museum-design-process');
    expect(designProcessLink).toHaveAttribute('target', '_blank');

    expect(scoped.queryByRole('button', { name: /private repo/i })).not.toBeInTheDocument();

    expect(scoped.queryByRole('link', { name: /view repo/i })).not.toBeInTheDocument();
  });

  it('renders a private repo notice for Potomac (existing behavior)', () => {
    render(<ProjectsSection />);

    const heading = screen.getByRole('heading', { name: /potomac family dining/i });
    const projectItem = heading.closest('li');
    expect(projectItem).not.toBeNull();

    const scoped = within(projectItem as HTMLElement);

    const privateButton = scoped.getByRole('button', { name: /private repo/i });
    expect(privateButton).toBeDisabled();

    expect(scoped.queryByRole('link', { name: /view repo/i })).not.toBeInTheDocument();
  });

  it('renders a design process link for Nyx Felis and hides View Live on the portfolio card', () => {
    render(<ProjectsSection />);

    const heading = screen.getByRole('heading', { name: /nyx felis/i });
    const projectItem = heading.closest('li');
    expect(projectItem).not.toBeNull();

    const scoped = within(projectItem as HTMLElement);

    const designProcessLink = scoped.getByRole('link', { name: /design process/i });
    expect(designProcessLink).toHaveAttribute('href', '/blog/js13k-2025-post-mortem');
    expect(designProcessLink).toHaveAttribute('target', '_blank');

    expect(scoped.queryByRole('link', { name: /view live/i })).not.toBeInTheDocument();
  });

  it('renders a design process link for Orbital Order and hides View Live on the portfolio card', () => {
    render(<ProjectsSection />);

    const heading = screen.getByRole('heading', { name: /orbital order/i });
    const projectItem = heading.closest('li');
    expect(projectItem).not.toBeNull();

    const scoped = within(projectItem as HTMLElement);

    const designProcessLink = scoped.getByRole('link', { name: /design process/i });
    expect(designProcessLink).toHaveAttribute('href', '/blog/orbital-order-post-mortem');
    expect(designProcessLink).toHaveAttribute('target', '_blank');

    expect(scoped.queryByRole('link', { name: /view live/i })).not.toBeInTheDocument();
  });
});
