import { navItems } from "@/components/layout/navItems";
import { useEffect, useState } from "react";

const SECTION_IDS = navItems.map((item) => item.id);

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<string>("about");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).getAttribute("id");
            if (id) setActiveSection(id);
          }
        }
      },
      {
        rootMargin: "0px 0px -70% 0px", // triggers when 30% of section visible
        threshold: 0.1, // fires when section has at least 10% visible
      }
    );

    SECTION_IDS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return activeSection;
}
