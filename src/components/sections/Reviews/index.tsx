import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { reviews } from '@/data/reviews';
import { COMPONENT_SPACING } from '@/constants/spacing';
import { Button } from '@/components/shared/Button';
import { TYPOGRAPHY } from '@/constants/styles';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionEntryList from '@/components/shared/SectionEntryList';

const openQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-muted)] opacity-50 align-middle mr-0.5 transition-colors duration-200 group-hover:text-[var(--color-primary)]';
const closeQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-muted)] opacity-50 align-middle ml-0.5 transition-colors duration-200 group-hover:text-[var(--color-primary)]';

export default function ReviewsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showAllReviews, setShowAllReviews] = useState(false);

  const primaryReviews = reviews.slice(0, 4);
  const additionalReviews = reviews.slice(4);

  const renderReview = (review: (typeof reviews)[number]) => (
    <article className="space-y-3 py-1">
      <blockquote
        className={clsx(
          TYPOGRAPHY.TEXT_DESCRIPTION,
          'border-l-2 border-[var(--color-line)] pl-4 italic leading-relaxed text-[var(--color-muted)]',
          'transition-colors duration-200 group-hover:border-[var(--color-primary)]/45',
        )}
      >
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
      </blockquote>
      <p
        className={clsx(
          TYPOGRAPHY.TEXT_SMALL,
          'pl-4 font-semibold text-[var(--color-text)] transition-colors duration-200 group-hover:text-[var(--color-primary)]',
        )}
      >
        {review.name}
      </p>
      <p className={clsx(TYPOGRAPHY.TEXT_XS, 'pl-4 text-[var(--color-muted)]')}>
        {review.title} · {review.year}
      </p>
    </article>
  );

  return (
    <div className="space-y-6">
      <p className="text-xs italic tracking-wide text-[var(--color-muted)] opacity-60">
        Some reviews are shortened &mdash;{' '}
        <a
          href="https://www.linkedin.com/in/afton-gauntlett/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn (opens in new tab)"
          className="underline underline-offset-2 hover:text-[var(--color-secondary)] transition-colors"
        >
          visit my LinkedIn
          <span className="sr-only"> (opens in new tab)</span>
        </a>{' '}
        to read them in full
      </p>
      <SectionEntryList
        items={primaryReviews}
        ariaLabel="Primary reviews"
        listClassName="space-y-5"
        itemClassName="pb-5"
        getItemKey={(review, idx) => `${review.name}-${review.year}-${idx}`}
        renderItem={(review) => renderReview(review)}
      />

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
            <SectionEntryList
              items={additionalReviews}
              ariaLabel="Additional reviews"
              listClassName="space-y-5"
              itemClassName="pb-5"
              getItemKey={(review, idx) => `${review.name}-${review.year}-${idx}`}
              renderItem={(review) => renderReview(review)}
            />
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
