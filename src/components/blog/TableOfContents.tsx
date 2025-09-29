import { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { BlogPostSection } from '@/data/blog/types';
import { TYPOGRAPHY } from '@/constants/typography';

interface TableOfContentsProps {
  sections: BlogPostSection[];
}

interface TocItem {
  id: string;
  title: string;
  level: number;
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Extract headings from sections
  const tocItems: TocItem[] = sections
    .filter((section) => section.type === 'heading' && section.content)
    .map((section) => {
      const id = section
        .content!.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      return {
        id,
        title: section.content!,
        level: section.level || 2,
      };
    });

  // Handle scroll spy to highlight active section
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = tocItems
        .map((item) => document.getElementById(item.id))
        .filter(Boolean);

      let current = '';
      for (const element of headingElements) {
        if (element && element.getBoundingClientRect().top <= 100) {
          current = element.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="lg:sticky lg:top-8 bg-[var(--color-background)]/90 backdrop-blur-sm border border-[var(--color-line)] rounded-lg overflow-hidden lg:max-h-[calc(100vh-4rem)]">
      {/* Header - always visible, clickable on mobile */}
      <button
        className="w-full flex items-center justify-between p-4 text-left lg:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className={`${TYPOGRAPHY.TEXT_SMALL} font-semibold text-[var(--color-text)]`}>
          Contents
        </h3>
        <div className="lg:hidden">
          {isExpanded ? (
            <FaChevronUp className="w-3 h-3 text-[var(--color-muted)]" />
          ) : (
            <FaChevronDown className="w-3 h-3 text-[var(--color-muted)]" />
          )}
        </div>
      </button>

      {/* Navigation - collapsible on mobile, always visible on desktop */}
      <nav className={`${isExpanded ? 'block' : 'hidden'} lg:block lg:overflow-y-auto`}>
        <div className="p-4 pt-0">
          <ul className="space-y-1">
            {tocItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsExpanded(false); // Close on mobile after clicking
                  }}
                  className={`block w-full text-left ${TYPOGRAPHY.TEXT_SMALL} py-1.5 px-2 rounded transition-colors hover:bg-[var(--color-line)]/30 ${
                    activeSection === item.id
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5 font-medium'
                      : 'text-[var(--color-muted)] hover:text-[var(--color-text)]'
                  } ${item.level === 3 ? 'pl-6' : item.level === 4 ? 'pl-10' : 'pl-2'}`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}
