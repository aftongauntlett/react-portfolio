import clsx from 'clsx';
import { LinkButton } from '@/components/shared/LinkButton';
import { Button } from '@/components/shared/Button';
import HighlightText from '@/components/shared/HighlightText';
import TruncatedText from '@/components/shared/TruncatedText';
import BlogMetaInfo from '@/components/shared/BlogMetaInfo';
import Tag from '@/components/shared/Tag';
import { formatDate } from '@/utils/dateFormatter';
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
  // Get the corresponding blog post
  const blogPost = blogPosts.find((p) => p.metadata.slug === game.blogSlug);

  // Extract game title and competition info
  const titleParts = game.title.split(' - ');
  const competitionInfo = titleParts[0]; // "JS13k 2025 Official Submission"
  const gameTitle = titleParts[1] || game.title; // "Nyx Felis & Lampyrus"

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
                  <Tag key={tag} variant="secondary">
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            {/* Game Description */}
            <div className={clsx('space-y-3', 'leading-relaxed')}>
              <p className={TEXT_COMBINATIONS.BODY_RELAXED}>{game.description}</p>
            </div>

            {/* Action Buttons - Bottom Right Above Divider */}
            <div className="flex justify-end gap-3 pt-2">
              {game.links.find((link) => link.type === 'github') && (
                <LinkButton
                  type="github"
                  href={game.links.find((link) => link.type === 'github')!.url}
                  variant="outline"
                  className="text-sm"
                >
                  Source
                </LinkButton>
              )}
              {game.links.find((link) => link.type === 'demo') && (
                <LinkButton
                  type="demo"
                  href={game.links.find((link) => link.type === 'demo')!.url}
                  variant="solid"
                  className="text-sm"
                >
                  Play
                </LinkButton>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--color-line)] my-6"></div>

        {/* Post-Mortem Section - Separated */}
        {blogPost && (
          <div>
            <h4
              className={clsx(
                TYPOGRAPHY.TEXT_LARGE,
                'font-semibold mb-2 text-[var(--color-text)] uppercase tracking-wide',
              )}
            >
              Development Post-Mortem
            </h4>

            <BlogMetaInfo
              publishDate={formatDate(blogPost.metadata.publishDate)}
              author={blogPost.metadata.author}
              readTime={blogPost.metadata.readTime}
              dateTime={blogPost.metadata.publishDate}
              className="mb-4 text-[var(--color-muted)]"
            />

            <TruncatedText
              text={blogPost.metadata.description}
              maxLength={180}
              className={clsx(TEXT_COMBINATIONS.BODY_RELAXED, 'leading-relaxed mb-4')}
            />

            <div className="flex justify-end">
              <Button
                href={`/blog/${blogPost.metadata.slug}`}
                variant="outline"
                className="text-sm"
                aria-label={`Read ${gameTitle} post-mortem`}
              >
                Read Post-Mortem
              </Button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
