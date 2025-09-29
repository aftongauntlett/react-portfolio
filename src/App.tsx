import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Games from './pages/Games';
import Blog from './pages/Blog';
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
            <Route path="/games" element={<Games />} />
            <Route path="/blog" element={<Blog />} />
            {/* Blog post routes - using /blog prefix to avoid portfolio conflicts */}
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* Temporary redirect for direct slug access */}
            <Route path="/:slug" element={<BlogPost />} />
          </Routes>
        </JobContactProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
