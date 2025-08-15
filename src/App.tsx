import './index.css';
import Home from './pages/Home';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { JobContactProvider } from './context/JobContactContext';

export default function App() {
  return (
    <ErrorBoundary>
      <JobContactProvider>
        <Home />
      </JobContactProvider>
    </ErrorBoundary>
  );
}
