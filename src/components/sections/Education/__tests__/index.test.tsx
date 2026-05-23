import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EducationSection from '../index';

describe('EducationSection', () => {
  it('renders education list and no awards heading', () => {
    render(<EducationSection />);
    expect(screen.getByRole('list', { name: /^education$/i })).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /awards\s*&\s*recognition/i }),
    ).not.toBeInTheDocument();
  });

  it('renders education entries in list style with inline active status text', () => {
    render(<EducationSection />);

    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument();
    expect(screen.getByText('User Experience Design')).toBeInTheDocument();
    expect(screen.getByText('CompTIA Security+')).toBeInTheDocument();

    expect(
      screen.getByText(
        /Active certification\. Foundation in security principles including access control, identity management, and network defense\./i,
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('link', {
        name: /view comptia security\+/i,
      }),
    ).not.toBeInTheDocument();

    // Active status should no longer render as a standalone badge chip.
    expect(screen.queryByText(/^Active$/)).not.toBeInTheDocument();
  });

  it('does not render accordion toggle buttons', () => {
    render(<EducationSection />);
    expect(screen.queryByRole('button', { name: /^education$/i })).not.toBeInTheDocument();
  });
});
