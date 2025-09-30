import { FaArrowLeft, FaSun, FaMoon } from 'react-icons/fa';
import { Button } from '@/components/shared/Button';
import { useLocation } from 'react-router-dom';
import { navigateToPortfolio, navigateToBlog } from '@/utils/navigation';
import { TYPOGRAPHY } from '@/constants/typography';
import { useTheme } from '@/context/ThemeContext';

interface ExternalNavProps {
  onBackClick?: () => void;
}

export default function ExternalNav({ onBackClick }: ExternalNavProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isOnBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else if (isOnBlogPost) {
      // From blog post, go back to blog index
      navigateToBlog();
    } else {
      // From blog index or other pages, go to portfolio
      navigateToPortfolio();
    }
  };

  const getBackText = () => {
    if (isOnBlogPost) return 'Back to Blog';
    return 'Back to Portfolio';
  };

  return (
    <nav className="border-b border-[var(--color-line)] bg-[var(--color-background)]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Back button */}
          <Button
            onClick={handleBack}
            variant="link"
            className={`inline-flex items-center gap-2 ${TYPOGRAPHY.TEXT_SMALL} font-medium text-[var(--color-primary)] hover:text-[var(--color-text)] transition-colors`}
          >
            <FaArrowLeft className="w-3 h-3" />
            {getBackText()}
          </Button>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              onClick={toggleTheme}
              variant="link"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
              className="p-2 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {theme === 'light' ? <FaMoon className="w-4 h-4" /> : <FaSun className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
