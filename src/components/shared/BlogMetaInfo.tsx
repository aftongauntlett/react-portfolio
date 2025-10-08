import { FaCalendar, FaClock } from 'react-icons/fa';
import clsx from 'clsx';

interface BlogMetaInfoProps {
  publishDate: string;
  author?: string;
  readTime?: string;
  className?: string;
  dateTime?: string;
  showIcons?: boolean;
}

// Helper to format date as short format (9/17/25)
function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${day}/${year}`;
}

// Helper to get author short name (First name + Last initial)
function getShortName(name: string): string {
  const parts = name.split(' ');
  if (parts.length < 2) return name;
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

// Helper to extract just the number from read time and add "min" (e.g., "7 min read" -> "7 min")
function getReadTimeShort(readTime: string): string {
  const match = readTime.match(/\d+/);
  return match ? `${match[0]} min` : readTime;
}

export default function BlogMetaInfo({
  publishDate,
  author,
  readTime,
  className = '',
  dateTime,
  showIcons = true,
}: BlogMetaInfoProps) {
  const shortDate = dateTime ? formatShortDate(dateTime) : formatShortDate(publishDate);
  const authorShortName = author ? getShortName(author) : '';
  const readTimeShort = readTime ? getReadTimeShort(readTime) : '';

  return (
    <div
      className={clsx('flex items-center gap-4 text-sm text-[var(--color-text-muted)]', className)}
    >
      {/* Date */}
      <div className="flex items-center gap-2">
        {showIcons && <FaCalendar className="w-3 h-3" />}
        <time dateTime={dateTime || publishDate}>
          {/* Show short date on mobile, full date on desktop */}
          <span className="sm:hidden">{shortDate}</span>
          <span className="hidden sm:inline">{publishDate}</span>
        </time>
      </div>

      {/* Author */}
      {author && (
        <>
          <span>•</span>
          <div className="flex items-center gap-2">
            {/* Show "First L." on mobile, full name on desktop */}
            <span className="sm:hidden">{authorShortName}</span>
            <span className="hidden sm:inline">{author}</span>
          </div>
        </>
      )}

      {/* Read Time */}
      {readTime && (
        <>
          <span>•</span>
          <div className="flex items-center gap-2">
            {showIcons && <FaClock className="w-3 h-3" />}
            {/* Show "7 min" on mobile, full text on desktop */}
            <span className="sm:hidden">{readTimeShort}</span>
            <span className="hidden sm:inline">{readTime}</span>
          </div>
        </>
      )}
    </div>
  );
}
