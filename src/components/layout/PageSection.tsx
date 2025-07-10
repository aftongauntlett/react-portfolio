import type { ReactNode } from "react";
import PaintSplashText from "../shared/PaintSplashEffect";
import FadeInSection from "../shared/FadeInSection";

type Props = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function PageSection({ id, title, children }: Props) {
  return (
    <section
      id={id}
      data-section={id}
      className="min-h-screen px-6 sm:px-8 py-20 flex flex-col items-start justify-center max-w-5xl mx-auto"
    >
      <FadeInSection>
        <PaintSplashText tag="h2">{title}</PaintSplashText>
        <div className="mt-10 w-full">{children}</div>
      </FadeInSection>
    </section>
  );
}
