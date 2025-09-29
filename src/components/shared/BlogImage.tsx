interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}

export function BlogImage({ src, alt, caption, size = 'large', className = '' }: BlogImageProps) {
  const sizeClasses = {
    small: 'max-w-md',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'max-w-none',
  };

  // Create accessible caption ID from alt text - more reliable than parsing file paths
  const imageId = alt
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const captionId = caption ? `caption-${imageId}` : undefined;

  return (
    <figure className={`my-8 ${className}`} role="img" aria-labelledby={captionId}>
      <div className={`${sizeClasses[size]} mx-auto`}>
        {/* Light mode: subtle container reduces harsh contrast of dark game images against white bg */}
        <div className="relative rounded-lg overflow-hidden bg-gradient-to-b from-[var(--color-surface)] to-[var(--color-background)] p-6 shadow-lg border border-[var(--color-line)] dark:border-transparent dark:bg-none dark:p-0">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto rounded-lg dark:shadow-lg"
            loading="lazy"
          />
        </div>

        {caption && (
          <p
            id={captionId}
            className="text-[var(--color-muted)] text-sm lg:text-base leading-relaxed text-center mt-4 italic font-medium"
          >
            {caption}
          </p>
        )}
      </div>
    </figure>
  );
}
