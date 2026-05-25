import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { LenisProvider } from './context/LenisContext';
import Layout from './components/layout/Layout';

// Eager load home page - it's the main route and critical for LCP
import Home from './pages/Home';

const DevPerformanceOverlay = import.meta.env.DEV
  ? lazy(() => import('@/components/dev/PerformanceOverlay'))
  : null;

export default function App() {
  return (
    <ErrorBoundary>
      {DevPerformanceOverlay && (
        <Suspense fallback={null}>
          <DevPerformanceOverlay />
        </Suspense>
      )}
      <LenisProvider>
        <Layout>
          <Home />
        </Layout>
      </LenisProvider>
    </ErrorBoundary>
  );
}
