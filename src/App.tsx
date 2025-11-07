import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { JobContactProvider } from './context/JobContactContext';
import { LenisProvider } from './context/LenisContext';
import Layout from './components/layout/Layout';

// Lazy load home page - all content now lives here with hash-based navigation
const Home = lazy(() => import('./pages/Home'));

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
  return (
    <ErrorBoundary>
      <LazyMotion features={domAnimation} strict>
        <BrowserRouter>
          <LenisProvider>
            <JobContactProvider>
              <Suspense fallback={<LoadingFallback />}>
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
                  <Route path="/blog/js13k-2025-post-mortem" element={<JS13kPostMortem />} />
                  <Route
                    path="/blog/orbital-order-post-mortem"
                    element={<OrbitalOrderPostMortem />}
                  />
                  {/* All main navigation handled via hash routes in Home page */}
                  {/* /#about, /#projects, etc. */}
                </Routes>
              </Suspense>
            </JobContactProvider>
          </LenisProvider>
        </BrowserRouter>
      </LazyMotion>
    </ErrorBoundary>
  );
}
