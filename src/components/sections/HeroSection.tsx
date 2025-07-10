import PaintSplashText from "../shared/PaintSplashEffect";

export default function Hero() {
  return (
    <section id="about" className="py-24 lg:py-32 text-[var(--color-text)]">
      <div className="max-w-3xl">
        <PaintSplashText tag="h2">Hi, I'm Afton Gauntlett.</PaintSplashText>
        <p className="mt-4 text-lg text-[var(--color-muted)] max-w-prose leading-relaxed">
          I'm a front-end developer with a passion for accessibility, clean
          design systems, and modern UI architecture. I specialize in building
          thoughtful, reusable components that scale — from design to
          deployment.
        </p>

        <p className="mt-4 text-lg text-[var(--color-muted)] max-w-prose leading-relaxed">
          This portfolio showcases my commitment to usability, performance, and
          the subtle art of making things feel right.
        </p>
      </div>
    </section>
  );
}
