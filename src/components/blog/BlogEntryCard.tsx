import clsx from 'clsx';
import { Button } from '@/components/shared/Button';
import HighlightText from '@/components/shared/HighlightText';
import TruncatedText from '@/components/shared/TruncatedText';
import BlogMetaInfo from '@/components/shared/BlogMetaInfo';
import Tag from '@/components/shared/Tag';
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
        <div>
          {/* Post Title */}
          <h2
            className={clsx(
              TYPOGRAPHY.HEADING_2,
              'group-hover:text-[var(--color-primary)] transition-colors duration-300 mb-2',
            )}
          >
            <HighlightText text={post.metadata.title} searchQuery={searchTerm} />
          </h2>

          {/* Meta Information */}
          <BlogMetaInfo
            publishDate={post.metadata.publishDate}
            author={post.metadata.author}
            readTime={post.metadata.readTime}
            className="mb-4"
          />

          {/* Tags */}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.metadata.tags.map((tag: string) => (
                <Tag key={tag} variant="secondary">
                  {tag}
                </Tag>
              ))}
            </div>
          )}

          {/* Post Description */}
          <div className="mb-6">
            <TruncatedText
              text={post.metadata.description}
              maxLength={180}
              className={clsx(TEXT_COMBINATIONS.BODY_RELAXED, 'leading-relaxed')}
              showButton={false}
            />
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
