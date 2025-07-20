# React Portfolio

[![Commit Activity](https://img.shields.io/github/commit-activity/m/aftongauntlett/react-portfolio)](https://github.com/aftongauntlett/react-portfolio/commits)  
![React](https://img.shields.io/badge/React-2023C8?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)

My personal developer portfolio, built with React 19, Vite, Tailwind CSS, and a fluid, themeable design system. This site is designed to showcase my frontend skills, project work, and design sensibility, with a focus on accessibility, clean code, and real-world UI architecture.

## Features

- **React 19** with functional components, hooks, and idiomatic project structure
- **Vite** for lightning-fast dev builds and instant HMR
- **Tailwind CSS v3.4** for atomic styling, fluid `clamp()` typography, and utility-first layouts
- **Custom Theming** via CSS variables (no Tailwind color utilities) with dark/light mode support
- **Reusable Components**: Button, Section, ProjectCard, SideNav, and more
- **Framer Motion** for subtle, modern animations
- **Lucide React Icons** for scalable, accessible icons
- **File-based Routing** using react-router-dom
- **Accessible Design** with semantic HTML and keyboard-friendly navigation
- **Mobile-First Layout** with smooth transitions and responsive spacing

## Getting Started

### 1. Clone the Repo

- git clone https://github.com/aftongauntlett/react-portfolio.git
- cd react-portfolio

### 2. Install Dependencies

```
npm install
```

### 3. Run the Dev Server

```
npm run dev
```

### 4. Open Browser

- Open http://localhost:5173 to view the site locally.

## Folder Structure (Relevant Parts)

src/  
 components/  
 layout/  
 Layout.tsx  
 PageSection.tsx  
 SideNav/  
 shared/  
 Button/  
 PaintSplash/  
 ...  
 pages/  
 Home.tsx  
 About.tsx  
 Projects.tsx  
 Contact.tsx  
 styles/  
 theme.css  
 index.css  
 App.tsx  
 main.tsx

## Scripts

- npm run dev — Start local development server
- npm run build — Build for production
- npm run preview — Preview the production build locally
- npm run lint — Run ESLint on all source files

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 3.4.3
- TypeScript 5.8
- Framer Motion 12
- Lucide React Icons
- @fontsource (Inter, Montserrat, Orbitron, Outfit)
- react-router-dom 7.6

## Theming Approach

This portfolio uses CSS variables for all colors and theme toggling. All color references use the `[var(--color-...)]` format, with a single source of truth in `theme.css` for easy updates and theming. No Tailwind color utilities are used for theme colors - just CSS custom properties.

## Accessibility & UX

- All components use semantic HTML and are keyboard accessible
- Dark and light modes are supported, with accessible color contrast
- Responsive design is fully fluid—no fixed pixel values for typography or spacing

## License

MIT License

Copyright (c) 2025 Afton Gauntlett

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
