import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
            {/* All main navigation handled via hash routes in Home page */}
            {/* /#about, /#projects, etc. */}
          </Routes>
        </LenisProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
