import clsx from 'clsx';
import Card from '@/components/shared/Card';
import { LinkButton } from '@/components/shared/LinkButton';
import Tag from '@/components/shared/Tag';
import HighlightText from '@/components/shared/HighlightText';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import type { Game } from '@/data/games';

interface DetailedGameCardProps {
  game: Game;
  searchTerm?: string;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DetailedGameCard({
  game,
  searchTerm = '',
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: DetailedGameCardProps) {
  return (
    <article
      className={`transition-opacity ease-in-out ${isDimmed ? 'opacity-50' : ''} group`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card
        title={
          <h2
            className={clsx(
              TYPOGRAPHY.HEADING_2,
              'group-hover:text-[var(--color-primary)] transition-colors duration-300',
            )}
          >
            <HighlightText text={game.title} searchQuery={searchTerm} />
          </h2>
        }
        subtitle=""
        date=""
        isDimmed={isDimmed}
        className="h-full group-hover:border-[var(--color-primary)]/30 transition-colors duration-300"
        ariaLabel={`${game.title} - ${game.description}`}
      >
        {/* Game Screenshot */}
        <div className="mb-6">
          <div className="aspect-video max-w-md mx-auto rounded-lg overflow-hidden bg-[var(--color-muted)]/10 border border-[var(--color-line)] group-hover:border-[var(--color-primary)]/30 transition-colors duration-300">
            <img src={game.image} alt={game.imageAlt} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Game Description with Post-Mortem Link */}
        <div className="mb-6">
          <p
            className={clsx(
              TEXT_COMBINATIONS.BODY_RELAXED,
              'mb-4 group-hover:text-[var(--color-text)] transition-colors duration-300',
            )}
          >
            <HighlightText text={game.description} searchQuery={searchTerm} />
          </p>
          <p
            className={clsx(
              TEXT_COMBINATIONS.SMALL_MUTED,
              'group-hover:text-[var(--color-text)] transition-colors duration-300',
            )}
          >
            Read the{' '}
            <a
              href={`/blog/${game.blogSlug}`}
              className="text-[var(--color-primary)] hover:text-[var(--color-secondary)] underline font-medium group-hover:text-[var(--color-secondary)] transition-colors duration-300"
            >
              development post-mortem
            </a>{' '}
            for technical insights and lessons learned.
          </p>
        </div>

        {/* Technology tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {game.tags.map((tag: string) => (
            <Tag key={tag} variant="secondary" size="small">
              {tag}
            </Tag>
          ))}
        </div>

        {/* Game Status Badge */}
        <div className="mb-6">
          <Tag variant={game.status === 'complete' ? 'primary' : 'muted'} size="small">
            {game.status === 'complete' ? 'Complete' : 'In Progress'}
          </Tag>
        </div>

        {/* Action buttons - Only GitHub and Play */}
        <div className="flex gap-3 justify-end">
          {/* GitHub button */}
          {game.links.find((link) => link.type === 'github') && (
            <LinkButton
              type="github"
              variant="outline"
              color="primary"
              href={game.links.find((link) => link.type === 'github')!.url}
              className="group-hover:border-[var(--color-primary)] transition-colors duration-300"
            >
              Source
            </LinkButton>
          )}

          {/* Play Game button */}
          {game.links.find((link) => link.type === 'demo') && (
            <LinkButton
              type="demo"
              variant="solid"
              color="secondary"
              href={game.links.find((link) => link.type === 'demo')!.url}
              className="group-hover:shadow-lg transition-shadow duration-300"
            >
              Play Game
            </LinkButton>
          )}
        </div>
      </Card>
    </article>
  );
}
