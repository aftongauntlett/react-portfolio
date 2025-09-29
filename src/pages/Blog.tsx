import { blogPosts } from '@/data/blog/posts';
import ExternalPageLayout from '@/components/layout/ExternalPageLayout';
import { useHoverGroup } from '@/hooks/useHoverGroup';
import { useSimpleBlogFilter } from '@/hooks/useSimpleBlogFilter';
import SimpleBlogFilter from '@/components/blog/SimpleBlogFilter';
import BlogCard from '@/components/blog/BlogCard';

export default function Blog() {
  const { setHovered, clearHovered, isDimmed } = useHoverGroup();

  const {
    searchTerm,
    setSearchTerm,
    selectedTags,
    toggleTag,
    sortBy,
    setSortBy,
    filteredPosts,
    availableTags,
  } = useSimpleBlogFilter(blogPosts);

  console.log(
    'Blog page rendering, showing',
    filteredPosts.length,
    'of',
    blogPosts.length,
    'posts',
  );

  return (
    <ExternalPageLayout
      title="Technical Blog"
      description="Deep dives into development challenges, project retrospectives, and technical insights from real-world problem solving."
    >
      {/* Blog Posts */}
      <div className="max-w-4xl mx-auto">
        {/* Simplified Filter Controls */}
        <SimpleBlogFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedTags}
          onTagToggle={toggleTag}
          availableTags={availableTags}
          sortBy={sortBy}
          onSortChange={setSortBy}
          resultCount={filteredPosts.length}
        />

        <div className="space-y-8">
          {filteredPosts.map((post, idx) => (
            <BlogCard
              key={post.metadata.slug}
              post={post}
              searchTerm={searchTerm}
              isDimmed={isDimmed(idx)}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={clearHovered}
            />
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center">
          <div className="p-8 bg-[var(--color-muted)]/5 border border-[var(--color-line)] rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-[var(--color-text)]">
              More Posts Coming Soon
            </h3>
            <p className="text-[var(--color-muted)]">
              I'm working on more technical deep-dives and project retrospectives. Follow my journey
              as I explore new technologies and share insights from real-world development
              challenges.
            </p>
          </div>
        </div>
      </div>
    </ExternalPageLayout>
  );
}
