/**
 * Navigation utilities for consistent URL handling across the application
 */

export const NAVIGATION_URLS = {
  PORTFOLIO: '/?scrollTo=projects',
  BLOG: '/blog',
} as const;

export function navigateToPortfolio(): void {
  window.location.href = NAVIGATION_URLS.PORTFOLIO;
}

export function navigateToBlog(): void {
  window.location.href = NAVIGATION_URLS.BLOG;
}
