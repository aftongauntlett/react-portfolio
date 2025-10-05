export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

// External navigation items (not tied to scrollspy) - keeping for potential future use
export interface ExternalNavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export const externalNavItems: ExternalNavItem[] = [
  {
    id: 'game-development',
    label: 'Game Development',
    href: '/gamedev',
    description:
      'Interactive games and development insights. Features playable JS13k competition entries with detailed post-mortems covering game design, physics simulation, creative coding under constraints, and lessons learned.',
  },
];
