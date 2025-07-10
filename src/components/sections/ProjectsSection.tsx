const projects = [
  {
    title: "Portfolio Website",
    description:
      "My personal site built with React, Vite, and Tailwind. Includes a custom theme, animations, and project showcase.",
    link: "#",
  },
  {
    title: "Guess-the-Glass App",
    description:
      "Wine tasting game powered by a public dataset and custom scoring logic. Built with Next.js and TypeScript.",
    link: "#",
  },
  {
    title: "NASA Star Map",
    description:
      "Interactive visualization of nearby planets using 3D coordinates and proximity logic. Inspired by Star Trek.",
    link: "#",
  },
];

export default function ProjectsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Projects</h2>
      <div className="space-y-8">
        {projects.map(({ title, description, link }) => (
          <div
            key={title}
            className="border-l-4 pl-4 border-[var(--color-line)]"
          >
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-[var(--color-muted)] mt-1">{description}</p>
            <a
              href={link}
              className="inline-block mt-2 text-sm text-[var(--color-primary)] hover:underline"
            >
              View project →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
