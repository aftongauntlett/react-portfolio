import { useEffect, useRef } from 'react';
import { LinkButton } from '@/components/shared/LinkButton';
import { StandalonePageHeader } from '@/components/shared/StandalonePageHeader';
import Footer from '@/components/shared/Footer';
import { TYPOGRAPHY } from '@/constants/styles';
import clsx from 'clsx';

export default function BloopMuseumDesignProcess() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    headingRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)]">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <StandalonePageHeader />

        <header className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 ref={headingRef} tabIndex={-1} className={clsx(TYPOGRAPHY.HEADING_1, 'mb-2')}>
                Bloop Museum — Design Process & Constraints
              </h1>
              <p className={clsx(TYPOGRAPHY.TEXT_LARGE, 'text-[var(--color-muted)]')}>
                A UX case study about clarity under hard limits
              </p>
            </div>
            <span
              className={clsx(
                TYPOGRAPHY.TEXT_SMALL,
                'px-3 py-1 rounded font-medium whitespace-nowrap',
                'border border-[var(--color-line)]',
                'text-[var(--color-status-development)]',
              )}
              style={{ backgroundColor: 'var(--color-status-development-bg)' }}
            >
              In Development
            </span>
          </div>
          <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
            This project is a good reminder that UX is not just what a UI looks like. It is how
            predictable it feels, how quickly someone understands what to do, and how well it holds
            up when you take away modern conveniences.
          </p>
        </header>

        <figure className="mb-12 max-w-2xl mx-auto">
          <div className="rounded-md border border-[var(--color-line)] bg-[var(--color-surface)] p-3 sm:p-4">
            <div className="rounded-md overflow-hidden">
              <img
                src="/games/bloop-landing-page.png"
                alt="Bloop Museum landing page in a modern browser"
                width={2180}
                height={1548}
                decoding="async"
                loading="eager"
                className="w-full h-auto"
              />
            </div>
          </div>
          <figcaption className={clsx(TYPOGRAPHY.TEXT_SMALL, 'text-[var(--color-muted)] mt-2')}>
            Screenshot captured in a modern browser. The structure and content mirror the
            Netscape-targeted version.
          </figcaption>
        </figure>

        <div className="flex flex-wrap gap-3 mb-12 pb-12 border-b border-[var(--color-line)] justify-end">
          <LinkButton
            type="external"
            href="https://bloop-demo.vercel.app/"
            variant="outline"
            color="secondary"
          >
            View Live
          </LinkButton>
        </div>

        <article className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Context</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Bloop Museum is a small museum website designed for visitors and donors, but it is not
              only a website for people browsing on modern phones. It also runs on real museum
              hardware as part of the on-site experience.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              That hardware is old on purpose. The museum has a retro exhibit with a kiosk that is
              meant to feel like a time capsule. Visitors walk up, click around for a few minutes,
              and move on. There is no onboarding, no instructions, and no staff member standing
              there to explain what to do.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              So the goal was simple: make the content easy to find, easy to read, and hard to
              break, even in a browser that predates most of the web.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Constraints</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Most web UX work starts with assumptions: fast CPUs, predictable layout, and a
              JavaScript runtime you can lean on when you need it. This project starts by removing
              those assumptions.
            </p>
            <ul className="space-y-3 pl-1">
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">•</span>
                <span>
                  <strong className="font-medium">Pentium-era hardware:</strong> interactions need
                  to be lightweight. Anything that causes slow repaints or heavy images becomes a
                  usability problem.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">•</span>
                <span>
                  <strong className="font-medium">Netscape Navigator 4.0:</strong> the layout and
                  styling rules are different enough that typical browser testing does not tell you
                  the truth.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">•</span>
                <span>
                  <strong className="font-medium">HTML 4.0 Transitional:</strong> the page needs to
                  be valid and forgiving in that era, which affects what elements and attributes you
                  can safely rely on.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">•</span>
                <span>
                  <strong className="font-medium">Table-based layouts:</strong> grid and flex do not
                  exist here. Alignment and hierarchy have to come from structure, spacing, and
                  careful content grouping.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">•</span>
                <span>
                  <strong className="font-medium">
                    Limited CSS and no reliance on JavaScript:
                  </strong>{' '}
                  the experience has to work if scripts fail or are unavailable. Navigation and
                  state need to be simple and explicit.
                </span>
              </li>
              <li className="flex gap-3 text-[var(--color-text)]">
                <span className="text-[var(--color-primary)] select-none">•</span>
                <span>
                  <strong className="font-medium">
                    Walk-up museum users with no instructions:
                  </strong>{' '}
                  the UI has to explain itself. You do not get a second chance if the first screen
                  is confusing.
                </span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Design Approach</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              I treated the layout like signage. The design job was not to feel modern. It was to be
              obvious.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              That meant keeping navigation stable and boring in the best way. The same links appear
              in the same place on every page. The current section is clearly indicated. Pages do
              not shift around based on content length.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Hierarchy comes from structure more than style. I used clear headings, short sections,
              and a tight reading width so paragraphs do not become a wall of text on a low
              resolution screen.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Content density was a real tradeoff. Museum sites can become link farms. In this
              environment that turns into scanning fatigue. The approach was to show a small number
              of primary choices, keep the labels literal, and avoid clever navigation.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              Progressive enhancement still mattered, but in reverse. The baseline had to work in
              Netscape first. Modern browsers get cleaner spacing and better readability, but the
              core structure stays the same.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Iteration & Collaboration</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              This was collaborative in a practical way. The museum owner knows what visitors ask
              about, what donors care about, and what details people tend to miss.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Instead of pretending I had perfect answers upfront, we reviewed pages together and
              adjusted the structure based on what felt confusing or slow to use.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              I did not produce formal wireframes or a design system for this. The iteration was
              hands-on: make a change, test it in the target environment, and simplify when a choice
              added friction.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Most layout decisions were explored directly in code rather than through separate
              design artifacts.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              A lot of the work was reducing. Removing extra links. Shortening labels. Reordering
              content so the first screen answers the most common questions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className={clsx(TYPOGRAPHY.HEADING_2, 'mb-4')}>Why This Matters</h2>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              I like this project because it maps cleanly to enterprise and government UX work.
              Constraints show up everywhere.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed mb-4')}>
              Sometimes the constraint is an old browser. Sometimes it is a locked-down environment.
              Sometimes it is policy, accessibility requirements, or a user who cannot spend ten
              minutes learning your interface.
            </p>
            <p className={clsx(TYPOGRAPHY.TEXT_DESCRIPTION, 'leading-relaxed')}>
              This kind of work rewards the same habits: keep navigation predictable, prioritize the
              content people actually need, write labels that do not require interpretation, and
              iterate based on real use rather than assumptions.
            </p>
          </section>
        </article>

        <Footer scrollTarget="top" showStandaloneDivider={true} />
      </main>
    </div>
  );
}
