# React Portfolio

[![Commit Activity](https://img.shields.io/github/commit-activity/m/aftongauntlett/react-portfolio)](https://github.com/aftongauntlett/react-portfolio/commits)  
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)
[![CI/CD](https://github.com/aftongauntlett/react-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/aftongauntlett/react-portfolio/actions/workflows/ci.yml)

**Lighthouse Scores:**
![Performance](https://img.shields.io/badge/Performance-100%25-brightgreen?style=flat&logo=lighthouse)
![Accessibility](https://img.shields.io/badge/Accessibility-99%25-brightgreen?style=flat&logo=lighthouse)
![Best Practices](https://img.shields.io/badge/Best_Practices-100%25-brightgreen?style=flat&logo=lighthouse)
![SEO](https://img.shields.io/badge/SEO-100%25-brightgreen?style=flat&logo=lighthouse)

A modern, high-performance portfolio showcasing frontend engineering expertise. Built with React 19, TypeScript, and a comprehensive development toolchain featuring testing, bundle analysis, and exceptional performance optimization.

**Lighthouse Perfect Scores:** 100% Performance • 99% Accessibility • 100% Best Practices • 100% SEO

## Features

### **Core**

- **Dark/Light Mode**: System preference detection with manual toggle and animated theme switching
- **Responsive Design**: Mobile-first with fluid typography and optimized layouts
- **Smooth Animations**: Framer Motion with reduced-motion support and performance optimization
- **Interactive Animations**: Custom Lottie animations with dynamic theme-aware color integration
- **Interactive Effects**: Custom paint splash hover states and starry night background
- **Working Contact Form**: Formspree integration with form validation

### **Developer Experience**

- **Modern Stack**: React 19, TypeScript 5.8, Vite 7, Lottie React
- **Code Quality**: ESLint, Prettier, comprehensive testing with Vitest
- **Performance**: Optimized font loading, code splitting, bundle analysis
- **Accessibility**: WCAG AA compliant, full keyboard navigation, focus management
- **Error Handling**: Production-ready error boundaries and graceful degradation

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

**Contact form works out of the box** - no additional setup required.

## Performance

**Exceptional optimization delivering top-tier user experience:**

- **99% Performance Score**: Faster than 99% of websites tested
- **100% Accessibility**: WCAG AA compliant, full keyboard navigation
- **100% Best Practices**: Modern web standards and security
- **100% SEO**: Optimized for search engines and social sharing

### **Technical Optimizations:**

- **Font Loading**: Google Fonts with `display=swap` for zero layout shift
- **Bundle Optimization**: 99% Framer Motion reduction (115kB → 0.8kB)
- **Resource Hints**: Strategic preconnect and DNS prefetch
- **Code Splitting**: Vendor, router, motion, and icons chunks
- **Build Process**: esbuild minification with Vite 7

## Project Structure

```
src/
├── components/
│   ├── backgrounds/     # Animated background components (stars, geometric shapes)
│   ├── layout/          # Layout components (Header, Nav, etc.)
│   ├── sections/        # Page sections (About, Experience, Projects, Contact)
│   ├── shared/          # Reusable components (Button, ErrorBoundary, etc.)
│   └── Timeline/        # Timeline-specific components
├── hooks/               # Custom React hooks
├── pages/               # Page components (Home)
├── router/              # React Router setup and configuration
├── context/             # React context providers (theme management)
├── data/                # Static data (jobs, projects, skills)
├── constants/           # App constants and style utilities
├── assets/              # Static assets (Lottie animations, images)
└── test/                # Test configuration
```

## Tech Stack

**Frontend:** React 19, TypeScript, Tailwind CSS, Framer Motion, Lottie React  
**Build:** Vite 7 with esbuild minification and optimized code splitting  
**Testing:** Vitest, React Testing Library, TypeScript strict mode  
**Quality:** ESLint, Prettier, comprehensive TypeScript coverage  
**Performance:** Google Fonts optimization, strategic resource hints, dynamic imports

## Scripts

```bash
# Development
npm run dev          # Development server
npm run build        # Production build
npm run build:analyze # Build with bundle analyzer
npm run preview      # Preview build locally

# Testing & Quality
npm run test         # Run tests
npm run test:coverage # Test coverage report
npm run lint         # Code linting
npm run type-check   # TypeScript validation

# Security & Monitoring
npm run security:audit # Security vulnerability check
npm run deps:check   # Check outdated dependencies
npm run health:check # Full project health validation
```

## Maintenance & Monitoring

### **Automated Maintenance**

- **GitHub Dependabot**: Monthly patch-only dependency updates
- **CI/CD Pipeline**: Automated testing on all PRs
- **Security Monitoring**: npm audit integration
- **Only safe updates**: Major version updates require manual review

### **Analytics & Performance**

- **Vercel Analytics**: User behavior tracking
- **Speed Insights**: Core Web Vitals monitoring
- **Bundle Analysis**: Performance optimization tools

### **Long-term Care**

1. **Monthly**: Review and merge Dependabot PRs
2. **Quarterly**: Manual major version updates if needed
3. **As needed**: Security patches (automated alerts)

## Architecture

**Component-driven design** with TypeScript interfaces, custom hooks for state management, and CSS custom properties for theming. Follows modern React patterns with error boundaries and accessibility-first development.

## Deployment

**Live:** [aftongauntlett.com](https://aftongauntlett.com)  
**Hosted on:** Vercel with automatic deployments from `master` branch

Ready for deployment to any static hosting platform (Vercel, Netlify, GitHub Pages).

## Credits

**Lottie Animation:** Solar system animation adapted from community resources, dynamically themed and optimized for performance.

## License

MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Built with ♡ by [Afton Gauntlett](https://github.com/aftongauntlett) • Senior Frontend Engineer
