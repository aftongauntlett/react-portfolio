import type { BlogPostSection } from '@/data/blog/types';
import { Button } from '@/components/shared/Button';
import { BlogImage } from '@/components/shared/BlogImage';
import { BlogFeedbackForm } from './BlogFeedbackForm';
import type { ReactNode } from 'react';
import { TYPOGRAPHY } from '@/constants/typography';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import clsx from 'clsx';
import {
  BLOG_H1_CLASSES,
  BLOG_H2_CLASSES,
  BLOG_H3_CLASSES,
  BLOG_H4_CLASSES,
  BLOG_PARAGRAPH_CLASSES,
  BLOG_LIST_ITEM_CLASSES,
} from '@/constants/styles';
import { addSeparatorsToSections } from '@/utils/blogHelpers';

interface BlogPostContentProps {
  sections: BlogPostSection[];
  tableOfContents?: ReactNode;
  metadata?: {
    title?: string;
    subtitle?: string;
    tags?: string[];
    description?: string;
    author?: string;
    publishDate?: string;
    readTime?: string;
  };
}

const sectionTypeComponentMap = {
  heading: HeadingSection,
  paragraph: ParagraphSection,
  list: ListSection,
  separator: SeparatorSection,
  links: LinksSection,
  'blog-image': BlogImageSection,
  image: BlogImageSection, // Alias for case studies
  'image-grid': ImageGridSection,
  'game-showcase': GameShowcaseSection,
  'design-showcase': GameShowcaseSection, // Reuse game-showcase for design-showcase
  'feedback-form': FeedbackFormSection,
  'pull-quote': PullQuoteSection,
  'color-palette': ColorPaletteSection,
  'tech-grid': TechGridSection,
} as const;

