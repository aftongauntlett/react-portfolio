import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

export default function PerformanceOverlay() {
  const { enabled, fps, longTaskCount, scrollEventsPerSecond } = usePerformanceMonitor();

  if (!enabled) return null;

  return (
    <div
      className="fixed bottom-3 right-3 z-[100] rounded border border-[var(--color-line)] bg-[var(--color-background)]/80 px-3 py-2 text-xs text-[var(--color-text)] backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div>FPS: {fps}</div>
      <div>Long tasks: {longTaskCount}</div>
      <div>Scroll events/s: {scrollEventsPerSecond}</div>
    </div>
  );
}
