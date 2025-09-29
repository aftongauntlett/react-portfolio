import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { FaBookOpen } from 'react-icons/fa';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import type { Game } from '@/data/games';

const iconMap = {
  demo: FaExternalLinkAlt,
  github: FaGithub,
  blog: FaBookOpen,
};

interface GameCardProps {
  game: Game;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function GameCard({ game, isDimmed, onMouseEnter, onMouseLeave }: GameCardProps) {
  // Separate blog links (primary click target) from other action links
  const blogLink = game.links.find((link) => link.type === 'blog');
  const nonBlogLinks = game.links.filter((link) => link.type !== 'blog');

  const handleClick = () => {
    if (blogLink) {
      if (blogLink.url.startsWith('/')) {
        window.open(blogLink.url, '_blank');
      } else {
        window.open(blogLink.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <div
      className={`transition-opacity ease-in-out h-full ${isDimmed ? 'opacity-50' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="h-full cursor-pointer"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`View ${game.title} details${blogLink ? ' (opens blog post)' : ''}`}
      >
        <Card
          title={game.title}
          subtitle={game.description}
          date=""
          isDimmed={isDimmed}
          className="h-full flex flex-col cursor-pointer"
        >
          {/* Visual indicator that this opens external content */}
          <div className="flex justify-end mb-2">
            <FaExternalLinkAlt className="w-4 h-4 text-[var(--color-muted)]" aria-hidden="true" />
          </div>

          {/* Game screenshot with proper aspect ratio */}
          <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-[var(--color-muted)]/10">
            <img src={game.image} alt={game.imageAlt} className="w-full h-full object-cover" />
          </div>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {game.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Secondary action buttons (demo, github) aligned to bottom-right */}
          <div className="flex flex-wrap gap-3 justify-end mt-auto">
            {nonBlogLinks.map((link, index) => {
              const IconComponent = iconMap[link.type];
              const isInternal = link.url.startsWith('/');

              if (isInternal) {
                return (
                  <Link key={index} to={link.url} onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline">
                      <IconComponent className="w-4 h-4 mr-2" />
                      {link.text}
                    </Button>
                  </Link>
                );
              }

              return (
                <Button
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  onClick={(e) => e.stopPropagation()}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {link.text}
                </Button>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
