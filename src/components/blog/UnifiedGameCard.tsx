import { useState } from 'react';
import { FaGithub, FaPlay, FaCalendar, FaClock, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import clsx from 'clsx';
import { Button } from '@/components/shared/Button';
import HighlightText from '@/components/shared/HighlightText';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import type { Game } from '@/data/games';
import { blogPosts } from '@/data/blog/posts';

interface UnifiedGameCardProps {
  game: Game;
  searchTerm?: string;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function UnifiedGameCard({
  game,
  searchTerm = '',
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: UnifiedGameCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Get the corresponding blog post
  const blogPost = blogPosts.find((p) => p.metadata.slug === game.blogSlug);

  // Extract game title and competition info
  const titleParts = game.title.split(' - ');
  const competitionInfo = titleParts[0]; // "JS13k 2025 Official Submission"
  const gameTitle = titleParts[1] || game.title; // "Nyx Felis & Lampyrus"

  // Truncate description for preview
  const shortDescription = game.description.slice(0, 200);
  const hasLongDescription = game.description.length > 200;

  return (
    <article
      className={`transition-opacity duration-300 ease-in-out ${isDimmed ? 'opacity-50' : ''} group`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative p-6 rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] group-hover:border-[var(--color-primary)]/30">
        {/* Status Circle - Top Right */}
        <div className="absolute top-4 right-4">
          <div
            className={clsx(
              'w-3 h-3 rounded-full',
              game.status === 'complete'
                ? 'bg-green-500 shadow-green-500/20'
                : 'bg-yellow-500 shadow-yellow-500/20',
              'shadow-lg animate-pulse',
            )}
            title={game.status === 'complete' ? 'Production' : 'Development'}
          />
        </div>
        {/* Main Layout Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Game Screenshot */}
          <div className="md:col-span-1">
            <div className="aspect-square w-full max-w-xs mx-auto md:mx-0 md:max-w-none rounded-lg overflow-hidden bg-[var(--color-muted)]/10 border border-[var(--color-line)]">
              <img src={game.image} alt={game.imageAlt} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right Column - Game Info */}
          <div className="md:col-span-2 space-y-4">
            {/* Competition Badge & Title */}
            <div>
              <div className={clsx(TEXT_COMBINATIONS.SMALL_MUTED, 'mb-2')}>{competitionInfo}</div>
              <h2
                className={clsx(
                  TYPOGRAPHY.HEADING_2,
                  'group-hover:text-[var(--color-primary)] transition-colors duration-300',
                )}
              >
                <HighlightText text={gameTitle} searchQuery={searchTerm} />
              </h2>

              {/* Tech Stack Tags - Under Title */}
              <div className="flex flex-wrap gap-2 mt-3">
                {game.tags.map((tag: string) => (
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
            </div>

            {/* Game Description with Read More */}
            <div className={clsx('space-y-3', TEXT_COMBINATIONS.BODY_RELAXED, 'leading-relaxed')}>
              <p>
                {showFullDescription ? game.description : shortDescription}
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

            {/* Action Buttons - Bottom Right Above Divider */}
            <div className="flex justify-end gap-3 pt-2">
              {game.links.find((link) => link.type === 'github') && (
                <Button
                  href={game.links.find((link) => link.type === 'github')?.url}
                  variant="outline"
                  className="text-sm"
                  aria-label={`View source code for ${gameTitle}`}
                >
                  <FaGithub className="w-3 h-3" />
                  Source
                </Button>
              )}
              {game.links.find((link) => link.type === 'demo') && (
                <Button
                  href={game.links.find((link) => link.type === 'demo')?.url}
                  variant="solid"
                  className="text-sm"
                  aria-label={`Play ${gameTitle}`}
                >
                  <FaPlay className="w-3 h-3" />
                  Play
                </Button>
              )}
            </div>
          </div>
        </div>
        {/* Post-Mortem Preview */}
        {blogPost && (
          <div className="border-t border-[var(--color-line)] pt-6">
            <div className="flex flex-col">
              {/* Post-mortem header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div
                    className={clsx(
                      TEXT_COMBINATIONS.SMALL_MUTED,
                      'uppercase font-semibold text-[var(--color-primary)] mb-2',
                    )}
                  >
                    Development Post-Mortem
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <FaCalendar className="w-3 h-3" />
                    <span>{blogPost.metadata.publishDate}</span>
                    <span>•</span>
                    <FaClock className="w-3 h-3" />
                    <span>{blogPost.metadata.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Post-mortem content */}
              <p className={clsx(TEXT_COMBINATIONS.BODY_MUTED, 'text-sm mb-4')}>
                {blogPost.metadata.description}
              </p>

              {/* Read Post-Mortem Button - Bottom Right */}
              <div className="flex justify-end">
                <Button
                  href={`/blog/${blogPost.metadata.slug}`}
                  variant="outline"
                  className="text-sm"
                >
                  Read Post-Mortem
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
