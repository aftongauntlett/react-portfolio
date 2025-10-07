import { Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogPost } from '@/data/blog';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { Button } from '@/components/shared/Button';
import ExternalPageLayout from '@/components/layout/ExternalPageLayout';
import { navigateToPortfolio } from '@/utils/navigation';
import { TYPOGRAPHY } from '@/constants/typography';

// Lazy load blog components for better code splitting
const BlogPostContent = lazy(() => import('@/components/blog/BlogPostContent'));
const TableOfContents = lazy(() => import('@/components/blog/TableOfContents'));

// Loading component for blog post content
function BlogPostLoader() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className={`${TYPOGRAPHY.HEADING_1} font-bold mb-4 text-[var(--color-text)]`}>
        Post Not Found
      </h1>
      <p className={`${TYPOGRAPHY.TEXT_LARGE} text-[var(--color-muted)] mb-8`}>
        The blog post you're looking for doesn't exist or has been moved.
      </p>
      <Button onClick={navigateToPortfolio} variant="solid" color="primary">
        Back to Portfolio
      </Button>
    </div>
  );
}

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <NotFound />;
  }

  const post = getBlogPost(slug);

  if (!post) {
    return <NotFound />;
  }

  return (
    <ExternalPageLayout
      title={post.metadata.title}
      metadata={{
        author: post.metadata.author,
        publishDate: post.metadata.publishDate,
        readTime: post.metadata.readTime,
        tags: post.metadata.tags,
        subtitle: post.metadata.subtitle,
      }}
    >
      <Suspense fallback={<BlogPostLoader />}>
        <BlogPostContent
          sections={post.sections}
          tableOfContents={
            <Suspense
              fallback={
                <div className="w-64 h-96 animate-pulse bg-gray-300 dark:bg-gray-600 rounded"></div>
              }
            >
              <TableOfContents sections={post.sections} />
            </Suspense>
          }
          metadata={{
            subtitle: post.metadata.subtitle,
            tags: post.metadata.tags,
            description: post.metadata.description,
          }}
        />
      </Suspense>
    </ExternalPageLayout>
  );
}

export default function BlogPost() {
  return (
    <ErrorBoundary>
      <BlogPostPage />
    </ErrorBoundary>
  );
}
