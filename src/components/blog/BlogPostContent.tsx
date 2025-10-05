import type { BlogPostSection } from '@/data/blog/types';
import { Button } from '@/components/shared/Button';
import Tag from '@/components/shared/Tag';
import { BlogImage } from '@/components/shared/BlogImage';
import { BlogFeedbackForm } from './BlogFeedbackForm';
import type { ReactNode } from 'react';
import { TYPOGRAPHY } from '@/constants/typography';
import {
  BLOG_H1_CLASSES,
  BLOG_H2_CLASSES,
  BLOG_H3_CLASSES,
  BLOG_H4_CLASSES,
  BLOG_PARAGRAPH_CLASSES,
  BLOG_LIST_ITEM_CLASSES,
} from '@/constants/styles';

interface BlogPostContentProps {
  sections: BlogPostSection[];
  tableOfContents?: ReactNode;
  metadata?: {
    subtitle?: string;
    tags?: string[];
  };
}

const sectionTypeComponentMap = {
  heading: HeadingSection,
  paragraph: ParagraphSection,
  list: ListSection,
  separator: SeparatorSection,
  links: LinksSection,
  'blog-image': BlogImageSection,
  'game-showcase': GameShowcaseSection,
  'feedback-form': FeedbackFormSection,
} as const;

function HeadingSection({ content, level = 2 }: BlogPostSection) {
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

  if (level === 1) {
    return (
      <h1 className={headingClasses[1]} id={id}>
        {content}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h2 className={headingClasses[2]} id={id}>
        {content}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3 className={headingClasses[3]} id={id}>
        {content}
      </h3>
    );
  }
  if (level === 4) {
    return (
      <h4 className={headingClasses[4]} id={id}>
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

function LinksSection({ links }: BlogPostSection) {
  if (!links || links.length === 0) return null;

  const getIconForType = (type: 'github' | 'demo' | 'external') => {
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

function GameShowcaseSection({
  src,
  alt,
  caption,
  content,
  links,
  subtitle,
  tags,
}: BlogPostSection & { subtitle?: string; tags?: string[] }) {
  if (!src || !alt || !content) return null;

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

  // Filter and organize links
  const githubLink = links?.find((link) => link.type === 'github');
  const demoLink = links?.find(
    (link) => link.type === 'demo' && !link.text.toLowerCase().includes('original'),
  );

  return (
    <div className="my-12" role="group" aria-label="Game showcase">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Smaller Image and Caption */}
        <div className="space-y-4">
          <div className="relative rounded-lg overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] p-4 shadow-lg border border-[var(--color-line)] dark:border-transparent dark:bg-none dark:p-0 max-w-md">
            <img
              src={src}
              alt={alt}
              className="w-full h-auto rounded-lg dark:shadow-lg"
              loading="lazy"
            />
          </div>
          {caption && (
            <p
              className={`text-[var(--color-muted)] ${TYPOGRAPHY.TEXT_SMALL} leading-relaxed italic font-medium text-left`}
            >
              {caption}
            </p>
          )}
        </div>

        {/* Right Column - Content and Buttons */}
        <div className="space-y-4 flex flex-col h-full">
          {/* Subtitle and Tags */}
          <div className="space-y-3">
            {subtitle && (
              <h3 className="text-xl sm:text-2xl font-semibold text-[var(--color-text)] leading-tight">
                {subtitle}
              </h3>
            )}

            {/* Tags - Under subtitle */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Tag key={tag} variant="secondary" size="xs" className="shadow-sm">
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          <p className={`${BLOG_PARAGRAPH_CLASSES}`}>{content}</p>

          {/* Buttons - Bottom Right Aligned */}
          <div className="flex-1 flex items-end justify-end">
            <div className="flex gap-3">
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
              {demoLink && (
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
  // Find where to insert table of contents - after intro content (paragraph, image, links)
  let insertTocAfterIndex = -1;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    // Include intro paragraph, image, and links in the intro area
    if (section.type === 'links') {
      insertTocAfterIndex = i;
      break;
    }
    // Fallback: if we find a separator or heading after image, insert before it
    if (i > 0 && (section.type === 'separator' || section.type === 'heading')) {
      insertTocAfterIndex = i - 1;
      break;
    }
  }

  const shouldShowToc = tableOfContents && insertTocAfterIndex !== -1;
  const introSections = shouldShowToc ? sections.slice(0, insertTocAfterIndex + 1) : [];
  const mainSections = shouldShowToc ? sections.slice(insertTocAfterIndex + 1) : sections;

  return (
    <>
      {/* Intro sections (full width) */}
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
                {...(section.type === 'game-showcase'
                  ? { subtitle: metadata?.subtitle, tags: metadata?.tags }
                  : {})}
              />
            );
          })}
        </article>
      )}

      {/* Main content with sidebar layout */}
      <div
        className={
          shouldShowToc
            ? 'grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-12 max-w-7xl mx-auto'
            : ''
        }
      >
        {/* Table of Contents Sidebar */}
        {shouldShowToc && <div className="lg:block">{tableOfContents}</div>}

        {/* Main Content */}
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

              const sectionIndex = shouldShowToc ? insertTocAfterIndex + 1 + index : index;
              const stableKey = section.content
                ? `${section.type}-${section.content.slice(0, 20).replace(/[^a-z0-9]/gi, '')}-${sectionIndex}`
                : `${section.type}-${sectionIndex}`;

              return (
                <SectionComponent
                  key={stableKey}
                  {...section}
                  {...(section.type === 'game-showcase'
                    ? { subtitle: metadata?.subtitle, tags: metadata?.tags }
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
