'use client';

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_TRANSITION_MS = 400;

interface ThemeProviderProps {
  children: ReactNode;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function applyThemeClass(resolvedTheme: 'light' | 'dark') {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(resolvedTheme);
  root.style.colorScheme = resolvedTheme;
}

function runThemeTransition(resolvedTheme: 'light' | 'dark') {
  const root = document.documentElement;
  const update = () => applyThemeClass(resolvedTheme);

  if (prefersReducedMotion()) {
    update();
    return;
  }

  // Cross-fade via View Transitions when available (Chrome, Edge, Safari 18+)
  if (typeof document.startViewTransition === 'function') {
    document.startViewTransition(update);
    return;
  }

  // Fallback: CSS color/background interpolation
  root.classList.add('theme-transitioning');
  // Force a frame so the transition class is active before the theme swap
  requestAnimationFrame(() => {
    update();
    window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, THEME_TRANSITION_MS);
  });
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with the theme that's already applied to prevent flash
  const getInitialTheme = (): Theme => {
    if (typeof window === 'undefined') return 'system';
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    return savedTheme && ['light', 'dark', 'system'].includes(savedTheme) ? savedTheme : 'system';
  };

  const getInitialResolvedTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    // Check what theme is already applied by the script in _document.tsx
    const root = document.documentElement;
    if (root.classList.contains('dark')) return 'dark';
    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(getInitialResolvedTheme);
  const [isInitialized, setIsInitialized] = useState(false);
  const skipNextTransition = useRef(true);

  // Ensure state is synchronized after hydration
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const currentTheme = savedTheme && ['light', 'dark', 'system'].includes(savedTheme) ? savedTheme : 'system';

    if (currentTheme !== theme) {
      setTheme(currentTheme);
    }
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once after mount
  }, []);

  useEffect(() => {
    // Update resolvedTheme based on current theme
    const updateResolvedTheme = () => {
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setResolvedTheme(systemTheme);
      } else {
        setResolvedTheme(theme);
      }
    };

    updateResolvedTheme();

    // Listen for system theme changes when theme is 'system'
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => updateResolvedTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  useEffect(() => {
    if (!isInitialized) return;

    // First sync after hydration — theme is already on <html> from _document
    if (skipNextTransition.current) {
      skipNextTransition.current = false;
      applyThemeClass(resolvedTheme);
      return;
    }

    runThemeTransition(resolvedTheme);
  }, [resolvedTheme, isInitialized]);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    setTheme: handleSetTheme,
    resolvedTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
