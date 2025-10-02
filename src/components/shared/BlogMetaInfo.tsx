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

export default function BlogMetaInfo({
  publishDate,
  author,
  readTime,
  className = '',
  dateTime,
  showIcons = true,
}: BlogMetaInfoProps) {
  return (
    <div
      className={clsx('flex items-center gap-4 text-sm text-[var(--color-text-muted)]', className)}
    >
      {/* Date */}
      <div className="flex items-center gap-2">
        {showIcons && <FaCalendar className="w-3 h-3" />}
        <time dateTime={dateTime || publishDate}>{publishDate}</time>
      </div>

      {/* Author */}
      {author && (
        <>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span>{author}</span>
          </div>
        </>
      )}

      {/* Read Time */}
      {readTime && (
        <>
          <span>•</span>
          <div className="flex items-center gap-2">
            {showIcons && <FaClock className="w-3 h-3" />}
            <span>{readTime}</span>
          </div>
        </>
      )}
    </div>
  );
}
