import clsx from 'clsx';

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'grid';
  count?: number;
  className?: string;
}

/**
 * Reusable skeleton loader component for different content types
 * Provides visual feedback while content is loading
 */
export default function SkeletonLoader({
  variant = 'card',
  count = 3,
  className = '',
}: SkeletonLoaderProps) {
  const renderCardSkeleton = () => (
    <div className="border border-[var(--color-line)] rounded-lg p-6 bg-[var(--color-background)]">
      <div className="flex gap-6">
        <div className="w-32 h-32 bg-[var(--color-muted)]/20 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-6 bg-[var(--color-muted)]/20 rounded w-3/4" />
          <div className="h-4 bg-[var(--color-muted)]/20 rounded w-1/2" />
          <div className="space-y-2">
            <div className="h-4 bg-[var(--color-muted)]/20 rounded" />
            <div className="h-4 bg-[var(--color-muted)]/20 rounded w-2/3" />
          </div>
          <div className="flex gap-2 mt-4">
            <div className="h-6 bg-[var(--color-muted)]/20 rounded w-16" />
            <div className="h-6 bg-[var(--color-muted)]/20 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderListSkeleton = () => (
    <div className="border border-[var(--color-line)] rounded-lg p-4 bg-[var(--color-surface)]">
      <div className="space-y-3">
        <div className="h-5 bg-[var(--color-muted)]/20 rounded w-2/3" />
        <div className="h-4 bg-[var(--color-muted)]/20 rounded w-full" />
        <div className="h-4 bg-[var(--color-muted)]/20 rounded w-4/5" />
      </div>
    </div>
  );

  const variants = {
    card: renderCardSkeleton,
    list: renderListSkeleton,
    grid: renderListSkeleton, // Can be extended for grid-specific layout
  };

  return (
    <div className={clsx('space-y-8 animate-pulse', className)}>
      {Array.from({ length: count }, (_, i) => (
        <div key={i}>{variants[variant]()}</div>
      ))}
    </div>
  );
}
