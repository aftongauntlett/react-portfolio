import { games } from '@/data/games';
import ExternalPageLayout from '@/components/layout/ExternalPageLayout';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import GameCard from '@/components/games/GameCard';

export default function Games() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  console.log('Games page rendering, total games:', games.length);

  return (
    <ExternalPageLayout
      title="Games & Interactive Projects"
      description="Exploring game mechanics, interactive design, and creative coding through playful experimentation."
    >
      {/* All Games */}
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game, idx) => (
            <GameCard
              key={game.id}
              game={game}
              isDimmed={isDimmed(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={clearHovered}
            />
          ))}
        </div>
      </div>
    </ExternalPageLayout>
  );
}
