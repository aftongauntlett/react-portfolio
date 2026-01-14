import { useEffect, useRef } from 'react';
import { LinkButton } from '@/components/shared/LinkButton';
import { StandalonePageHeader } from '@/components/shared/StandalonePageHeader';
import Footer from '@/components/shared/Footer';
import { TYPOGRAPHY } from '@/constants/styles';
import clsx from 'clsx';

export default function JS13kPostMortem() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <StandalonePageHeader />
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 ref={headingRef} tabIndex={-1} className={clsx(TYPOGRAPHY.HEADING_1, 'mb-2')}>
                Nyx Felis & Lampyris
              </h1>
              <p className={clsx(TYPOGRAPHY.TEXT_LARGE, 'text-[var(--color-muted)]')}>
                JS13k Games 2025 Competition Entry
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
              Production
            </span>
          </div>
          <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
            Created for the JS13k Games 2025 competition, this browser-based experience was
            engineered entirely under a 13 KB limit using pure HTML, CSS, and JavaScript. Focused on
            atmosphere and motion design, it uses Canvas 2D rendering, procedural particle systems,
            and Web Audio API sound design to deliver an expressive, optimized micro-game.
          </p>
        </header>

        <figure className="mb-12 max-w-2xl mx-auto">
          <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-3 sm:p-4">
            <div className="rounded-md overflow-hidden">
              <img
                src="/games/nyx-felis.png"
                alt="Nyx Felis & Lampyris screenshot"
                width={558}
                height={514}
                decoding="async"
                loading="eager"
                className="w-full h-auto"
              />
            </div>
          </div>
          <figcaption className={clsx(TYPOGRAPHY.TEXT_SMALL, 'text-[var(--color-muted)] mt-2')}>
            Screenshot captured in a modern browser.
          </figcaption>
        </figure>

        {/* Links - Right Aligned, matching portfolio card exactly */}
        {/* Links - Right Aligned, matching portfolio card exactly */}
        <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-[var(--color-line)] justify-end">
          <LinkButton
            type="github"
            href="https://github.com/aftongauntlett/js13k-2025"
            variant="outline"
            color="primary"
          >
            View Repo
          </LinkButton>

          <LinkButton
            type="external"
            href="https://js13kgames.com/2025/games/nyx-felis-and-lampyris"
            variant="outline"
            color="secondary"
          >
            JS13k Entry Page
          </LinkButton>

          <LinkButton
            type="external"
            href="https://nyx-felis.aftongauntlett.com"
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
              I wanted to build a small game and finish it. JS13k felt like the right constraint.
              The theme was Black Cats, which made me happy because I love cats. Fireflies were
              already on my mind from evening walks, so the pairing came naturally. The goal was
              calm, cozy, a little mysterious. And particles... lots of particles!
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Technical Overview</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Visuals stayed minimal on purpose. Layered gradients, soft blends, and small glints
              sell the glow without WebGL. The audio is code-driven. It works, but I would shape it
              differently with more experience. The constraint taught me a lot.
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>
                  <strong className="font-medium">Engine:</strong> Vanilla JavaScript + Canvas 2D
                  (no frameworks)
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>
                  <strong className="font-medium">Audio:</strong> Procedural Web Audio API (no
                  external files)
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>
                  <strong className="font-medium">Performance:</strong> ~60fps with hundreds of
                  particles on screen
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>
                  <strong className="font-medium">Size:</strong> 12.5KB competition build; 22KB
                  enhanced post-jam build
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">—</span>
                <span>
                  <strong className="font-medium">Loop:</strong> Summon → Collect → Shield → Evolve
                  → Deliver
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Key Takeaways</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              Constraints make things possible to finish. They force choices and keep ideas from
              drifting too far. I learned that clear timing and simple rules feel better than flashy
              effects. Small UX fixes can change how a game plays more than new features do. The
              game finally felt right when I stopped overthinking and just aimed for calm moments
              with short bursts of focus.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Reflections</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              I missed the submission deadline because I mixed up CET and CT. It stung, but I
              finished the enhanced version anyway and felt better about it. Making two games in a
              row taught me to keep scope tight, fix what confuses players, and move on. Next I want
              to try Unity. I might rebuild one of these ideas or return to the lightning concept
              that started this. Or pick something new. Stars and sparkles will probably show up.
            </p>
          </section>
        </article>

        <Footer scrollTarget="top" showStandaloneDivider={true} />
      </main>
    </div>
  );
}
