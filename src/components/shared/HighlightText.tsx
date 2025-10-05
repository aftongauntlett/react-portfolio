interface HighlightTextProps {
  text: string;
  searchQuery: string;
  className?: string;
}

export default function HighlightText({ text, searchQuery, className = '' }: HighlightTextProps) {
  if (!searchQuery.trim()) {
    return <span className={className}>{text}</span>;
  }

  // Escape special regex characters in search query
  const escapedQuery = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Create regex for case-insensitive matching
  const regex = new RegExp(`(${escapedQuery})`, 'gi');

  // Split text by matches
  const parts = text.split(regex);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part matches the search query
        const isMatch = regex.test(part);
        regex.lastIndex = 0; // Reset regex for next iteration

        return isMatch ? (
          <mark key={index} className="text-[var(--color-primary)] font-medium bg-transparent">
            {part}
          </mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
}
