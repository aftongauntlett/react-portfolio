import { useState, useMemo } from 'react';
import type { BlogPost } from '@/data/blog/types';

interface UseSimpleBlogFilterResult {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  filteredPosts: BlogPost[];
  availableTags: string[];
}

export function useSimpleBlogFilter(posts: BlogPost[]): UseSimpleBlogFilterResult {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');

  // Only use the specific categories you want - ignore tags for filtering
  const availableTags = useMemo(() => {
    const allowedCategories = [
      'Game Development',
      'Web Development',
      'Tech Insights',
      'Post Mortem',
      'Career',
    ];
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.metadata.categories?.forEach((category) => {
        if (allowedCategories.includes(category)) {
          tagSet.add(category);
        }
      });
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.metadata.title.toLowerCase().includes(searchLower) ||
          post.metadata.description.toLowerCase().includes(searchLower) ||
          post.metadata.tags?.some((tag) => tag.toLowerCase().includes(searchLower)) ||
          post.metadata.categories?.some((cat) => cat.toLowerCase().includes(searchLower)),
      );
    }

    // Apply category filters (only use categories, not tags)
    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) => {
        const postCategories = post.metadata.categories || [];
        return selectedTags.some((selectedTag) => postCategories.includes(selectedTag));
      });
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return (
            new Date(a.metadata.publishDate).getTime() - new Date(b.metadata.publishDate).getTime()
          );
        case 'title':
          return a.metadata.title.localeCompare(b.metadata.title);
        case 'newest':
        default:
          return (
            new Date(b.metadata.publishDate).getTime() - new Date(a.metadata.publishDate).getTime()
          );
      }
    });

    return sorted;
  }, [posts, searchTerm, selectedTags, sortBy]);

  return {
    searchTerm,
    setSearchTerm,
    selectedTags,
    toggleTag,
    sortBy,
    setSortBy,
    filteredPosts,
    availableTags,
  };
}
