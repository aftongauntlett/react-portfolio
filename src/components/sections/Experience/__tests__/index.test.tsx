import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceSection from '../index';

describe('ExperienceSection', () => {
  it('renders job entries in the professional experience list', () => {
    render(<ExperienceSection />);

    expect(screen.getByRole('list', { name: 'Professional experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Lead Engineer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Software Engineer' })).toBeInTheDocument();
  });

  it('renders the Lead Engineer bullet points', () => {
    render(<ExperienceSection />);

    expect(screen.getByText(/Promoted to lead within a year/i)).toBeInTheDocument();
    expect(screen.getByText(/Built the design practice from scratch/i)).toBeInTheDocument();
    expect(screen.getByText(/Booz Allen Platinum Award/i)).toBeInTheDocument();
  });

  it('renders the Software Engineer bullet points', () => {
    render(<ExperienceSection />);

    expect(screen.getByText(/Modernized the frontend toolchain/i)).toBeInTheDocument();
    expect(screen.getByText(/accessibility standards/i)).toBeInTheDocument();
    expect(screen.getByText(/AWS re:Invent/i)).toBeInTheDocument();
  });

  it('renders a clickable link for jobs with a company URL', () => {
    render(<ExperienceSection />);

    const link = screen.getByRole('link', { name: /pretty pretty pretty good/i });
    expect(link).toHaveAttribute('href', 'https://www.prettyprettyprettygood.org/');
  });
});
