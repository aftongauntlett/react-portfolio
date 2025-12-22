import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExperienceSection from '../index';

describe('ExperienceSection - Awards branch', () => {
  it('toggles awards under Lead Engineer role', async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);

    const toggle = screen.getAllByRole('button', { name: /see awards/i })[0];
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    await user.click(toggle);

    expect(screen.getAllByRole('button', { name: /hide awards/i })[0]).toBeInTheDocument();
    expect(screen.getByText('Platinum Award')).toBeInTheDocument();

    await user.click(screen.getAllByRole('button', { name: /hide awards/i })[0]);

    await waitFor(() => {
      expect(screen.queryByText('Platinum Award')).not.toBeInTheDocument();
    });

    expect(screen.getAllByRole('button', { name: /see awards/i })[0]).toBeInTheDocument();
    expect(screen.queryByText('Platinum Award')).not.toBeInTheDocument();
  });

  it('shows the 2022 award under Software Engineer role', async () => {
    const user = userEvent.setup();
    render(<ExperienceSection />);

    const toggles = screen.getAllByRole('button', { name: /see awards/i });
    expect(toggles).toHaveLength(2);

    // Second toggle corresponds to Software Engineer
    await user.click(toggles[1]);

    expect(screen.getByText('2022')).toBeInTheDocument();
    expect(screen.getByText('Gold Award')).toBeInTheDocument();
  });
});
