import type { ReactNode } from "react";
import PaintSplashText from "../shared/PaintSplashEffect";
import FadeInSection from "../shared/FadeInSection";
import clsx from "clsx";

type Props = {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function PageSection({ id, title, children, className }: Props) {
  return (
    <section
      id={id}
      data-section={id}
      className={clsx(
        "min-h-screen px-6 sm:px-8 lg:pl-16 py-20 flex flex-col items-start max-w-4xl mx-auto cursor-default",
        className
      )}
    >
      <FadeInSection>
        <div className="w-full space-y-8">
          {title && <PaintSplashText tag="h2">{title}</PaintSplashText>}
          {children}
        </div>
      </FadeInSection>
    </section>
  );
}
