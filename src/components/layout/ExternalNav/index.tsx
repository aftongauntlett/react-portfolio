import { FaArrowLeft, FaHome } from 'react-icons/fa';
import { Button } from '@/components/shared/Button';
import { useLocation } from 'react-router-dom';
import { navigateToPortfolio, navigateToBlog } from '@/utils/navigation';

interface ExternalNavProps {
  onBackClick?: () => void;
}

export default function ExternalNav({ onBackClick }: ExternalNavProps) {
  const location = useLocation();
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

  const handlePortfolio = () => {
    navigateToPortfolio();
  };

  const getBackText = () => {
    if (isOnBlogPost) return 'Back to Blog';
    return 'Back to Portfolio';
  };

  return (
    <nav className="border-b border-[var(--color-line)] bg-[var(--color-background)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-hover)] transition-colors"
          >
            <FaArrowLeft className="w-3 h-3" />
            {getBackText()}
          </Button>

          {/* Show Portfolio link when on blog post (2 levels deep) */}
          {isOnBlogPost && (
            <Button
              onClick={handlePortfolio}
              variant="outline"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <FaHome className="w-3 h-3" />
              Portfolio
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
