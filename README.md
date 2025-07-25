# React Portfolio

[![Commit Activity](https://img.shields.io/github/commit-activity/m/aftongauntlett/react-portfolio)](https://github.com/aftongauntlett/react-portfolio/commits)  
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)

A modern, accessible portfolio showcasing frontend engineering expertise. Built with React 19, TypeScript, and a comprehensive development toolchain featuring testing, bundle analysis, and 508 compliance.

## Features

### **Design & UX**

- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with fluid typography using `clamp()`
- **Smooth Animations**: Subtle Framer Motion effects with `prefers-reduced-motion` support
- **Paint Splash Effects**: Interactive hover states with CSS custom properties

### **Performance**

- **Code Splitting**: Vendor, router, and UI chunks for optimal loading
- **Bundle Analysis**: Visual bundle size tracking and optimization
- **Source Maps**: Production debugging support
- **Optimized Assets**: Font subsetting and compression

### **Accessibility (508 Compliant)**

- **Semantic HTML**: Proper landmarks, headings, and ARIA attributes
- **Keyboard Navigation**: Full keyboard accessibility with focus management
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Skip Links**: Direct navigation to main content
- **Color Contrast**: WCAG AA compliant color ratios

### **Developer Experience**

- **Modern Testing**: Vitest with React Testing Library
- **Type Safety**: Comprehensive TypeScript coverage
- **Code Quality**: ESLint + Prettier with automated formatting
- **Hot Reload**: Instant feedback during development

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/aftongauntlett/react-portfolio.git
cd react-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the portfolio.

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Layout/         # Main layout wrapper
│   │   ├── PageSection/    # Section containers
│   │   └── SideNav/        # Navigation sidebar
│   ├── sections/
│   │   ├── About/          # Introduction section
│   │   ├── Experience/     # Work timeline
│   │   ├── Projects/       # Portfolio projects
│   │   └── Contact/        # Contact information
│   └── shared/
│       ├── Button/         # Reusable button component
│       ├── FadeInSection/  # Intersection observer animations
│       └── PaintSplashEffect/ # Interactive text effects
├── constants/
│   └── navigation.ts       # Navigation configuration
├── context/
│   └── ThemeContext.tsx    # Theme management
├── hooks/
│   ├── useActiveSection.ts # Section tracking
│   └── useTheme.ts         # Theme utilities
├── pages/
│   └── Home.tsx            # Main page component
├── styles/
│   ├── theme.css           # CSS custom properties
│   └── index.css           # Global styles
└── test/
    └── setup.ts            # Test configuration
```

## Available Scripts

### Development

- `npm run dev` - Start development server
- `npm run preview` - Preview production build locally

### Building

- `npm run build` - Production build with optimization
- `npm run build:analyze` - Build + open bundle analyzer

### Testing

- `npm run test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:coverage` - Generate coverage report
- `npm run test:ui` - Interactive test UI

### Code Quality

- `npm run lint` - Check code with ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - TypeScript type checking

### Utilities

- `npm run clean` - Clean build artifacts

## Tech Stack

### Core

- **[React 19](https://react.dev/)** - UI library with latest features
- **[TypeScript 5.8](https://www.typescriptlang.org/)** - Type safety and developer experience
- **[Vite 7](https://vitejs.dev/)** - Lightning-fast build tool and dev server

### Styling

- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS framework
- **CSS Custom Properties** - Theme-agnostic color system
- **[Framer Motion 12](https://www.framer.com/motion/)** - Production-ready motion library

### Routing & Icons

- **[React Router 7](https://reactrouter.com/)** - Client-side routing
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons

### Testing & Quality

- **[Vitest](https://vitest.dev/)** - Fast unit testing framework
- **[React Testing Library](https://testing-library.com/react)** - Component testing utilities
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[Prettier](https://prettier.io/)** - Code formatting

### Development Tools

- **[Rollup Visualizer](https://github.com/btd/rollup-plugin-visualizer)** - Bundle analysis
- **[Axe-core](https://github.com/dequelabs/axe-core)** - Accessibility testing

## Design Philosophy

### Theming System

All colors use CSS custom properties (`var(--color-*)`) for consistent theming:

- No hardcoded Tailwind colors for theme elements

### Typography

- **Headings**: Montserrat for impact and professionalism
- **Body**: Inter for excellent readability
- **Fluid Scale**: `clamp()` functions for responsive typography

### Accessibility First

- Semantic HTML structure with proper landmarks
- ARIA attributes for complex interactions
- Keyboard navigation support
- Focus management and skip links
- Color contrast compliance (WCAG AA)
- Reduced motion preferences respected

## Performance

The application achieves excellent performance metrics:

- **Bundle Size**: ~118kb gzipped total
- **Code Splitting**: Automatic vendor/router/UI chunk separation
- **Font Optimization**: Subsetting for faster loading
- **Image Optimization**: Responsive images with proper sizing

## Testing

Comprehensive testing setup with:

- Unit tests for components and utilities
- Accessibility testing with axe-core
- Mocked browser APIs (IntersectionObserver, matchMedia)
- TypeScript integration for type-safe tests

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers with ES2020 support

## Deployment

The portfolio is optimized for static hosting platforms:

- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static file server

Build artifacts are generated in the `dist/` directory.

## License

MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

**Designed & Built by [Afton Gauntlett](https://github.com/aftongauntlett)**  
_Senior Frontend Engineer specializing in React, TypeScript, and accessible web applications_
