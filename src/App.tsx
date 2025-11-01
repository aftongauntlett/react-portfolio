import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { JobContactProvider } from './context/JobContactContext';
import { DetailViewProvider } from './context/DetailViewContext';
import Layout from './components/layout/Layout';

// Lazy load home page - all content now lives here with hash-based navigation
const Home = lazy(() => import('./pages/Home'));

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
          <JobContactProvider>
            <DetailViewProvider>
              <Layout>
                <Suspense fallback={<LoadingFallback />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    {/* All navigation now handled via hash routes in Home page */}
                    {/* /#about, /#projects, /#projects/portfolio, etc. */}
                  </Routes>
                </Suspense>
              </Layout>
            </DetailViewProvider>
          </JobContactProvider>
        </BrowserRouter>
      </LazyMotion>
    </ErrorBoundary>
  );
}
