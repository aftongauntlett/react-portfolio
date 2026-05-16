import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { reviews } from '@/data/reviews';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { VIEWPORT_CONFIG } from '@/constants/animations';

const CLAMP_THRESHOLD = 200;

const openQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-primary)] opacity-50 align-middle mr-0.5';
const closeQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-primary)] opacity-50 align-middle ml-0.5';

export default function ReviewsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [showAllReviews, setShowAllReviews] = useState(false);

  const primaryReviews = reviews.slice(0, 4);
  const additionalReviews = reviews.slice(4);

  const renderReview = (review: (typeof reviews)[number], i: number) => {
    const isLong = review.quote.length > CLAMP_THRESHOLD;
    const isExpanded = !!expanded[review.name];
    const paragraphs = review.quote.split('\n\n');

    return (
      <motion.div
        key={review.name}
        className="rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-5 transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.16)] dark:hover:shadow-[0_0_22px_rgba(var(--color-primary-rgb),0.10)]"
        initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_CONFIG}
        transition={{
          duration: getMotionDuration(0.4, prefersReducedMotion),
          ease: 'easeOut',
          delay: prefersReducedMotion ? 0 : i * 0.04,
        }}
      >
        <div className="flex h-full flex-col justify-between gap-3">
          <div className="space-y-2">
            {isExpanded && paragraphs.length > 1 ? (
              <div className="space-y-3">
                {paragraphs.map((para, j) => (
                  <p
                    key={j}
                    className="text-small italic leading-relaxed text-[var(--color-muted)]"
                  >
                    {j === 0 && (
                      <span className={openQuoteClass} aria-hidden="true">
                        &ldquo;
                      </span>
                    )}
                    {para}
                    {j === paragraphs.length - 1 && (
                      <span className={closeQuoteClass} aria-hidden="true">
                        &rdquo;
                      </span>
                    )}
                  </p>
                ))}
              </div>
            ) : (
              <p
                className={`text-small italic leading-relaxed text-[var(--color-muted)]${isLong && !isExpanded ? ' line-clamp-4' : ''}`}
              >
                <span className={openQuoteClass} aria-hidden="true">
                  &ldquo;
                </span>
                {review.quote.replace(/\n\n/g, ' ')}
                <span className={closeQuoteClass} aria-hidden="true">
                  &rdquo;
                </span>
              </p>
            )}
            {isLong && (
              <button
                onClick={() =>
                  setExpanded((prev) => ({ ...prev, [review.name]: !prev[review.name] }))
                }
                className="w-full text-right text-xs text-[var(--color-primary)] opacity-60 underline underline-offset-2 transition-opacity hover:opacity-100"
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          <div className="border-t border-[var(--color-line)] pt-3 text-right">
            <p className="text-xs font-medium text-[var(--color-text)]">{review.name}</p>
            <p className="text-xs text-[var(--color-muted)] opacity-70">{review.title}</p>
            <p className="text-xs text-[var(--color-muted)] opacity-50">{review.year}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <p className="text-xs italic tracking-wide text-[var(--color-muted)] opacity-60">
        From LinkedIn
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {primaryReviews.map((review, i) => renderReview(review, i))}
      </div>

      {additionalReviews.length > 0 ? (
        <div>
          <div className="flex items-center">
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
            <motion.button
              type="button"
              onClick={() => setShowAllReviews((prev) => !prev)}
              aria-controls="more-reviews"
              aria-expanded={showAllReviews}
              className={clsx(
                'group mx-3 inline-flex items-center gap-2 rounded-md px-3 py-2',
                'text-sm font-semibold',
                showAllReviews ? 'text-[var(--color-secondary)]' : 'text-[var(--color-primary)]',
                'border border-transparent transition-[color,background-color,border-color] duration-200',
                'bg-transparent hover:bg-[var(--color-line)]/35',
                'hover:border-[var(--color-primary)]/35',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
              )}
            >
              <span className="transition-colors duration-200 font-heading">
                {showAllReviews ? 'See less' : 'See more'}
              </span>
              <motion.span
                className="grid place-items-center"
                animate={prefersReducedMotion ? undefined : { rotate: showAllReviews ? 180 : 0 }}
                transition={
                  prefersReducedMotion ? undefined : { type: 'spring', stiffness: 240, damping: 20 }
                }
              >
                <HiChevronDown className="h-4 w-4 transition-colors duration-200" />
              </motion.span>
            </motion.button>
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
          </div>

          <motion.div
            id="more-reviews"
            className="mt-4"
            initial={prefersReducedMotion ? undefined : 'closed'}
            animate={prefersReducedMotion ? undefined : showAllReviews ? 'open' : 'closed'}
            style={{ overflow: 'hidden', transformOrigin: 'top' }}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    open: {
                      opacity: 1,
                      scaleY: 1,
                      height: 'auto',
                      transition: {
                        duration: 0.25,
                        ease: 'easeOut',
                        when: 'beforeChildren',
                        height: { duration: 0 },
                      },
                    },
                    closed: {
                      opacity: 0,
                      scaleY: 0,
                      height: 0,
                      transition: {
                        duration: 0.22,
                        ease: 'easeOut',
                        when: 'afterChildren',
                        height: { duration: 0 },
                      },
                    },
                  }
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {additionalReviews.map((review, i) => renderReview(review, i + 4))}
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
