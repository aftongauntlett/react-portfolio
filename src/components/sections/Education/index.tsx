import { education, type Education } from '@/data/education';
import clsx from 'clsx';
import { TYPOGRAPHY } from '@/constants/styles';
import { m } from 'framer-motion';
import { createElement } from 'react';
import type { IconType } from 'react-icons';
import { FaFigma, FaReact } from 'react-icons/fa6';
import { BsShieldPlus } from 'react-icons/bs';
import {
  HiAcademicCap,
  HiArrowTopRightOnSquare,
} from 'react-icons/hi2';
import { createMotionVariants } from '@/utils/motionHelpers';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { getMotionDuration, usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { usePointerTilt } from '@/hooks/usePointerTilt';

function getEducationIcon(item: Education): IconType {
  if (item.title.toLowerCase().includes('security+')) return BsShieldPlus;
  if (item.title.toLowerCase().includes('user experience')) return FaFigma;
  if (item.title.toLowerCase().includes('full-stack')) return FaReact;
  return HiAcademicCap;
}

function getIconColorClass(idx: number): string {
  const accent = idx % 3;
  if (accent === 0) return 'text-[var(--color-award-accent-1)]';
  if (accent === 1) return 'text-[var(--color-award-accent-2)]';
  return 'text-[var(--color-award-accent-3)]';
}

function getEducationIconColorClass(item: Education, idx: number): string {
  const title = item.title.toLowerCase();

  if (title.includes('full-stack')) return 'text-[var(--color-education-icon-fullstack)]';
  if (title.includes('security+')) return 'text-[var(--color-education-icon-security)]';
  if (title.includes('user experience')) return 'text-[var(--color-education-icon-figma)]';

  return getIconColorClass(idx);
}

function EducationCard({ item, idx }: { item: Education; idx: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const icon = getEducationIcon(item);
  const tilt = usePointerTilt({ enabled: !prefersReducedMotion, maxTiltDeg: 12 });

  const iconVariants = prefersReducedMotion
    ? undefined
    : {
        hover: {
          rotateX: 10,
          rotateY: -12,
          rotateZ: 6,
          y: -1,
          transition: { type: 'spring' as const, stiffness: 190, damping: 18 },
        },
      };

  const isLink = Boolean(item.link);
  const Wrapper = isLink ? m.a : m.div;

  return (
    <Wrapper
      {...(isLink
        ? {
            href: item.link,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': `View ${item.title} (opens in new tab)`,
          }
        : {})}
      className={clsx(
        'group block rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-4',
        'transition-[border-color,box-shadow] duration-300',
        'hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.16)]',
        'dark:hover:shadow-[0_0_22px_rgba(var(--color-primary-rgb),0.10)]',
        'focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2',
        isLink && 'cursor-pointer',
      )}
      initial={false}
      whileHover={prefersReducedMotion ? undefined : 'hover'}
    >
      <div className="grid items-center gap-4 md:gap-6 sm:grid-cols-[7.5rem_1fr]">
        <div className="relative hidden sm:grid place-items-center" aria-hidden="true">
          {/* FeatureBlock-inspired glow layers (no icon container/border) */}
          <m.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.12)' }}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    hover: { opacity: 0.45, scale: 1.08 },
                  }
            }
            transition={prefersReducedMotion ? undefined : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          />
          <m.div
            className="absolute inset-8 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.10), transparent 70%)' }}
            variants={
              prefersReducedMotion
                ? undefined
                : {
                    hover: { opacity: 0.9, scale: 1.12 },
                  }
            }
            transition={prefersReducedMotion ? undefined : { duration: 0.8, ease: 'easeOut' }}
          />

          <div className="relative [perspective:900px]">
            <m.span
              className="inline-flex"
              variants={iconVariants}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
              style={{ transformStyle: 'preserve-3d', ...tilt.tiltStyle }}
            >
              {createElement(icon, {
                className: clsx(
                  'h-12 w-12 md:h-14 md:w-14',
                  getEducationIconColorClass(item, idx),
                  'transition-[filter] duration-300',
                  'group-hover:drop-shadow-[0_0_18px_rgba(var(--color-primary-rgb),0.35)]',
                ),
                'aria-hidden': true,
              })}
            </m.span>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3
                  className={clsx(
                    TYPOGRAPHY.SUBTITLE,
                    'text-[var(--color-text)] transition-colors duration-300',
                    'group-hover:text-[var(--color-primary)]',
                  )}
                >
                  {item.title}
                </h3>

                {item.status ? (
                  <span
                    className="hidden md:inline-flex items-center gap-2"
                    aria-label={`Status: ${item.status}`}
                  >
                    <span
                      className={clsx(
                        TYPOGRAPHY.TEXT_XS,
                        'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
                        'text-[var(--color-status-production)]',
                      )}
                      style={{ backgroundColor: 'var(--color-status-production-bg)' }}
                    >
                      {item.status}
                    </span>
                  </span>
                ) : null}
              </div>

              <div
                className={clsx(
                  TYPOGRAPHY.TEXT_SMALL,
                  'mt-1 text-[var(--color-muted)] transition-colors duration-300',
                  'group-hover:text-[var(--color-secondary)]',
                )}
              >
                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="min-w-0">{item.institution}</span>
                  {item.status ? (
                    <span
                      className="inline-flex md:hidden items-center gap-2"
                      aria-label={`Status: ${item.status}`}
                    >
                      <span
                        className={clsx(
                          TYPOGRAPHY.TEXT_XS,
                          'font-medium px-2 py-1 rounded border border-[var(--color-line)]',
                          'text-[var(--color-status-production)]',
                        )}
                        style={{ backgroundColor: 'var(--color-status-production-bg)' }}
                      >
                        {item.status}
                      </span>
                    </span>
                  ) : null}
                </span>
              </div>
            </div>

            <span
              className={clsx(
                TYPOGRAPHY.TEXT_SMALL,
                'ml-2 shrink-0 text-[var(--color-muted)] transition-colors duration-300',
                'group-hover:text-[var(--color-primary)]',
              )}
            >
              <span className="inline-flex items-center justify-end gap-2">
                {isLink ? (
                  <span
                    className={clsx(
                      'opacity-0 transition-[opacity,transform] duration-200',
                      'translate-y-[1px]',
                      'group-hover:opacity-100 group-hover:translate-y-0',
                      'group-focus-visible:opacity-100 group-focus-visible:translate-y-0',
                      'text-[var(--color-muted)] group-hover:text-[var(--color-primary)]',
                    )}
                    aria-hidden="true"
                  >
                    <HiArrowTopRightOnSquare className="h-4 w-4" />
                  </span>
                ) : null}
                {item.date}
              </span>
            </span>
          </div>

          {item.description ? (
            <p
              className={clsx(
                TYPOGRAPHY.TEXT_DESCRIPTION,
                'mt-2 transition-colors duration-300 group-hover:text-[var(--color-text)]',
              )}
            >
              {item.description}
            </p>
          ) : null}
        </div>
      </div>
    </Wrapper>
  );
}

function EducationGrid({ items }: { items: readonly Education[] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { fadeInUp } = createMotionVariants(prefersReducedMotion);

  return (
    <m.ul
      className="space-y-4"
      aria-label="Education"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: getMotionDuration(0.08, prefersReducedMotion),
            delayChildren: getMotionDuration(0.05, prefersReducedMotion),
          },
        },
      }}
    >
      {items.map((item, idx) => (
        <m.li key={`${item.title}-${idx}`} variants={fadeInUp}>
          <EducationCard item={item} idx={idx} />
        </m.li>
      ))}
    </m.ul>
  );
}

export default function EducationSection() {
  return (
    <EducationGrid items={education} />
  );
}