function HeadingSection({
  content,
  level = 2,
  onMouseEnter,
  onMouseLeave,
  isDimmed,
}: BlogPostSection & {
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isDimmed?: boolean;
}) {
  if (!content) return null;

  const headingClasses = {
    1: BLOG_H1_CLASSES,
    2: BLOG_H2_CLASSES,
    3: BLOG_H3_CLASSES,
    4: BLOG_H4_CLASSES,
  };

  const id = content
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const className = clsx(
    headingClasses[level as 1 | 2 | 3 | 4],
    'transition-opacity duration-200',
    isDimmed && 'opacity-40',
  );

  if (level === 1) {
    return (
      <h1 className={className} id={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {content}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h2 className={className} id={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {content}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3 className={className} id={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {content}
      </h3>
    );
  }
  if (level === 4) {
    return (
      <h4 className={className} id={id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {content}
      </h4>
    );
  }

  return (
    <h2 className={headingClasses[2]} id={id}>
      {content}
    </h2>
  );
}

function ParagraphSection({ content }: BlogPostSection) {
  if (!content) return null;

  return <p className={`${BLOG_PARAGRAPH_CLASSES} mb-8`}>{content}</p>;
}

function ListSection({ items }: BlogPostSection) {
  if (!items || items.length === 0) return null;

  return (
    <ul className="group space-y-4 mb-8 list-none" role="list" aria-label="List of items">
      {items.map((item, index) => (
        <li
          key={`${item.slice(0, 20).replace(/[^a-z0-9]/gi, '')}-${index}`}
          className={`relative pl-6 flex items-start gap-3 ${BLOG_LIST_ITEM_CLASSES} rounded-sm focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2 focus-visible:bg-[var(--color-primary)]/5`}
          tabIndex={0}
          role="listitem"
        >
          <span
            className="absolute left-0 text-[var(--color-secondary)] transition-colors md:group-hover:text-[var(--color-secondary)]"
            aria-hidden="true"
          >
            –
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function SeparatorSection() {
  return (
    <div className="flex justify-center my-16" role="separator" aria-hidden="true">
      <div className="text-2xl text-[var(--color-muted)] font-light tracking-widest">⸻</div>
    </div>
  );
}

function PullQuoteSection({ content, author, citation }: BlogPostSection) {
  if (!content) return null;

  return (
    <blockquote
      className="my-8 pl-6 border-l-4 border-[var(--color-secondary)] italic text-[var(--color-text)]/90"
      role="note"
    >
      <p className={`${BLOG_PARAGRAPH_CLASSES} text-lg mb-2`}>{content}</p>
      {(author || citation) && (
        <footer className="text-sm text-[var(--color-muted)] not-italic mt-2">
          {author && <cite>— {author}</cite>}
          {author && citation && ', '}
          {citation && <span>{citation}</span>}
        </footer>
      )}
    </blockquote>
  );
}

function ColorPaletteSection({ colors }: BlogPostSection) {
  if (!colors || colors.length === 0) return null;

  return (
    <div className="my-8" role="region" aria-label="Color palette">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <div
            key={color.hex}
            className="p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]"
          >
            <div
              className="w-full h-16 rounded-md mb-3"
              style={{ backgroundColor: color.hex }}
              role="img"
              aria-label={`Color swatch for ${color.name}`}
            />
            <h4 className="font-semibold text-[var(--color-text)] mb-1">{color.name}</h4>
            <p className="text-sm font-mono text-[var(--color-muted)] mb-2">{color.hex}</p>
            <p className="text-sm text-[var(--color-muted)]">{color.usage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechGridSection({ techStack }: BlogPostSection) {
  if (!techStack || techStack.length === 0) return null;

  return (
    <div className="my-8" role="region" aria-label="Technology stack">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="p-4 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] text-center transition-colors duration-200 hover:border-[var(--color-primary)]"
          >
            <p className="font-semibold text-[var(--color-text)] mb-1">{tech.name}</p>
            <p className="text-xs text-[var(--color-muted)]">{tech.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function LinksSection({ links }: BlogPostSection) {
  if (!links || links.length === 0) return null;

  const getIconForType = (type: 'github' | 'demo' | 'external' | 'figma') => {
    switch (type) {
      case 'github':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'figma':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0zm-4-4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 12a4 4 0 1 0 0-8v8zm4-12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        );
      case 'demo':
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
    }
  };

  return (
    <div className="my-8" role="group" aria-label="Related links">
      <div className="flex flex-wrap gap-4 justify-center">
        {links.map((link, index) => (
          <Button
            key={`${link.type}-${link.text.replace(/[^a-z0-9]/gi, '')}-${index}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            color="secondary"
            icon={getIconForType(link.type)}
            aria-label={`${link.text} (opens in new tab)`}
          >
            {link.text}
          </Button>
        ))}
      </div>
    </div>
  );
}

function BlogImageSection({ src, alt, caption, size }: BlogPostSection) {
  if (!src || !alt) return null;

  return <BlogImage src={src} alt={alt} caption={caption} size={size} />;
}

function ImageGridSection({ images }: BlogPostSection) {
  if (!images || images.length === 0) return null;

  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {images.map((image, index) => (
        <figure key={index} className="space-y-2">
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] p-4 shadow-lg border border-[var(--color-line)] dark:border-transparent dark:bg-none dark:p-0">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-auto rounded-lg dark:shadow-lg"
              loading="lazy"
            />
          </div>
          {image.caption && (
            <figcaption className="text-sm text-[var(--color-muted)] text-center italic">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

function GameShowcaseSection({
  src,
  alt,
  caption,
  links,
  subtitle,
  tags,
  content,
  type,
  author,
  publishDate,
  readTime,
}: BlogPostSection & {
  subtitle?: string;
  tags?: string[];
  author?: string;
  publishDate?: string;
  readTime?: string;
}) {
  if (!src || !alt) return null;

  const isGameShowcase = type === 'game-showcase';
  const isDesignShowcase = type === 'design-showcase';

  const getIconForType = (type: 'github' | 'demo' | 'external') => {
    switch (type) {
      case 'github':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'demo':
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        );
    }
  };

  const githubLink = links?.find((link) => link.type === 'github');
  const demoLink = links?.find(
    (link) => link.type === 'demo' && !link.text.toLowerCase().includes('original'),
  );
  const externalLink = links?.find((link) => link.type === 'external');

  return (
    <div className="my-12" role="group" aria-label="Game showcase">
      <div className="grid md:grid-cols-[auto_1fr] gap-8 lg:gap-10 items-start">
        <div className="w-full max-w-[320px] md:max-w-[480px]">
          <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] p-4 shadow-xl border border-[var(--color-line)] dark:border-transparent dark:bg-none dark:p-0">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-lg dark:shadow-xl"
              loading="lazy"
            />
            {caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 rounded-b-lg">
                <p
                  className={`text-white/90 ${TYPOGRAPHY.TEXT_SMALL} leading-relaxed italic font-medium text-center`}
                >
                  {caption}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full">
          {subtitle && (
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)] leading-tight mb-2">
              {subtitle}
            </h1>
          )}

          {/* Author, Date, Read Time - Below title, before tags */}
          {(author || publishDate || readTime) && (
            <div className="flex flex-wrap gap-3 text-sm text-[var(--color-muted)] mb-4">
              {author && <span>By {author}</span>}
              {publishDate && <span>•</span>}
              {publishDate && <span>{publishDate}</span>}
              {readTime && <span>•</span>}
              {readTime && <span>{readTime}</span>}
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 bg-[var(--color-surface)] border border-[var(--color-line)] rounded-md text-xs font-medium text-[var(--color-text)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {content && (
            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed flex-1 mb-6">
              {content}
            </p>
          )}

          <div className="flex flex-col gap-3 mt-auto pt-4">
            {demoLink && isGameShowcase && (
              <Button
                href={demoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                color="secondary"
                icon={getIconForType('demo')}
                aria-label={`Play game (opens in new tab)`}
              >
                Play Game
              </Button>
            )}
            {demoLink && isDesignShowcase && (
              <Button
                href={demoLink.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="solid"
                color="secondary"
                icon={getIconForType('demo')}
                aria-label={`View live site (opens in new tab)`}
              >
                View Live
              </Button>
            )}
            <div className="grid grid-cols-2 gap-3">
              {githubLink && (
                <Button
                  href={githubLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  color="primary"
                  icon={getIconForType('github')}
                  aria-label={`View source code (opens in new tab)`}
                >
                  View Source
                </Button>
              )}
              {externalLink && (
                <Button
                  href={externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  color="secondary"
                  icon={getIconForType('external')}
                  aria-label={`${externalLink.text} (opens in new tab)`}
                >
                  {externalLink.text}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedbackFormSection({ formDescription }: BlogPostSection) {
  return <BlogFeedbackForm description={formDescription} />;
}

export default function BlogPostContent({
  sections,
  tableOfContents,
  metadata,
}: BlogPostContentProps) {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();
  const sectionsWithSeparators = addSeparatorsToSections(sections);

  let tocStartIndex = -1;
  for (let i = 0; i < sectionsWithSeparators.length; i++) {
    const section = sectionsWithSeparators[i];
    if (section.type === 'heading' && section.level === 2) {
      tocStartIndex = i;
      break;
    }
  }

  const shouldShowToc = tableOfContents && tocStartIndex >= 0;
  const introSections = shouldShowToc ? sectionsWithSeparators.slice(0, tocStartIndex) : [];
  const mainSections = shouldShowToc
    ? sectionsWithSeparators.slice(tocStartIndex)
    : sectionsWithSeparators;

  return (
    <>
      {shouldShowToc && (
        <article className="max-w-none mb-12" role="main" aria-label="Blog post introduction">
          {introSections.map((section, index) => {
            const SectionComponent = sectionTypeComponentMap[section.type];
            if (!SectionComponent) return null;

            const stableKey = section.content
              ? `intro-${section.type}-${section.content.slice(0, 20).replace(/[^a-z0-9]/gi, '')}-${index}`
              : `intro-${section.type}-${index}`;

            return (
              <SectionComponent
                key={stableKey}
                {...section}
                {...(section.type === 'game-showcase' || section.type === 'design-showcase'
                  ? {
                      subtitle: metadata?.subtitle,
                      tags: metadata?.tags,
                      author: metadata?.author,
                      publishDate: metadata?.publishDate,
                      readTime: metadata?.readTime,
                    }
                  : {})}
              />
            );
          })}
        </article>
      )}

      <div
        className={
          shouldShowToc
            ? 'grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 max-w-7xl mx-auto'
            : ''
        }
      >
        {shouldShowToc && <div className="lg:block">{tableOfContents}</div>}

        <div className={shouldShowToc ? 'max-w-4xl' : ''}>
          <article className="max-w-none" role="main" aria-label="Blog post content">
            {mainSections.map((section, index) => {
              const SectionComponent = sectionTypeComponentMap[section.type];

              if (!SectionComponent) {
                if (process.env.NODE_ENV === 'development') {
                  console.warn(`Unknown section type: ${section.type}`);
                }
                return null;
              }

              const sectionIndex = shouldShowToc ? tocStartIndex + index : index;
              const stableKey = section.content
                ? `${section.type}-${section.content.slice(0, 20).replace(/[^a-z0-9]/gi, '')}-${sectionIndex}`
                : `${section.type}-${sectionIndex}`;

              // Add hover handlers only for heading sections
              const hoverProps =
                section.type === 'heading'
                  ? {
                      onMouseEnter: () => setHovered(index),
                      onMouseLeave: clearHovered,
                      isDimmed: isDimmed(index),
                    }
                  : {};

              return (
                <SectionComponent
                  key={stableKey}
                  {...section}
                  {...hoverProps}
                  {...(section.type === 'game-showcase' || section.type === 'design-showcase'
                    ? {
                        subtitle: metadata?.subtitle,
                        tags: metadata?.tags,
                        author: metadata?.author,
                        publishDate: metadata?.publishDate,
                        readTime: metadata?.readTime,
                      }
                    : {})}
                />
              );
            })}
          </article>
        </div>
      </div>
    </>
  );
}
