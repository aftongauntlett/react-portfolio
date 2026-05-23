import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceSection from '../index';

describe('ExperienceSection - recognitions', () => {
  it('renders recognitions under Booz Allen roles without a toggle control', () => {
    render(<ExperienceSection />);

    expect(screen.queryByRole('button', { name: /see awards/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /hide awards/i })).not.toBeInTheDocument();

    expect(screen.getByLabelText('Recognitions for Lead Engineer')).toBeInTheDocument();
    expect(screen.getByLabelText('Recognitions for Software Engineer')).toBeInTheDocument();
    expect(screen.getByText(/Platinum Award:/)).toBeInTheDocument();
    expect(screen.getAllByText(/Gold Award:/)).toHaveLength(2);
  });

  it('keeps the updated job paragraph copy visible', () => {
    render(<ExperienceSection />);

    expect(
      screen.getByText(
        /I led frontend architecture across a suite of mission-critical production applications/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText(/Promoted to Lead Engineer within a year\./i)).toBeInTheDocument();
  });

  it('shows the software engineer 2022 recognition by default', () => {
    render(<ExperienceSection />);

    expect(screen.getByText(/2022 Gold Award:/)).toBeInTheDocument();
  });

  it('renders only remote and on-site location chips', () => {
    render(<ExperienceSection />);

    expect(screen.getAllByText('Remote')).toHaveLength(4);
    expect(screen.getByText('On-site')).toBeInTheDocument();
    expect(screen.queryByText('Hybrid')).not.toBeInTheDocument();
  });
});
