import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { LinkButton } from '@/components/shared/LinkButton';
import { TYPOGRAPHY, FOCUS_STYLES } from '@/constants/styles';
import clsx from 'clsx';

export default function OrbitalOrderPostMortem() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Back to Portfolio Navigation */}
        <Link
          to="/#projects"
          className={clsx(
            'inline-flex items-center gap-2 mb-8 text-[var(--color-primary)] hover:text-[var(--color-secondary)] transition-colors',
            FOCUS_STYLES.COMPACT,
          )}
        >
          <FaArrowLeft />
          <span>View Portfolio</span>
        </Link>
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 ref={headingRef} tabIndex={-1} className={clsx(TYPOGRAPHY.HEADING_1, 'mb-2')}>
                Orbital Order
              </h1>
              <p className={clsx(TYPOGRAPHY.TEXT_LARGE, 'text-[var(--color-muted)]')}>
                JS13k 2025 Practice Project
              </p>
            </div>
            <span
              className={clsx(
                TYPOGRAPHY.TEXT_SMALL,
                'px-3 py-1 rounded font-medium whitespace-nowrap',
                'border border-[var(--color-line)]',
                'text-[var(--color-status-production)]',
              )}
              style={{ backgroundColor: 'var(--color-status-production-bg)' }}
            >
              Complete
            </span>
          </div>
          <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
            Before the official JS13k competition, I built Orbital Order as a warm-up challenge.
            Guide electrons into orbitals, follow atomic rules, and see how a few lines of code can
            feel alive. It was my first finished game.
          </p>
        </header>

        {/* Links - Right Aligned, matching portfolio card exactly */}
        <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-[var(--color-line)] justify-end">
          <LinkButton
            type="github"
            href="https://github.com/aftongauntlett/js13k-demo"
            variant="outline"
            color="primary"
          >
            View Repo
          </LinkButton>

          <LinkButton
            type="external"
            href="https://orbital-order.aftongauntlett.com"
            variant="solid"
            color="primary"
          >
            Play Game
          </LinkButton>
        </div>

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>About</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              The idea started while I was watching Neil deGrasse Tyson talk about lightning on
              StarTalk. I tried prototyping lightning mechanics, but the orbs and rings I drew felt
              like atoms. I switched the theme to orbitals and the game started to make sense. From
              there I leaned into stable shells, glowing electrons, and the Aufbau order.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Technical Overview</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              The palette came from science class memories and Portal&apos;s blue and orange. They read
              as charge and polarity, which fit the theme. The sound sits in the background as a
              low, calm bed so the focus stays on motion and light.
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Built with vanilla JavaScript and Canvas 2D</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>All audio generated procedurally using the Web Audio API</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Optimized to fit under 13KB using Terser and code golfing</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>
                  <strong className="font-medium">Atomic configuration logic:</strong> 1s² → 2s² →
                  2p⁶
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Runs at 60fps with real-time interactions and collisions</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Engineering Insights</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              The 13KB limit forced clear choices. No libraries. No waste. I watched allocations,
              reused what I could, and kept the update loop simple. Seeing Terser compress things
              was oddly satisfying. &ldquo;Golfing&rdquo; made sense once I saw it work in practice.
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Cut from 47KB to 8.2KB zipped using aggressive minification</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Simplified the render loop for steady timing</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Removed an infinite mode that caused state pollution</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Added an interactive tutorial to teach by doing</span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>Used save and restore around Canvas state changes</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Key Takeaways</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              Finishing a small thing changed how I plan work. Small ideas can carry weight when
              they feel complete. Scope control is a skill. Performance work is not just tools and
              numbers; it is being careful about what you add and how you add it.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Reflections</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              Player feedback pushed the UX in the right direction. I removed the level cards and
              made transitions flow in place. The tutorial moved from a menu into the game so you
              learn by doing. Those changes kept the rhythm smooth. This project gave me confidence
              and made me want to learn more.
            </p>
          </section>
        </article>
      </main>
    </div>
  );
}
