import { Link } from 'react-router-dom';
import { FaCalendar, FaClock, FaArrowRight, FaStar } from 'react-icons/fa';
import clsx from 'clsx';
import Card from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import HighlightText from '@/components/shared/HighlightText';
import { formatDate } from '@/utils/dateFormatter';
import { TYPOGRAPHY, TEXT_COMBINATIONS } from '@/constants/styles';
import type { BlogPost } from '@/data/blog/types';

interface BlogCardProps {
  post: BlogPost;
  searchTerm: string;
  isDimmed: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export default function BlogCard({
  post,
  searchTerm,
  isDimmed,
  onMouseEnter,
  onMouseLeave,
}: BlogCardProps) {
  return (
    <article className={`transition-opacity ease-in-out ${isDimmed ? 'opacity-50' : ''}`}>
      <Link to={`/blog/${post.metadata.slug}`}>
        <Card
          title={
            <div className="flex items-center gap-2">
              <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'flex-1')}>
                <HighlightText text={post.metadata.title} searchQuery={searchTerm} />
              </h2>
              {post.metadata.featured && (
                <FaStar
                  className="w-5 h-5 text-[var(--color-primary)] flex-shrink-0"
                  title="Featured Post"
                  aria-label="Featured post"
                />
              )}
            </div>
          }
          subtitle={<HighlightText text={post.metadata.description} searchQuery={searchTerm} />}
          date={formatDate(post.metadata.publishDate)}
          isDimmed={isDimmed}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="h-full cursor-pointer"
        >
          {/* Post metadata: publish date and reading time */}
          <div className={clsx('flex items-center gap-6 mb-4', TEXT_COMBINATIONS.SMALL_MUTED)}>
            <div className="flex items-center gap-2">
              <FaCalendar className="w-3 h-3" />
              <time dateTime={post.metadata.publishDate}>
                {formatDate(post.metadata.publishDate)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="w-3 h-3" />
              <span>{post.metadata.readTime}</span>
            </div>
          </div>

          {/* Tags and action button */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {/* Show main categories first, limited to 2 */}
              {post.metadata.categories?.slice(0, 2).map((category: string) => (
                <span
                  key={category}
                  className={clsx(
                    'px-3 py-1 rounded-full font-medium',
                    'bg-[var(--color-primary)]/10',
                    TYPOGRAPHY.TEXT_SMALL,
                    TYPOGRAPHY.TEXT_PRIMARY,
                  )}
                >
                  {category}
                </span>
              ))}
              {/* Then supporting tags, limited to 2 */}
              {post.metadata.tags?.slice(0, 2).map((tag: string) => (
                <span
                  key={tag}
                  className={clsx(
                    'px-3 py-1 rounded-full',
                    'bg-[var(--color-secondary)]/10',
                    TYPOGRAPHY.TEXT_SMALL,
                    TYPOGRAPHY.TEXT_SECONDARY,
                  )}
                >
                  {tag}
                </span>
              ))}
            </div>

            <Button variant="outline">
              Read More
              <FaArrowRight className="w-3 h-3 ml-2" />
            </Button>
          </div>
        </Card>
      </Link>
    </article>
  );
}
