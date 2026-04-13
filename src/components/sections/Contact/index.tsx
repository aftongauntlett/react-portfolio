import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';
import { Button } from '@/components/shared/Button';
import { LinkButton } from '@/components/shared/LinkButton';
import { IconLinkedIn } from '@/components/shared/InlineIcons';
import { usePrefersReducedMotion, getMotionDuration } from '@/hooks/usePrefersReducedMotion';
import { VIEWPORT_CONFIG } from '@/constants/animations';
import { usePointerTilt } from '@/hooks/usePointerTilt';
import { LuMessageCircle, LuCopy, LuCheck } from 'react-icons/lu';

const EMAIL = 'hello@aftongauntlett.com';

export default function ContactSection() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const tilt = usePointerTilt({ enabled: !prefersReducedMotion, maxTiltDeg: 12 });
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

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

  return (
    <motion.div
      className="group block rounded-lg border border-[var(--color-line)] bg-[var(--color-surface)] p-6 text-center transition-[border-color,box-shadow] duration-300 hover:border-[var(--color-primary)]/30 hover:shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.16)] dark:hover:shadow-[0_0_22px_rgba(var(--color-primary-rgb),0.10)]"
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_CONFIG}
      transition={{ duration: getMotionDuration(0.5, prefersReducedMotion), ease: 'easeOut' }}
      whileHover={prefersReducedMotion ? undefined : 'hover'}
    >
      <div className="space-y-6">
        {/* Icon — centered at top, same glow treatment as education cards */}
        <div
          className="relative mx-auto -mb-4 grid h-24 w-24 place-items-center"
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{ backgroundColor: 'rgba(var(--color-primary-rgb), 0.12)' }}
            variants={prefersReducedMotion ? undefined : { hover: { opacity: 0.45, scale: 1.08 } }}
            transition={
              prefersReducedMotion ? undefined : { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
            }
          />
          <motion.div
            className="absolute inset-8 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(var(--color-primary-rgb), 0.10), transparent 70%)',
            }}
            variants={prefersReducedMotion ? undefined : { hover: { opacity: 0.9, scale: 1.12 } }}
            transition={prefersReducedMotion ? undefined : { duration: 0.8, ease: 'easeOut' }}
          />
          <div className="relative [perspective:900px]">
            <motion.span
              className="inline-flex"
              variants={iconVariants}
              onPointerMove={tilt.onPointerMove}
              onPointerLeave={tilt.onPointerLeave}
              style={{ transformStyle: 'preserve-3d', ...tilt.tiltStyle }}
            >
              <LuMessageCircle
                className="h-12 w-12 text-[var(--color-primary)] transition-[filter] duration-300 group-hover:drop-shadow-[0_0_18px_rgba(var(--color-primary-rgb),0.35)]"
                aria-hidden
              />
            </motion.span>
          </div>
        </div>

        <p className="text-description mx-auto max-w-lg transition-colors duration-300 group-hover:text-[var(--color-text)] group-focus-within:text-[var(--color-text)]">
          Have a role, a project, or a question in mind? Reach out directly by email, or connect
          with me on GitHub and LinkedIn.
        </p>

        <hr className="mx-auto w-32 border-t border-[var(--color-line)]" />

        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
            Email
          </p>
          <div className="inline-flex items-center gap-2">
            <Button
              variant="link"
              color="secondary"
              href={`mailto:${EMAIL}`}
              className="text-sm pb-0.5"
            >
              {EMAIL}
            </Button>
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? 'Copied!' : 'Copy email address'}
              title={copied ? 'Copied!' : 'Copy email address'}
              className="rounded p-1 text-[var(--color-muted)] transition-colors duration-200 hover:text-[var(--color-primary)] focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2"
            >
              {copied ? (
                <LuCheck className="h-3.5 w-3.5 text-[var(--color-primary)]" aria-hidden />
              ) : (
                <LuCopy className="h-3.5 w-3.5" aria-hidden />
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3" aria-label="Social links">
          <LinkButton
            type="github"
            href="https://github.com/aftongauntlett"
            aria-label="Visit GitHub profile"
            variant="outline"
            color="primary"
          >
            GitHub
          </LinkButton>
          <Button
            href="https://www.linkedin.com/in/afton-gauntlett/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile (opens in new tab)"
            variant="outline"
            color="primary"
            icon={<IconLinkedIn size={18} />}
          >
            LinkedIn
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
