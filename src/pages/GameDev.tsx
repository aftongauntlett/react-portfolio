import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { blogPosts } from '@/data/blog/posts';
import { games } from '@/data/games';
import ExternalPageLayout from '@/components/layout/ExternalPageLayout';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { useSimpleBlogFilter } from '@/hooks/useSimpleBlogFilter';
import SimpleBlogFilter from '@/components/blog/SimpleBlogFilter';
import UnifiedGameCard from '@/components/blog/UnifiedGameCard';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import clsx from 'clsx';
import BlogEntryCard from '@/components/blog/BlogEntryCard';

type ViewMode = 'games' | 'blog';

export default function GameDev() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  // Determine view mode based on URL
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    return location.pathname === '/blog' ? 'blog' : 'games';
  });

  const { searchTerm, setSearchTerm, sortBy, setSortBy } = useSimpleBlogFilter(blogPosts);

  // Update view mode when URL changes
  useEffect(() => {
    const newMode: ViewMode = location.pathname === '/blog' ? 'blog' : 'games';
    setViewMode(newMode);
  }, [location.pathname]);

  // Handle tab change
  const handleTabChange = (newMode: ViewMode) => {
    const newPath = newMode === 'blog' ? '/blog' : '/gamedev';
    navigate(newPath);
  };

  // Filter and sort games
  const filteredGames = games
    .filter((game) => {
      const matchesSearch =
        searchTerm === '' ||
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    })
    .sort((a, b) => {
      const blogPostA = blogPosts.find((post) => post.metadata.slug === a.blogSlug);
      const blogPostB = blogPosts.find((post) => post.metadata.slug === b.blogSlug);

      if (!blogPostA || !blogPostB) return 0;

      const dateA = new Date(blogPostA.metadata.publishDate);
      const dateB = new Date(blogPostB.metadata.publishDate);

      switch (sortBy) {
        case 'newest':
          return dateB.getTime() - dateA.getTime();
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

  // Filter and sort blog posts
  const filteredBlogPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        searchTerm === '' ||
        post.metadata.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metadata.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.metadata.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.metadata.publishDate);
      const dateB = new Date(b.metadata.publishDate);

      switch (sortBy) {
        case 'newest':
          return dateB.getTime() - dateA.getTime();
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'title':
          return a.metadata.title.localeCompare(b.metadata.title);
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });

  const totalResults = viewMode === 'games' ? filteredGames.length : filteredBlogPosts.length;
  const selectedTags = viewMode === 'games' ? ['Games'] : ['Blog'];
  const availableTags = ['Games', 'Blog'];

  return (
    <ExternalPageLayout
      title={viewMode === 'games' ? 'Game Development' : 'Dev Blog'}
      description={
        viewMode === 'games'
          ? 'Interactive games and development insights. Features playable JS13k competition entries with detailed post-mortems covering game design, physics simulation, creative coding under constraints, and lessons learned.'
          : 'Development insights and technical articles. Deep dives into game development processes, programming challenges, creative problem-solving, and lessons learned from building interactive experiences.'
      }
    >
      <div>
        {/* Search and Filter */}
        <SimpleBlogFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedTags}
          onTagToggle={(tag) => {
            const newMode = tag === 'Blog' ? 'blog' : 'games';
            handleTabChange(newMode);
          }}
          availableTags={availableTags}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={totalResults}
        />

        {/* Content */}
        <div className="space-y-8">
          {viewMode === 'games' ? (
            /* Games Section */
            filteredGames.length > 0 ? (
              filteredGames.map((game, idx) => (
                <UnifiedGameCard
                  key={game.id}
                  game={game}
                  searchTerm={searchTerm}
                  isDimmed={isDimmed(idx)}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={clearHovered}
                />
              ))
            ) : (
              <div className="text-center py-16">
                <div className="p-8 bg-[var(--color-muted)]/5 border border-[var(--color-line)] rounded-lg">
                  <h3 className={clsx(TYPOGRAPHY.TEXT_LARGE, 'font-semibold mb-2')}>
                    No games found
                  </h3>
                  <p className={clsx(TEXT_COMBINATIONS.BODY_MUTED)}>
                    Try adjusting your search terms
                  </p>
                </div>
              </div>
            )
          ) : /* Blog Section */
          filteredBlogPosts.length > 0 ? (
            filteredBlogPosts.map((post, idx) => (
              <BlogEntryCard
                key={post.metadata.slug}
                post={post}
                searchTerm={searchTerm}
                isDimmed={isDimmed(idx)}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={clearHovered}
              />
            ))
          ) : (
            <div className="text-center py-16">
              <div className="p-8 bg-[var(--color-muted)]/5 border border-[var(--color-line)] rounded-lg">
                <h3 className={clsx(TYPOGRAPHY.TEXT_LARGE, 'font-semibold mb-2')}>
                  No blog posts found
                </h3>
                <p className={clsx(TEXT_COMBINATIONS.BODY_MUTED)}>
                  Try adjusting your search terms
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Coming Soon Section for Games */}
        {viewMode === 'games' && (
          <div className="mt-16 text-center">
            <div className="p-8 bg-[var(--color-muted)]/5 border border-[var(--color-line)] rounded-lg">
              <h3 className={clsx(TYPOGRAPHY.TEXT_LARGE, 'font-semibold mb-2')}>
                More Games Coming Soon
              </h3>
              <p className={clsx(TEXT_COMBINATIONS.BODY_MUTED)}>
                Currently working on new game projects and will be adding them here with detailed
                post-mortems covering development insights, creative challenges, and technical
                solutions.
              </p>
            </div>
          </div>
        )}
      </div>
    </ExternalPageLayout>
  );
}
