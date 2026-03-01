import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectsSection from '../index';

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
  getMotionDuration: () => 0,
}));

describe('ProjectsSection', () => {
  const getProjectScoped = (name: RegExp) => {
    const heading = screen.getByRole('heading', { name });
    const projectItem = heading.closest('li');
    if (!projectItem) {
      throw new Error(`Expected project list item for heading: ${String(name)}`);
    }

    return within(projectItem);
  };

  it('renders disabled Coming Soon and disabled Private button for Bloop Museum', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/bloop museum/i);

    expect(scoped.queryByRole('link', { name: /design process/i })).not.toBeInTheDocument();
    expect(scoped.queryByRole('link', { name: /view live/i })).not.toBeInTheDocument();

    const comingSoonButton = scoped.getByRole('button', { name: /coming soon/i });
    expect(comingSoonButton).toBeDisabled();

    const privateButton = scoped.getByRole('button', { name: /private/i });
    expect(privateButton).toBeDisabled();
  });

  it('renders active View Repo and active Play Game for Nyx Felis', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/nyx felis/i);

    expect(scoped.queryByRole('link', { name: /design process/i })).not.toBeInTheDocument();

    const viewRepoLink = scoped.getByRole('link', { name: /view repo/i });
    expect(viewRepoLink).toHaveAttribute('href', 'https://github.com/aftongauntlett/js13k-2025');

    const playLink = scoped.getByRole('link', { name: /play game/i });
    expect(playLink).toHaveAttribute('href', 'https://nyx-felis.aftongauntlett.com/');
  });

  it('renders active View Repo and active Play Game for Orbital Order', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/orbital order/i);

    expect(scoped.queryByRole('link', { name: /design process/i })).not.toBeInTheDocument();

    const viewRepoLink = scoped.getByRole('link', { name: /view repo/i });
    expect(viewRepoLink).toHaveAttribute('href', 'https://github.com/aftongauntlett/js13k-demo');

    const playLink = scoped.getByRole('link', { name: /play game/i });
    expect(playLink).toHaveAttribute('href', 'https://orbital-order.aftongauntlett.com/');
  });

  it('renders an active View Live link and active View Repo when both exist', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/astrid beauty/i);

    const liveLink = scoped.getByRole('link', { name: /view live/i });
    expect(liveLink).toHaveAttribute('href', 'https://www.byastridbeautysalon.com/');

    const repoLink = scoped.getByRole('link', { name: /view repo/i });
    expect(repoLink).toHaveAttribute('href', 'https://github.com/aftongauntlett/astrid-beauty');
  });
});
