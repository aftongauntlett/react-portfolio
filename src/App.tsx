import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import GameDev from './pages/GameDev';
import BlogPost from './pages/blog/BlogPost';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { JobContactProvider } from './context/JobContactContext';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <JobContactProvider>
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
        </JobContactProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
