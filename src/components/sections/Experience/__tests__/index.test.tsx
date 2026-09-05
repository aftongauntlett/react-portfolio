import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ExperienceSection from '../index';

describe('ExperienceSection', () => {
  it('renders job entries in the professional experience list', () => {
    render(<ExperienceSection />);

    expect(screen.getByRole('list', { name: 'Professional experience' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Lead Engineer' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'UI Developer' })).toBeInTheDocument();
  });

  it('renders the Lead Engineer bullet points', () => {
    render(<ExperienceSection />);

    expect(screen.getByText(/Promoted to lead within a year/i)).toBeInTheDocument();
    expect(screen.getByText(/Built the design practice from scratch/i)).toBeInTheDocument();
    expect(screen.getByText(/AWS re:Invent/i)).toBeInTheDocument();
  });

  it('renders the Mid-Level Everything Engineer bullet points', () => {
    render(<ExperienceSection />);

    expect(screen.getByText(/modernizing a mission-critical legacy system/i)).toBeInTheDocument();
    expect(screen.getByText(/React\/TypeScript component library/i)).toBeInTheDocument();
    expect(screen.getByText(/Playwright end-to-end testing/i)).toBeInTheDocument();
  });

  it('renders a clickable link for jobs with a company URL', () => {
    render(<ExperienceSection />);

    const link = screen.getByRole('link', { name: /pretty pretty pretty good/i });
    expect(link).toHaveAttribute('href', 'https://www.prettyprettyprettygood.org/');
  });
});
