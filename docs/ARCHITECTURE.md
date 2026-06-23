# Architecture Documentation

## Overview

This is an interactive portfolio application built as a full-screen presentation. The application uses a modern React stack with TypeScript.

## Technology Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript 5.8.2** - Type safety
- **Vite 6.2.0** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling (loaded via CDN)

### Testing
- **Vitest 3.2.4** - Testing framework
- **React Testing Library 16.3.1** - Component testing
- **jsdom 27.0.1** - DOM testing environment

## Directory Structure

```
LoPortfolio/
├── components/           # Reusable UI components
│   ├── ErrorBoundary.tsx    # Error boundary for graceful error handling
│   ├── Navigation.tsx       # Slide navigation dots
│   ├── GlassCard.tsx        # Glassmorphism card component
│   ├── DetailPageRouter.tsx # Router for detail pages with lazy loading
│   └── OrbitDiagram.tsx     # Orbital ecosystem visualization
│
├── hooks/                # Custom React hooks
│   └── useNavigationState.ts # Navigation state management with useReducer
│
├── pages/                # Detail page components (11 pages)
│   ├── PorschePanamera.tsx
│   ├── DucatiMultistradaV4.tsx
│   └── ...
│
├── slides/               # Main presentation slides (7 slides)
│   ├── Cover.tsx
│   ├── Quote.tsx
│   ├── Experience.tsx
│   ├── Funnel.tsx
│   ├── OrbitSystem.tsx
│   ├── Roadmap.tsx
│   └── Conclusion.tsx
│
├── docs/                 # Documentation
│   └── ARCHITECTURE.md      # This file
│
├── constants.ts          # Shared constants and types
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main application component
├── index.tsx             # React entry point
└── vite.config.ts        # Vite configuration
```

## Component Architecture

### Application Flow

```
index.tsx (Entry Point)
    ↓
ErrorBoundary (Error Handling)
    ↓
App.tsx (Main App Logic)
    ↓
├── DetailPageRouter (if on detail page)
└── Slides View (default)
    ├── Navigation
    └── Slide Components
```

### State Management

The application uses a **custom useReducer hook** (`useNavigationState`) for managing navigation state:

```typescript
NavigationState {
  activeSlide: string          // Current slide ID
  currentPage: 'slides' | PageId  // Current view
  returnToSlide: string        // Slide to return to from detail page
  activeTab: TabType           // Active tab in ecosystem view
}
```

**Actions:**
- `SET_ACTIVE_SLIDE` - Update current slide
- `SET_ACTIVE_TAB` - Update active tab
- `NAVIGATE_TO_DETAIL_PAGE` - Navigate to detail page
- `NAVIGATE_BACK_TO_SLIDES` - Return to slides view

### Detail Page Routing

The `DetailPageRouter` component handles dynamic loading of detail pages:

- **Lazy Loading:** All detail pages are loaded on-demand using `React.lazy()`
- **Loading State:** Shows loading fallback during code splitting
- **Error Handling:** Displays 404 for unknown page IDs
- **Suspense Boundary:** Wraps lazy-loaded components

```typescript
// Example: Lazy loading a detail page
const PorschePanamera = lazy(() =>
  import('../pages/PorschePanamera').then(m => ({ default: m.PorschePanamera }))
);
```

### Slide Navigation

- **Scroll-based:** Uses `snap-y` CSS for smooth scrolling
- **Keyboard Navigation:** Accessible via keyboard
- **Visual Indicators:** Dot navigation on the right side
- **Active State:** Current slide highlighted

## Design Patterns

### Glassmorphism

The UI uses a glassmorphism design pattern:
- `bg-white/10` - Semi-transparent background
- `backdrop-blur-md` - Blur effect
- `border border-white/20` - Subtle borders

### Background Texture

All views include a noise texture overlay:
```tsx
<div className="fixed inset-0 pointer-events-none opacity-20
  bg-[url('https://grainy-gradients.vercel.app/noise.svg')]
  brightness-100 contrast-150 z-0"
  aria-hidden="true"
></div>
```

### Constants Management

All magic numbers and configuration are centralized in `constants.ts`:
- Animation durations
- Page IDs (using `as const` for type safety)

## Performance Optimizations

1. **Code Splitting:**
   - Detail pages loaded on-demand
   - Reduces initial bundle size

2. **Lazy Loading:**
   - Images loaded as needed
   - React components split by route

3. **Memoization Opportunities:**
   - OrbitDiagram calculations could be memoized
   - Slide components could use React.memo

## Accessibility

- **ARIA Labels:** All interactive elements labeled
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** Proper semantic HTML
- **Focus Management:** Visible focus indicators

## Testing Strategy

### Running Tests
```bash
npm test           # Run tests in watch mode
npm run test:ui    # Open Vitest UI
npm run test:coverage  # Generate coverage report
```

## Build & Deployment

### Development
```bash
npm run dev  # Start dev server on port 3000
```

### Production Build
```bash
npm run build  # Build to /dist
```

### Netlify Deployment

**Build Settings:**
- Build command: `npm run build`
- Publish directory: `dist`

## Future Improvements

1. **Analytics:** Add privacy-respecting analytics
2. **SEO:** Add meta tags and Open Graph tags
3. **Performance Monitoring:** Add error tracking (Sentry)
4. **A11y Audit:** Run automated accessibility tests
5. **E2E Tests:** Add Playwright/Cypress tests