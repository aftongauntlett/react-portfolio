import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { reviews } from '@/data/reviews';
import { COMPONENT_SPACING } from '@/constants/spacing';
import { Button } from '@/components/shared/Button';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { VIEWPORT_CONFIG } from '@/constants/animations';

const openQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-primary)] opacity-50 align-middle mr-0.5';
const closeQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-primary)] opacity-50 align-middle ml-0.5';

export default function ReviewsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const primaryReviews = reviews.slice(0, 4);
  const additionalReviews = reviews.slice(4);

  const renderReview = (review: (typeof reviews)[number], i: number) => (
    <motion.div
      key={review.name}
      className={clsx(
        'group rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)]',
        COMPONENT_SPACING.CARD_PADDING,
        'transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.16)] dark:hover:shadow-[0_0_22px_rgba(var(--color-primary-rgb),0.10)]',
      )}
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
        <p className="text-small italic leading-relaxed text-[var(--color-muted)]">
          <span className={openQuoteClass} aria-hidden="true">
            &ldquo;
          </span>
          {review.quote}
          {review.truncated ? (
            <span className={closeQuoteClass} aria-hidden="true">
              &hellip;&rdquo;
            </span>
          ) : (
            <span className={closeQuoteClass} aria-hidden="true">
              &rdquo;
            </span>
          )}
        </p>
        <div className="border-t border-[var(--color-line)] pt-3 text-right">
          <p className="text-xs font-medium text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-primary)]">
            {review.name}
          </p>
          <p className="text-xs text-[var(--color-muted)] opacity-70">{review.title}</p>
          <p className="text-xs text-[var(--color-muted)] opacity-50">{review.year}</p>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <p className="text-xs italic tracking-wide text-[var(--color-muted)] opacity-60">
        Some reviews are shortened &mdash;{' '}
        <a
          href="https://www.linkedin.com/in/afton-gauntlett/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-[var(--color-secondary)] transition-colors"
        >
          visit my LinkedIn
        </a>{' '}
        to read them in full
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {primaryReviews.map((review, i) => renderReview(review, i))}
      </div>

      {additionalReviews.length > 0 ? (
        <div>
          <div className="flex items-center">
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
            <Button
              type="button"
              variant="unstyled"
              onClick={() => setShowAllReviews((prev) => !prev)}
              aria-controls="more-reviews"
              aria-expanded={showAllReviews}
              className={clsx(
                'group mx-3 rounded-md',
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
            </Button>
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
          </div>

          <motion.div
            id="more-reviews"
            className={COMPONENT_SPACING.EXPANDABLE_PANEL_TOP}
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
