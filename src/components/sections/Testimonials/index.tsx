import { useState } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { testimonials } from '@/data/testimonials';
import { DURATION, EASING } from '@/constants/animations';
import { COMPONENT_SPACING } from '@/constants/spacing';
import { Button } from '@/components/shared/Button';
import { TYPOGRAPHY } from '@/constants/styles';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import SectionEntryList from '@/components/shared/SectionEntryList';

const openQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-muted)] opacity-50 align-middle mr-0.5';
const closeQuoteClass =
  'font-serif text-xl not-italic leading-none text-[var(--color-muted)] opacity-50 align-middle ml-0.5';

export default function TestimonialsSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);

  const primaryTestimonials = testimonials.slice(0, 4);
  const additionalTestimonials = testimonials.slice(4);

  const renderReview = (review: (typeof testimonials)[number]) => (
    <article className="space-y-3 py-1">
      <blockquote
        className={clsx(
          TYPOGRAPHY.TEXT_DESCRIPTION,
          'border-l-2 border-[var(--color-line)] group-hover:border-[var(--color-primary)] pl-4 italic leading-relaxed transition-colors duration-300',
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
      <div className="text-right">
        <p className={clsx(TYPOGRAPHY.TEXT_SMALL, 'font-semibold text-[var(--color-text)]')}>
          {review.name}
        </p>
        <p className={clsx(TYPOGRAPHY.TEXT_XS, 'text-[var(--color-muted)]')}>
          {review.title} · {review.year}
        </p>
      </div>
    </article>
  );

  return (
    <div className={COMPONENT_SPACING.STACK_STANDARD}>
      <p className="text-xs italic tracking-wide text-[var(--color-muted)]">
        Some testimonials are shortened &mdash;{' '}
        <a
          href="https://www.linkedin.com/in/afton-gauntlett/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn (opens in new tab)"
          className="underline underline-offset-2 transition-colors hover:text-[var(--color-secondary)] focus-visible:text-[var(--color-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
        >
          visit my LinkedIn
          <span className="sr-only"> (opens in new tab)</span>
        </a>{' '}
        to read them in full
      </p>
      <SectionEntryList
        items={primaryTestimonials}
        ariaLabel="Primary testimonials"
        animateOnView={false}
        listClassName="space-y-5"
        itemClassName="pb-5"
        getItemKey={(review, idx) => `${review.name}-${review.year}-${idx}`}
        renderItem={(review) => renderReview(review)}
      />

      {additionalTestimonials.length > 0 ? (
        <div>
          <div className="flex items-center">
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
            <Button
              type="button"
              variant="unstyled"
              onClick={() => setShowAllTestimonials((prev) => !prev)}
              aria-controls="more-testimonials"
              aria-expanded={showAllTestimonials}
              className={clsx(
                'group mx-3 rounded-md',
                'text-sm font-semibold',
                showAllTestimonials
                  ? 'text-[var(--color-secondary)]'
                  : 'text-[var(--color-primary)]',
                'border border-transparent transition-[color,background-color,border-color] duration-200',
                'bg-transparent hover:bg-[var(--color-line)]/35',
                'hover:border-[var(--color-primary)]/35',
                'focus-visible:bg-[var(--color-line)]/35 focus-visible:border-[var(--color-primary)]/35',
                'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
              )}
            >
              <span className="transition-colors duration-200 font-heading">
                {showAllTestimonials ? 'See less' : 'See more'}
              </span>
              <motion.span
                className="grid place-items-center"
                animate={
                  prefersReducedMotion ? undefined : { rotate: showAllTestimonials ? 180 : 0 }
                }
                transition={
                  prefersReducedMotion ? undefined : { type: 'spring', stiffness: 240, damping: 20 }
                }
              >
                <HiChevronDown className="h-4 w-4 transition-colors duration-200" />
              </motion.span>
            </Button>
            <div className="h-px flex-1 bg-[var(--color-line)]" aria-hidden="true" />
          </div>

          {prefersReducedMotion ? (
            showAllTestimonials ? (
              <div id="more-testimonials" className={COMPONENT_SPACING.EXPANDABLE_PANEL_TOP}>
                <SectionEntryList
                  items={additionalTestimonials}
                  ariaLabel="Additional testimonials"
                  animateOnView={false}
                  listClassName="space-y-5"
                  itemClassName="pb-5"
                  getItemKey={(review, idx) => `${review.name}-${review.year}-${idx}`}
                  renderItem={(review) => renderReview(review)}
                />
              </div>
            ) : null
          ) : (
            <motion.div
              id="more-testimonials"
              className={COMPONENT_SPACING.EXPANDABLE_PANEL_TOP}
              initial="closed"
              animate={showAllTestimonials ? 'open' : 'closed'}
              style={{ overflow: 'hidden', transformOrigin: 'top' }}
              variants={{
                open: {
                  opacity: 1,
                  scaleY: 1,
                  height: 'auto',
                  transition: {
                    duration: DURATION.fast,
                    ease: EASING.easeOut,
                    when: 'beforeChildren',
                    height: { duration: 0 },
                  },
                },
                closed: {
                  opacity: 0,
                  scaleY: 0,
                  height: 0,
                  transition: {
                    duration: DURATION.fast,
                    ease: EASING.easeOut,
                    when: 'afterChildren',
                    height: { duration: 0 },
                  },
                },
              }}
            >
              <SectionEntryList
                items={additionalTestimonials}
                ariaLabel="Additional testimonials"
                animateOnView={false}
                listClassName="space-y-5"
                itemClassName="pb-5"
                getItemKey={(review, idx) => `${review.name}-${review.year}-${idx}`}
                renderItem={(review) => renderReview(review)}
              />
            </motion.div>
          )}
        </div>
      ) : null}
    </div>
  );
}
