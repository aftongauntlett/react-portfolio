# React Portfolio

![React](https://img.shields.io/badge/React_19-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

Modern portfolio site showcasing clean React architecture and accessibility-first development.

**[View Live Site →](https://aftongauntlett.com)**
## Key Features

- **Type-Safe Architecture** — Strict TypeScript with no `any` types in production code
- **Accessibility First** — ARIA labels, keyboard navigation, reduced motion support, and semantic HTML
- **Tested** — 85 passing tests covering components, hooks, and utilities with Vitest + React Testing Library
- **Performance** — Lazy loading, code splitting, smooth scrolling with Lenis
- **Responsive Design** — Mobile-first approach with Tailwind CSS utilities

## Tech Stack

- React 19 with functional components and modern hooks patterns
- TypeScript 5.8 with strict mode enabled
- Vite for fast builds and HMR
- Framer Motion for animations
- Tailwind CSS for styling
- Vitest + React Testing Library for testing

## Project Structure

Clean separation of concerns with reusable components, custom hooks, and utility functions:

- [src/components/](src/components/) — UI components organized by domain (layout, sections, shared)
- [src/hooks/](src/hooks/) — Custom React hooks (`useActiveSection`, `useLenis`, `usePrefersReducedMotion`)
- [src/utils/](src/utils/) — Helper functions for dates, scrolling, and formatting
- [src/data/](src/data/) — Centralized content configuration



## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Built by [Afton Gauntlett](https://www.aftongauntlett.com/)
