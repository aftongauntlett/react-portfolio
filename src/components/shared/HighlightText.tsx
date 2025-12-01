interface HighlightTextProps {
  text: string;
  searchQuery: string;
  className?: string;
}

export default function HighlightText({ text, searchQuery, className = '' }: HighlightTextProps) {
  if (!searchQuery.trim()) {
    return <span className={className}>{text}</span>;
  }

  // Build parts array using indexOf to avoid stateful regex
  const parts: Array<{ text: string; isMatch: boolean }> = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = searchQuery.toLowerCase();
  let currentIndex = 0;

  while (currentIndex < text.length) {
    const matchIndex = lowerText.indexOf(lowerQuery, currentIndex);

    if (matchIndex === -1) {
      // No more matches, add remaining text
      parts.push({
        text: text.slice(currentIndex),
        isMatch: false,
      });
      break;
    }

    // Add non-match segment before the match (if any)
    if (matchIndex > currentIndex) {
      parts.push({
        text: text.slice(currentIndex, matchIndex),
        isMatch: false,
      });
    }

    // Add match segment
    parts.push({
      text: text.slice(matchIndex, matchIndex + searchQuery.length),
      isMatch: true,
    });

    currentIndex = matchIndex + searchQuery.length;
  }

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.isMatch ? (
          <mark key={index} className="text-[var(--color-primary)] font-medium bg-transparent">
            {part.text}
          </mark>
        ) : (
          <span key={index}>{part.text}</span>
        ),
      )}
    </span>
  );
}
