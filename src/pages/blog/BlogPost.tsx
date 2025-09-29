import { useParams } from 'react-router-dom';
import BlogPostContent from '@/components/blog/BlogPostContent';
import TableOfContents from '@/components/blog/TableOfContents';
import { getBlogPost } from '@/data/blog';
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { Button } from '@/components/shared/Button';
import ExternalPageLayout from '@/components/layout/ExternalPageLayout';
import { navigateToPortfolio } from '@/utils/navigation';
import { TYPOGRAPHY } from '@/constants/typography';

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
      description={post.metadata.description}
      metadata={{
        author: post.metadata.author,
        publishDate: post.metadata.publishDate,
        readTime: post.metadata.readTime,
        tags: post.metadata.tags,
      }}
    >
      <BlogPostContent
        sections={post.sections}
        tableOfContents={<TableOfContents sections={post.sections} />}
      />
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
