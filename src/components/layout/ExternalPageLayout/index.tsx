import type { ReactNode } from 'react';
import { lazy, Suspense } from 'react';
import ExternalFooter from '@/components/layout/ExternalFooter';
import ExternalNav from '@/components/layout/ExternalNav';
import { FaCalendar, FaClock } from 'react-icons/fa';
import { formatDate } from '@/utils/dateFormatter';

// Lazy load the starry background for performance
const StarryBackground = lazy(() => import('../../StarryBackground'));

interface ExternalPageLayoutProps {
  title: string | ReactNode;
  description: string;
  children: ReactNode;
  // Optional metadata for blog posts
  metadata?: {
    author?: string;
    publishDate?: string;
    readTime?: string;
    tags?: string[];
    subtitle?: string;
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
      {/* Starry background for consistency with main portfolio */}
      <Suspense fallback={null}>
        <StarryBackground />
      </Suspense>
      {/* Simple, consistent navigation */}
      <ExternalNav />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Left Aligned */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 text-[var(--color-text)] leading-tight">
            {title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed mb-6">
            {description}
          </p>

          {/* Blog Post Metadata */}
          {metadata && (
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 text-sm text-[var(--color-muted)] pb-4 border-b border-[var(--color-line)]">
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
            </div>
          )}
        </div>

        {/* Content */}
        <main role="main" aria-label="Main content">
          {children}
        </main>
      </div>

      {/* Full-width External Footer */}
      <ExternalFooter />
    </div>
  );
}
