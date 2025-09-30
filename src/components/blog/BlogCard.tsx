import { FaCalendar, FaClock, FaArrowRight, FaGithub, FaPlay } from 'react-icons/fa';
import clsx from 'clsx';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import HighlightText from '@/components/shared/HighlightText';
import { formatDate } from '@/utils/dateFormatter';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import type { BlogPost } from '@/data/blog/types';
import type { Game } from '@/data/games';
import { blogPosts } from '@/data/blog/posts';

interface BlogCardProps {
  post?: BlogPost;
  game?: Game;
  searchTerm?: string;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function BlogCard({
  post,
  game,
  searchTerm = '',
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: BlogCardProps) {
  // Determine if this is a blog post or game
  const isGame = !!game;
  const isBlog = !!post;

  if (!isGame && !isBlog) {
    return null;
  }

  // For games, get the corresponding blog post data
  const gamePost = isGame ? blogPosts.find((p) => p.metadata.slug === game.blogSlug) : null;

  // Extract common data
  const title = isGame ? game.title : post!.metadata.title;
  const description = isGame ? game.description : post!.metadata.description;
  const publishDate = isGame ? gamePost!.metadata.publishDate : post!.metadata.publishDate;
  const date = formatDate(publishDate);
  const readTime = isGame ? gamePost!.metadata.readTime : post!.metadata.readTime;
  const tags = isGame ? game.tags : post!.metadata.tags || [];
  const categories = isGame ? [] : post!.metadata.categories || [];

  return (
    <article
      className={`transition-opacity ease-in-out ${isDimmed ? 'opacity-50' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card
        title={
          <h2 className={clsx(TYPOGRAPHY.HEADING_2)}>
            <HighlightText text={title} searchQuery={searchTerm} />
          </h2>
        }
        subtitle={<HighlightText text={description} searchQuery={searchTerm} />}
        date=""
        isDimmed={isDimmed}
        className="h-full"
      >
        {/* Metadata: date and reading time OR completion date */}
        <div className={clsx('flex items-center gap-6 mb-4', TEXT_COMBINATIONS.SMALL_MUTED)}>
          <div className="flex items-center gap-2">
            <FaCalendar className="w-3 h-3" />
            <time dateTime={publishDate}>{date}</time>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>

        {/* Tags and action buttons */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {/* Show categories for blog posts */}
            {categories.slice(0, 2).map((category: string) => (
              <span
                key={category}
                className={clsx(
                  'px-3 py-1 rounded border font-medium',
                  'bg-[var(--color-primary)]/10 border-[var(--color-primary)]/20',
                  TYPOGRAPHY.TEXT_SMALL,
                  'text-[var(--color-primary)]',
                )}
              >
                {category}
              </span>
            ))}
            {/* Show tags (for both blog and games) */}
            {tags.slice(0, 2).map((tag: string) => (
              <span
                key={tag}
                className={clsx(
                  'px-3 py-1 rounded border',
                  'bg-[var(--color-secondary)]/10 border-[var(--color-secondary)]/20',
                  TYPOGRAPHY.TEXT_SMALL,
                  'text-[var(--color-secondary)]',
                )}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Different buttons based on content type */}
          <div className="flex gap-2">
            {isGame ? (
              <>
                {/* GitHub button (first) */}
                {game.links.find((link) => link.type === 'github') && (
                  <Button
                    variant="outline"
                    color="primary"
                    href={game.links.find((link) => link.type === 'github')?.url}
                    aria-label={`View ${game.title} source code`}
                  >
                    <FaGithub className="w-4 h-4" />
                  </Button>
                )}
                {/* Play Game button (second) */}
                {game.links.find((link) => link.type === 'demo') && (
                  <Button
                    variant="solid"
                    color="secondary"
                    href={game.links.find((link) => link.type === 'demo')?.url}
                    aria-label={`Play ${game.title}`}
                  >
                    <FaPlay className="w-3 h-3" />
                    Play Game
                  </Button>
                )}
                {/* Post-Mortem button (third) */}
                <Button
                  variant="outline"
                  color="primary"
                  href={`/blog/${game.blogSlug}`}
                  aria-label={`Read ${game.title} post-mortem`}
                >
                  Post-Mortem
                  <FaArrowRight className="w-3 h-3" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                color="primary"
                href={`/blog/${post!.metadata.slug}`}
                aria-label={`Read ${post!.metadata.title}`}
              >
                Read More
                <FaArrowRight className="w-3 h-3" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </article>
  );
}
