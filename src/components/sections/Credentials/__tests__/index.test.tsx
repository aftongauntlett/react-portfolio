import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CredentialsSection from '../index';

describe('CredentialsSection', () => {
  it('renders credentials list and no awards heading', () => {
    render(<CredentialsSection />);
    expect(screen.getByRole('list', { name: /^credentials$/i })).toBeInTheDocument();

    expect(
      screen.queryByRole('heading', { name: /awards\s*&\s*recognition/i }),
    ).not.toBeInTheDocument();
  });

  it('renders credential entries in list style with inline active status text', () => {
    render(<CredentialsSection />);

    expect(screen.getByText('Full-Stack Web Development')).toBeInTheDocument();
    expect(screen.getByText('User Experience Design')).toBeInTheDocument();
    expect(screen.getByText('CompTIA Security+')).toBeInTheDocument();

    expect(screen.getByText(/11\/2022 - Active/i)).toBeInTheDocument();

    expect(
      screen.getByText(
        /Foundation in security principles including access control, identity management, and network defense\./i,
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
    render(<CredentialsSection />);
    expect(screen.queryByRole('button', { name: /^credentials$/i })).not.toBeInTheDocument();
  });
});
