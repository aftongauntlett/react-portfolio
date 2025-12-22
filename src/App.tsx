import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { LenisProvider } from './context/LenisContext';
import Layout from './components/layout/Layout';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';

// Eager load home page - it's the main route and critical for LCP
import Home from './pages/Home';

// Lazy load standalone post-mortem pages (for external links only)
const JS13kPostMortem = lazy(() => import('./pages/blog/JS13kPostMortem'));
const OrbitalOrderPostMortem = lazy(() => import('./pages/blog/OrbitalOrderPostMortem'));

// Loading component for code splitting
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-primary)]"></div>
    </div>
  );
}

export default function App() {
  const { enabled, fps, longTaskCount, scrollEventsPerSecond } = usePerformanceMonitor();

  return (
    <ErrorBoundary>
      {enabled && (
        <div
          className="fixed bottom-3 right-3 z-[100] rounded border border-[var(--color-line)] bg-[var(--color-background)]/80 px-3 py-2 text-xs text-[var(--color-text)] backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <div>FPS: {fps}</div>
          <div>Long tasks: {longTaskCount}</div>
          <div>Scroll events/s: {scrollEventsPerSecond}</div>
        </div>
      )}
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <LenisProvider>
            <Routes>
              {/* Main portfolio route with full layout */}
              <Route
                path="/"
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              {/* Standalone post-mortem pages (no layout/sidenav - for external links only) */}
              <Route
                path="/blog/js13k-2025-post-mortem"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <JS13kPostMortem />
                  </Suspense>
                }
              />
              <Route
                path="/blog/orbital-order-post-mortem"
                element={
                  <Suspense fallback={<LoadingFallback />}>
                    <OrbitalOrderPostMortem />
                  </Suspense>
                }
              />
              {/* All main navigation handled via hash routes in Home page */}
              {/* /#about, /#projects, etc. */}
            </Routes>
          </LenisProvider>
        </BrowserRouter>
      </LazyMotion>
    </ErrorBoundary>
  );
}
