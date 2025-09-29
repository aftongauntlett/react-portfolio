import { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';

interface SimpleBlogFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  availableTags: string[];
  sortBy: string;
  onSortChange: (sort: string) => void;
  resultCount: number;
}

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title', label: 'Title A-Z' },
];

export default function SimpleBlogFilter({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagToggle,
  availableTags,
  sortBy,
  onSortChange,
  resultCount,
}: SimpleBlogFilterProps) {
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const currentSortLabel =
    sortOptions.find((option) => option.value === sortBy)?.label || 'Newest First';

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <label htmlFor="blog-search" className="sr-only">
          Search blog posts
        </label>
        <FaSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-muted)] w-4 h-4"
          aria-hidden="true"
        />
        <input
          id="blog-search"
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-[var(--color-background)] border border-[var(--color-line)] rounded-lg 
                   text-[var(--color-text)] placeholder-[var(--color-muted)]
                   focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]
                   transition-colors"
          aria-describedby="search-results-count"
        />
      </div>

      {/* Filter Pills and Sort Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tags">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                aria-pressed={isSelected}
                aria-label={`${isSelected ? 'Remove' : 'Add'} ${tag} filter`}
                className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-all ${
                  isSelected
                    ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-sm'
                    : 'bg-[var(--color-background)] text-[var(--color-muted)] border-[var(--color-line)] hover:border-[var(--color-primary)] hover:text-[var(--color-text)]'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            aria-expanded={showSortDropdown}
            aria-haspopup="listbox"
            aria-label="Sort posts"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--color-text)] 
                     bg-[var(--color-background)] border border-[var(--color-line)] rounded-lg
                     hover:border-[var(--color-primary)] transition-colors"
          >
            {currentSortLabel}
            <FaChevronDown
              className={`w-3 h-3 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {showSortDropdown && (
            <div
              className="absolute right-0 top-full mt-1 py-1 bg-[var(--color-background)] border border-[var(--color-line)] 
                          rounded-lg shadow-lg z-10 min-w-[140px]"
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onSortChange(option.value);
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-[var(--color-line)]/30 transition-colors ${
                    sortBy === option.value
                      ? 'text-[var(--color-primary)] font-medium'
                      : 'text-[var(--color-text)]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <p
        id="search-results-count"
        className="text-sm text-[var(--color-muted)]"
        role="status"
        aria-live="polite"
      >
        Showing {resultCount} {resultCount === 1 ? 'post' : 'posts'}
        {selectedTags.length > 0 && (
          <span> with {selectedTags.map((tag) => `"${tag}"`).join(', ')}</span>
        )}
        {searchTerm && <span> matching "{searchTerm}"</span>}
      </p>
    </div>
  );
}
