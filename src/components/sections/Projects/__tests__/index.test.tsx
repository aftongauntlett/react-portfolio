import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ProjectsSection from '../index';

vi.mock('@/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => true,
  getMotionDuration: () => 0,
}));

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ theme: 'light' }),
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

  it('renders Play Game and Source links for Orbital Order', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/orbital order/i);

    const playLink = scoped.getByRole('link', { name: /play orbital order/i });
    expect(playLink).toHaveAttribute('href', 'https://orbital-order.aftongauntlett.com/');

    const sourceLink = scoped.getByRole('link', { name: /orbital order.*source code/i });
    expect(sourceLink).toHaveAttribute('href', 'https://github.com/aftongauntlett/js13k-demo');
  });

  it('renders View Live and Source links for No Whiteboard Jobs Dashboard', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/no whiteboard jobs dashboard/i);

    const liveLink = scoped.getByRole('link', { name: /no whiteboard.*live site/i });
    expect(liveLink).toHaveAttribute('href', 'https://no-wb.org');

    const sourceLink = scoped.getByRole('link', { name: /no whiteboard.*source code/i });
    expect(sourceLink).toHaveAttribute(
      'href',
      'https://github.com/aftongauntlett/no-whiteboard-jobs-dashboard',
    );
  });

  it('renders NPC Finder with a Source link and tech chips', () => {
    render(<ProjectsSection />);

    const scoped = getProjectScoped(/npc finder/i);

    const sourceLink = scoped.getByRole('link', { name: /npc finder.*source code/i });
    expect(sourceLink).toHaveAttribute('href', 'https://github.com/aftongauntlett/npcfinder');

    expect(scoped.getByText('React')).toBeInTheDocument();
    expect(scoped.getByText('Supabase Auth')).toBeInTheDocument();
    expect(scoped.getByText('PostgreSQL RLS')).toBeInTheDocument();
  });
});
