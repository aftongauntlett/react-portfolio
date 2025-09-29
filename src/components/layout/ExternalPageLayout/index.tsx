import type { ReactNode } from 'react';
import Footer from '@/components/shared/Footer';
import ExternalNav from '@/components/layout/ExternalNav';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { formatDate } from '@/utils/dateFormatter';

interface ExternalPageLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
  // Optional metadata for blog posts
  metadata?: {
    author?: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
  };
}

export default function ExternalPageLayout({
  title,
  description,
  children,
  metadata,
}: ExternalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Simple, consistent navigation */}
      <ExternalNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-[var(--color-text)] leading-tight">
            {title}
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-6">
              {description}
            </p>
          </div>

          {/* Blog Post Metadata */}
          {metadata && (
            <div className="max-w-3xl mx-auto mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 text-sm text-[var(--color-muted)] mb-4 pb-4 border-b border-[var(--color-line)]">
                {metadata.author && <div className="font-medium">By {metadata.author}</div>}
                {metadata.publishDate && (
                  <div className="flex items-center gap-2">
                    <FaCalendar className="w-3 h-3" />
                    <time dateTime={metadata.publishDate}>{formatDate(metadata.publishDate)}</time>
                  </div>
                )}
                {metadata.readTime && (
                  <div className="flex items-center gap-2">
                    <FaClock className="w-3 h-3" />
                    <span>{metadata.readTime}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] border border-[var(--color-secondary)]/20 rounded-md shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <main role="main" aria-label="Main content">
          {children}
        </main>

        {/* Simple Footer */}
        <Footer scrollTarget="top" />
      </div>
    </div>
  );
}
