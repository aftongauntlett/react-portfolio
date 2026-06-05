import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { LuExternalLink, LuGithub, LuX, LuZoomIn } from 'react-icons/lu';
import { useTheme } from '@/context/ThemeContext';
import { projects } from '@/data/projects';
import { TYPOGRAPHY } from '@/constants/styles';
import { COMPONENT_SPACING } from '@/constants/spacing';
import SectionEntryList from '@/components/shared/SectionEntryList';
import Button from '@/components/shared/Button';

export default function ProjectsSection() {
  type ProjectItem = (typeof projects)[number];
  const { theme } = useTheme();
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [lightboxSrc]);

  const renderProject = (
    { title, description, link, demo, playable, imageLight, imageDark }: ProjectItem,
    idx: number,
  ) => {
    const image = theme === 'dark' ? imageDark : imageLight;

    return (
      <article
        aria-labelledby={`project-title-${idx}`}
        className="flex flex-col md:flex-row md:items-start gap-5 py-3 md:py-4"
      >
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <h3
            id={`project-title-${idx}`}
            className={clsx(TYPOGRAPHY.SUBTITLE, 'text-[var(--color-primary)]')}
          >
            {title}
          </h3>
          <p className={TYPOGRAPHY.TEXT_DESCRIPTION}>{description}</p>
          <div className="flex gap-2">
            {demo && (
              <Button
                href={demo}
                variant="outline"
                color="primary"
                icon={<LuExternalLink size={14} />}
                aria-label={playable ? `Play ${title}` : `View ${title} live site`}
              >
                {playable ? 'Play Game' : 'View Live'}
              </Button>
            )}
            {link ? (
              <Button
                href={link}
                variant="outline"
                color="secondary"
                icon={<LuGithub size={14} />}
                aria-label={`${title} source code on GitHub`}
              >
                Source
              </Button>
            ) : (
              <span className={clsx(TYPOGRAPHY.TEXT_XS, 'flex items-center text-[var(--color-muted)]')}>
                Private
              </span>
            )}
          </div>
        </div>

        {image && (
          <button
            type="button"
            onClick={() => setLightboxSrc(image)}
            className="block shrink-0 w-full md:w-64 cursor-zoom-in"
            aria-label={`View ${title} screenshot fullsize`}
          >
            <div className="relative group/img">
              <img
                src={image}
                alt={`${title} screenshot`}
                className="block w-full rounded-md object-cover object-top"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/0 group-hover/img:bg-black/40 transition-all duration-200 pointer-events-none">
                <LuZoomIn
                  size={28}
                  className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-200"
                />
              </div>
            </div>
          </button>
        )}
      </article>
    );
  };

  return (
    <>
      {lightboxSrc && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project screenshot"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65 p-8"
          onClick={() => setLightboxSrc(null)}
        >
          <div
            className="relative max-w-5xl w-full rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxSrc(null)}
              className="absolute top-3 right-3 z-10 bg-black/50 hover:bg-black/75 text-white/80 hover:text-white rounded-full p-1.5 transition-colors"
              aria-label="Close screenshot"
            >
              <LuX size={16} />
            </button>
            <img
              src={lightboxSrc}
              alt="Project screenshot"
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
          </div>
        </div>,
        document.body,
      )}

      <div className={COMPONENT_SPACING.STACK_STANDARD}>
        <SectionEntryList
          items={projects}
          ariaLabel="Portfolio projects"
          listClassName="list-none"
          getItemKey={(project) => project.title}
          renderItem={(project, idx) => renderProject(project, idx)}
        />
      </div>
    </>
  );
}
