export interface NavItem {
  id: string;
  label: string;
}

export const navItems: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'professional-projects', label: 'Professional Projects' },
  { id: 'personal-projects', label: 'Personal Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

// External navigation items (not tied to scrollspy)
export interface ExternalNavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export const externalNavItems: ExternalNavItem[] = [
  {
    id: 'blog',
    label: 'Technical Blog',
    href: '/blog',
    description:
      'In-depth technical writing covering development insights, post-mortems from game jams, and lessons learned from building complex frontend applications.',
  },
  {
    id: 'games',
    label: 'Interactive Games',
    href: '/games',
    description:
      'Creative coding projects and game development experiments, including entries from JS13k game jams and interactive web experiences showcasing advanced JavaScript techniques.',
  },
];
