import './index.css';
import AppRouter from './router';
import ErrorBoundary from './components/shared/ErrorBoundary';
import { JobContactProvider } from './context/JobContactContext';

export default function App() {
  return (
    <ErrorBoundary>
      <JobContactProvider>
        <AppRouter />
      </JobContactProvider>
    </ErrorBoundary>
  );
}
