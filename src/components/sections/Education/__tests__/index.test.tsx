import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EducationSection from '../index';

describe('EducationSection', () => {
  it('renders section headings and counts', () => {
    render(<EducationSection />);
    expect(screen.getByRole('list', { name: /^education$/i })).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /awards\s*&\s*recognition/i }),
    ).not.toBeInTheDocument();

    // Count badges were removed with the accordion UI.
    expect(screen.queryByText(/^3$/)).not.toBeInTheDocument();
  });

  it('renders education items and link behavior', () => {
    render(<EducationSection />);

    expect(screen.getByText('CompTIA Security+ Certification')).toBeInTheDocument();

    // Security+ should show active status.
    expect(screen.getAllByText(/^Active$/).length).toBeGreaterThan(0);

    // Education credential with link should render a link row.
    expect(
      screen.getByRole('link', {
        name: 'View CompTIA Security+ Certification (opens in new tab)',
      }),
    ).toHaveAttribute('href', 'https://www.credly.com/badges/90402bb7-7fdf-4945-aea3-b20fd916f1b4');

    // No type chips in Education section.
    expect(screen.queryByText(/^Certification$/)).not.toBeInTheDocument();
    expect(screen.queryByText(/^Certificate$/)).not.toBeInTheDocument();
  });

  it('does not render accordion toggle buttons', () => {
    render(<EducationSection />);
    expect(screen.queryByRole('button', { name: /^education$/i })).not.toBeInTheDocument();
  });
});
