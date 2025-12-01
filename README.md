# React Portfolio

[![CI/CD](https://github.com/aftongauntlett/react-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/aftongauntlett/react-portfolio/actions/workflows/ci.yml)
[![Last Commit](https://img.shields.io/github/last-commit/aftongauntlett/react-portfolio?style=flat&logo=github)](https://github.com/aftongauntlett/react-portfolio/commits)
![Tests](https://img.shields.io/badge/tests-passing-success)

## What This Is

A portfolio site built with React 19, TypeScript, and Vite. Uses hash-based navigation for a single-page experience with smooth scrolling between sections. Includes a working contact form, dark/light themes, and responsive design.

**[Live Site →](https://aftongauntlett.com)**

![Portfolio Preview - Dark Mode](./docs/dark.png)

## Stack

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)

- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite 7
- Vitest
- Hash-based navigation
- ESLint
- Prettier

## Architecture

Uses TypeScript interfaces, custom hooks, and CSS custom properties for theming. Includes error boundaries for error handling. Main content is organized into component folders (layout, sections, shared), with constants, context providers, data files, custom hooks, and utility functions.

## Highlights

- Dark/light mode with system preference detection
- Responsive design with mobile-first approach
- Smooth animations with reduced-motion support
- Working contact form (Formspree)
- Comprehensive testing (Vitest + React Testing Library)
- WCAG AA compliance

## Accessibility

- Full keyboard navigation with visible focus indicators
- WCAG AA compliant color contrast
- Reduced-motion support for animations
- Screen reader announcements for navigation changes
- Semantic HTML with proper ARIA labels

## Performance

Typical Lighthouse scores: ~95% Performance, 100% Accessibility, 100% Best Practices, 100% SEO. Scores vary by network and device conditions.

![Performance](https://img.shields.io/badge/Performance-95%25-brightgreen?style=flat&logo=lighthouse)
![Accessibility](https://img.shields.io/badge/Accessibility-100%25-brightgreen?style=flat&logo=lighthouse)
![Best Practices](https://img.shields.io/badge/Best_Practices-100%25-brightgreen?style=flat&logo=lighthouse)
![SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=flat&logo=lighthouse)

**Technical optimizations:**

- Font loading with `display=swap`
- Code splitting (vendor, motion, icons)
- Tree-shaking and selective imports
- Strategic resource hints (preconnect, DNS prefetch)
- esbuild minification

## Getting Started

```bash
# Clone and install
git clone https://github.com/aftongauntlett/react-portfolio.git
cd react-portfolio
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view locally.

## Scripts

```bash
# Development
npm run dev          # Start development server with HMR

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code quality
npm run type-check   # TypeScript validation
npm run lint         # ESLint with auto-fix
npm run test         # Run Vitest in watch mode
npm run test:run     # Run tests once (CI-friendly)
npm run test:coverage # Run tests with coverage report
npm run test:ui      # Interactive test UI
npm run test:watch   # Watch mode for development (alias for test)

# Analysis
npm run analyze      # Interactive bundle analyzer
npm run health:check # Run all checks (type-check, lint, test:run, build)
```

## Maintenance

**Automated updates:** Dependabot runs monthly for patches and minor versions. CI/CD validates all PRs. Security monitoring via npm audit.

**Manual tasks:** Review Dependabot PRs monthly. Major version updates quarterly as needed.

## Deployment

Deployed on Vercel with automatic deployments from the main branch.

**Production optimizations:**

- Bundle splitting for optimal loading
- Asset optimization and compression
- Aggressive caching for static assets
- Web Vitals tracking
- SEO meta tags and structured data

**Environment Variables:**  
None required. Contact form uses Formspree's client-side integration.

**Build Process:**

- TypeScript compilation with strict mode
- Bundle size monitoring
- Optimized image loading and lazy loading

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Built by [Afton Gauntlett](https://www.aftongauntlett.com/)
