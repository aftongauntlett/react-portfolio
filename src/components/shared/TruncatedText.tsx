import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import clsx from 'clsx';

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  showButton?: boolean;
}

// Function to truncate text at word boundaries
function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // If we can find a word boundary, use it. Otherwise, use the max length.
  return lastSpaceIndex > 0 ? truncated.slice(0, lastSpaceIndex) : truncated;
}

export default function TruncatedText({
  text,
  maxLength = 200,
  className = '',
  showButton = true,
}: TruncatedTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldTruncate = text.length > maxLength;

  if (!shouldTruncate) {
    return <p className={className}>{text}</p>;
  }

  const truncatedText = truncateAtWord(text, maxLength);

  return (
    <div className="space-y-2">
      <p className={className}>
        {isExpanded ? text : truncatedText}
        {!isExpanded && <span className="text-[var(--color-muted)]">...</span>}
      </p>

      {showButton && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className={clsx(
            'inline-flex items-center gap-1 text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80',
            'transition-colors duration-200 font-medium',
          )}
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Show less text' : 'Show more text'}
        >
          {isExpanded ? 'Show Less' : 'Read More'}
          {isExpanded ? <FaChevronUp className="w-3 h-3" /> : <FaChevronDown className="w-3 h-3" />}
        </button>
      )}
    </div>
  );
}
