import { useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaFileAlt, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { navigateToPortfolio } from '@/utils/navigation';
import { TYPOGRAPHY } from '@/constants/typography';

export default function ExternalFooter() {
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePortfolio = () => {
    navigateToPortfolio();
  };

  // Navigation configuration
  const navigationLinks = [
    {
      label: 'Portfolio',
      onClick: handlePortfolio,
      isActive: location.pathname === '/',
    },
    {
      label: 'Game Development',
      href: '/gamedev',
      isActive: location.pathname === '/gamedev',
    },
    {
      label: 'Dev Blog',
      href: '/blog',
      isActive: location.pathname === '/blog' || location.pathname.startsWith('/blog/'),
    },
  ];

  // Connect links configuration
  const connectLinks = [
    {
      label: 'GitHub',
      href: 'https://github.com/aftongauntlett',
      icon: FaGithub,
      external: true,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/aftongauntlett',
      icon: FaLinkedin,
      external: true,
    },
    {
      label: 'Resume',
      href: '/resume.pdf',
      icon: FaFileAlt,
      external: true,
    },
  ];

  // Contact links configuration
  const contactLinks = [
    {
      label: 'hello@aftongauntlett.com',
      href: 'mailto:hello@aftongauntlett.com',
      icon: FaEnvelope,
    },
  ];

  // Shared navigation link classes
  const getNavLinkClasses = (isActive: boolean) =>
    `inline-block ${TYPOGRAPHY.TEXT_SMALL} transition-all duration-200 ${
      isActive
        ? 'text-[var(--color-primary)] font-medium border-b border-[var(--color-primary)]'
        : 'text-[var(--color-text)] hover:text-[var(--color-secondary)] border-b border-transparent hover:border-[var(--color-secondary)]'
    }`;

  // Shared external link classes (with icons)
  const getExternalLinkClasses = () =>
    `inline-block ${TYPOGRAPHY.TEXT_SMALL} text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-all duration-200 border-b border-transparent hover:border-[var(--color-secondary)] group`;

  return (
    <footer className="w-full bg-[var(--color-surface)] border-t border-[var(--color-line)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 mb-8">
          {/* Navigation Links */}
          <div>
            <h3
              className={`${TYPOGRAPHY.TEXT_SMALL} font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-4`}
            >
              Navigation
            </h3>
            <div className="space-y-3">
              {navigationLinks.map((link) => (
                <div key={link.label}>
                  {link.onClick ? (
                    <button onClick={link.onClick} className={getNavLinkClasses(link.isActive)}>
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} className={getNavLinkClasses(link.isActive)}>
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3
              className={`${TYPOGRAPHY.TEXT_SMALL} font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-4`}
            >
              Connect
            </h3>
            <div className="space-y-3">
              {connectLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className={getExternalLinkClasses()}
                    >
                      <IconComponent className="w-3 h-3 inline mr-2 group-hover:text-[var(--color-secondary)] transition-colors" />
                      {link.label}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3
              className={`${TYPOGRAPHY.TEXT_SMALL} font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-4`}
            >
              Contact
            </h3>
            <div className="space-y-3">
              {contactLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <div key={link.label}>
                    <a href={link.href} className={getExternalLinkClasses()}>
                      <IconComponent className="w-3 h-3 inline mr-2 group-hover:text-[var(--color-secondary)] transition-colors" />
                      {link.label}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[var(--color-line)] gap-4">
          <p
            className={`${TYPOGRAPHY.TEXT_SMALL} text-[var(--color-muted)] text-center sm:text-left`}
          >
            © {currentYear} Afton Gauntlett. All rights reserved.
          </p>

          <button
            onClick={handleScrollToTop}
            className={`inline-flex items-center gap-2 ${TYPOGRAPHY.TEXT_SMALL} text-[var(--color-text)] hover:text-[var(--color-secondary)] transition-all duration-200 border-b border-transparent hover:border-[var(--color-secondary)] group`}
            aria-label="Scroll to top"
          >
            <FaArrowUp className="w-3 h-3 group-hover:text-[var(--color-secondary)] transition-colors" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
