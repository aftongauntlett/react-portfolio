import { FaCalendar, FaClock, FaArrowRight } from 'react-icons/fa';
import clsx from 'clsx';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import Tag from '@/components/shared/Tag';
import HighlightText from '@/components/shared/HighlightText';
import { formatDate } from '@/utils/dateFormatter';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import type { BlogPost } from '@/data/blog/types';

interface DevlogCardProps {
  post: BlogPost;
  searchTerm?: string;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function DevlogCard({
  post,
  searchTerm = '',
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: DevlogCardProps) {
  const date = formatDate(post.metadata.publishDate);
  const tags = post.metadata.tags || [];
  const categories = post.metadata.categories || [];

  return (
    <article
      className={`transition-opacity ease-in-out ${isDimmed ? 'opacity-50' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Card
        title={
          <h2 className={clsx(TYPOGRAPHY.HEADING_2)}>
            <HighlightText text={post.metadata.title} searchQuery={searchTerm} />
          </h2>
        }
        subtitle={<HighlightText text={post.metadata.description} searchQuery={searchTerm} />}
        date=""
        isDimmed={isDimmed}
        className="h-full"
      >
        {/* Metadata: date and reading time */}
        <div className={clsx('flex items-center gap-6 mb-4', TEXT_COMBINATIONS.SMALL_MUTED)}>
          <div className="flex items-center gap-2">
            <FaCalendar className="w-3 h-3" />
            <time dateTime={post.metadata.publishDate}>{date}</time>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="w-3 h-3" />
            <span>{post.metadata.readTime}</span>
          </div>
        </div>

        {/* Tags and categories */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {/* Show categories for blog posts */}
            {categories.slice(0, 2).map((category: string) => (
              <Tag key={category} variant="primary" size="small">
                {category}
              </Tag>
            ))}
            {/* Show tags */}
            {tags.slice(0, 2).map((tag: string) => (
              <Tag key={tag} variant="secondary" size="small">
                {tag}
              </Tag>
            ))}
          </div>

          {/* Read More button */}
          <div>
            <Button
              variant="outline"
              color="primary"
              href={`/blog/${post.metadata.slug}`}
              aria-label={`Read ${post.metadata.title}`}
            >
              Read More
              <FaArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </Card>
    </article>
  );
}
