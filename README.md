# Social Media Style Portfolio Website

A modern, social media-inspired portfolio website built with React, Next.js, TypeScript, and Tailwind CSS. This portfolio showcases a clean glass morphism design with comprehensive SEO optimization, accessibility features, and performance enhancements.

## ✨ Features

### 🎨 Design & UI
- **Social Media Aesthetic**: Compact profile card with clean, modern layout
- **Glass Morphism Design**: Beautiful glass-style components with backdrop blur effects
- **Dark/Light Mode**: Complete theme system with smooth transitions
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Animated Tech Stack**: Scrolling technology badges inspired by modern design trends

### 🚀 Performance & SEO
- **SEO Optimized**: Comprehensive meta tags, Open Graph, Twitter Cards, and structured data
- **Image Optimization**: WebP support, responsive sizing, blur placeholders, and lazy loading
- **Core Web Vitals**: Optimized for LCP, FID, and CLS metrics
- **Bundle Analysis**: Built-in bundle analyzer for performance monitoring

### ♿ Accessibility
- **WCAG Compliant**: Comprehensive ARIA labels, semantic HTML, and keyboard navigation
- **Screen Reader Support**: Descriptive alt texts and proper heading hierarchy
- **Reduced Motion**: Respects user motion preferences for accessibility
- **Focus Management**: Proper focus indicators and tab order

### 🛠️ Technical Features
- **Error Boundaries**: Production-ready error handling with fallback UI
- **Progressive Enhancement**: Modular components that work independently
- **TypeScript**: Full type safety throughout the application
- **Performance Monitoring**: Built-in performance optimization utilities

## 🏗️ Project Structure

```
portfolio-website/
├── public/
│   ├── images/           # Project screenshots and profile photos
│   └── favicon.ico
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── cards/        # Card system (ProfileCard, ContentCard, BaseCard)
│   │   ├── glass/        # Glass morphism components
│   │   ├── Header.tsx    # Navigation with active page indication
│   │   ├── Footer.tsx    # Site footer
│   │   ├── TechStackMarquee.tsx  # Animated technology showcase
│   │   ├── ProjectsSection.tsx   # Individual project cards
│   │   ├── ExperienceSection.tsx # Professional timeline
│   │   ├── ContactSection.tsx    # Contact information with accessibility
│   │   ├── ErrorBoundary.tsx     # Error handling component
│   │   └── ThemeToggle.tsx       # Dark/light mode switcher
│   ├── contexts/
│   │   └── ThemeContext.tsx      # Theme management
│   ├── data/             # Static data files
│   │   ├── projects.ts   # Project information
│   │   ├── experience.ts # Work experience data
│   │   └── profile.ts    # Personal information
│   ├── pages/            # Next.js pages
│   │   ├── index.tsx     # Home page
│   │   ├── about.tsx     # About page
│   │   ├── projects.tsx  # Projects showcase
│   │   ├── contact.tsx   # Contact page
│   │   ├── _app.tsx      # App configuration
│   │   └── _document.tsx # Document head configuration
│   ├── styles/
│   │   ├── globals.css   # Global styles with CSS custom properties
│   │   └── tailwind.css  # Tailwind CSS imports
│   ├── types/
│   │   └── project.d.ts  # TypeScript type definitions
│   └── utils/            # Utility functions
│       ├── fonts.ts      # Font optimization
│       ├── imageOptimization.ts  # Image handling utilities
│       ├── performance.ts        # Performance monitoring
│       ├── ScrollAnimator.ts     # Scroll-based animations
│       └── useReducedMotion.ts   # Accessibility hook
├── eslint.config.mjs     # ESLint configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── next.config.js        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
└── TODO_LIST.md          # Development roadmap
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlfredoLuisLagamon/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run analyze      # Analyze bundle size
npm run clean        # Clean build artifacts
npm run format       # Format code with Prettier
```

## 🎯 Recent Improvements (Latest)

### Phase 5: Polish & Optimization ✅
- ✅ **Comprehensive SEO Enhancement** - Meta tags, Open Graph, Twitter Cards, structured data
- ✅ **Advanced Accessibility Features** - ARIA labels, semantic HTML, keyboard navigation
- ✅ **Image Optimization Utilities** - WebP support, responsive sizing, blur placeholders
- ✅ **Error Boundary Implementation** - Production-ready error handling
- ✅ **Performance Optimizations** - Hardware acceleration, lazy loading, bundle optimization

### Code Cleanup & Quality Improvements ✅
- ✅ **ESLint Configuration Fixed** - Properly excludes build directories
- ✅ **Unused Code Removal** - Cleaned up unused imports, variables, and components
- ✅ **Code Quality** - Reduced ESLint issues from 4000+ to 17 warnings
- ✅ **Type Safety** - Enhanced TypeScript interfaces and type definitions
- ✅ **Performance** - Removed unused dependencies and optimized imports

## 🔧 Technologies Used

### Core Framework
- **React 18**: Latest React with hooks and concurrent features
- **Next.js 15**: Full-stack React framework with SSG/SSR
- **TypeScript**: Full type safety and better development experience

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **Glass Morphism**: Custom CSS with backdrop filters

### Performance & SEO
- **Next.js Image**: Optimized image component
- **Bundle Analyzer**: Bundle size analysis
- **Web Vitals**: Core Web Vitals monitoring

### Development Tools
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Rimraf**: Cross-platform file removal

## 📊 Performance Metrics

- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Optimized LCP, FID, and CLS
- **Bundle Size**: Optimized with tree shaking and code splitting
- **Accessibility**: WCAG 2.1 AA compliant

## 🌟 Key Components

### ProfileCard
Social media-style profile card with animated elements and social links.

### TechStackMarquee  
Animated scrolling technology badges with alternating directions and smooth infinite loops.

### Glass Components
Reusable glass morphism components (GlassCard, GlassButton, GlassContainer) with consistent styling.

### Error Boundary
Production-ready error handling with user-friendly fallback UI.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Alfredo Luis Lagamon**
- Website: [https://alfredolagamon.com](https://alfredolagamon.com)
- GitHub: [@AlfredoLuisLagamon](https://github.com/AlfredoLuisLagamon)
- LinkedIn: [alfredo-luis-lagamon](https://www.linkedin.com/in/alfredo-luis-lagamon-a70065236/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [TODO_LIST.md](TODO_LIST.md) for planned features and improvements.

---

**Built with ❤️ using modern web technologies**