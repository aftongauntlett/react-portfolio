import { useState } from 'react';
import { FaCalendar, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import clsx from 'clsx';
import { Button } from '@/components/shared/Button';
import HighlightText from '@/components/shared/HighlightText';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import type { BlogPost } from '@/data/blog/types';

interface BlogEntryCardProps {
  post: BlogPost;
  searchTerm?: string;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function BlogEntryCard({
  post,
  searchTerm = '',
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: BlogEntryCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Truncate description for preview
  const shortDescription = post.metadata.description.slice(0, 200);
  const hasLongDescription = post.metadata.description.length > 200;

  return (
    <article
      className={`transition-opacity duration-300 ease-in-out ${isDimmed ? 'opacity-50' : ''} group`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative p-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] group-hover:border-[var(--color-primary)]/30">
        {/* Featured Badge - Top Right */}
        {post.metadata.featured && (
          <div className="absolute top-4 right-4">
            <div
              className={clsx(
                'w-3 h-3 rounded-full',
                'bg-[var(--color-primary)] shadow-[var(--color-primary)]/20',
                'shadow-lg animate-pulse',
              )}
              title="Featured Post"
            />
          </div>
        )}

        {/* Main Content Layout */}
        <div className="space-y-4">
          {/* Post Title and Meta */}
          <div>
            <h2
              className={clsx(
                TYPOGRAPHY.HEADING_2,
                'group-hover:text-[var(--color-primary)] transition-colors duration-300 mb-3',
              )}
            >
              <HighlightText text={post.metadata.title} searchQuery={searchTerm} />
            </h2>

            {/* Meta Information */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                <FaCalendar className="w-3 h-3" />
                <span>{post.metadata.publishDate}</span>
              </div>
              {post.metadata.readTime && (
                <>
                  <span className="text-[var(--color-text-muted)]">•</span>
                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                    <FaClock className="w-3 h-3" />
                    <span>{post.metadata.readTime}</span>
                  </div>
                </>
              )}
            </div>

            {/* Tags */}
            {post.metadata.tags && post.metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.metadata.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className={clsx(
                      'px-3 py-1 rounded border',
                      'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)]/20',
                      'group-hover:bg-[var(--color-secondary)]/15 group-hover:border-[var(--color-secondary)]/30',
                      TYPOGRAPHY.TEXT_SMALL,
                      'text-[var(--color-secondary)]',
                      'transition-colors duration-300',
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Post Description with Read More */}
          <div className={clsx('space-y-3', TEXT_COMBINATIONS.BODY_RELAXED, 'leading-relaxed')}>
            <p>
              <HighlightText
                text={showFullDescription ? post.metadata.description : shortDescription}
                searchQuery={searchTerm}
              />
              {hasLongDescription && !showFullDescription && (
                <span className="bg-gradient-to-r from-[var(--color-text-secondary)] to-transparent bg-clip-text text-transparent">
                  ...
                </span>
              )}
            </p>
            {hasLongDescription && (
              <button
                type="button"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className={clsx(
                  'inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80',
                  'transition-colors duration-200 font-medium',
                )}
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
                {showFullDescription ? (
                  <FaChevronUp className="w-3 h-3" />
                ) : (
                  <FaChevronDown className="w-3 h-3" />
                )}
              </button>
            )}
          </div>

          {/* Read Full Post Button - Bottom Right */}
          <div className="flex justify-end pt-2">
            <Button href={`/blog/${post.metadata.slug}`} variant="solid" className="text-sm">
              Read Full Post
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
