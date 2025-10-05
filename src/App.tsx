import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { JobContactProvider } from './context/JobContactContext';

// Lazy load all pages to enable code splitting
const Home = lazy(() => import('./pages/Home'));
const GameDev = lazy(() => import('./pages/GameDev'));
const BlogPost = lazy(() => import('./pages/blog/BlogPost'));

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
      <BrowserRouter>
        <JobContactProvider>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Game Development page - shows games by default */}
              <Route path="/gamedev" element={<GameDev />} />
              {/* Blog page - shows blog posts */}
              <Route path="/blog" element={<GameDev />} />
              {/* Blog post routes - using /blog prefix to avoid portfolio conflicts */}
              <Route path="/blog/:slug" element={<BlogPost />} />
              {/* Temporary redirect for direct slug access */}
              <Route path="/:slug" element={<BlogPost />} />
              {/* Redirect old routes */}
              <Route path="/games" element={<GameDev />} />
            </Routes>
          </Suspense>
        </JobContactProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
