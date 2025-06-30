import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  isScrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isScrolled = false }) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-md animate-pulse bg-gray-200 dark:bg-gray-700" />
    );
  }

  const handleToggle = () => {
    // Add transition class to html for smooth theme switching
    document.documentElement.classList.add('theme-transitioning');
    
    // Toggle between light and dark (skip system for direct toggle)
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Remove transition class after animation
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
    }, 300);
  };

  return (
    <>
      {/* Desktop Version - Text Button */}
      <button
        onClick={handleToggle}
        className={`hidden md:inline-flex items-center px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none rounded-md ${
          isScrolled 
            ? 'text-gray-700 dark:text-gray-300'
            : 'text-gray-900 dark:text-white drop-shadow-sm'
        }`}
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        {resolvedTheme === 'light' ? 'Dark' : 'Light'}
      </button>

      {/* Mobile Version - Icon Button */}
      <motion.button
        onClick={handleToggle}
        className={`md:hidden inline-flex items-center justify-center p-2 rounded-md hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none transition-all duration-200 ${
          isScrolled
            ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
            : 'text-gray-900 dark:text-white drop-shadow-sm hover:bg-white/20 dark:hover:bg-black/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${resolvedTheme === 'light' ? 'dark' : 'light'} mode`}
      >
        <AnimatePresence mode="wait">
          {resolvedTheme === 'light' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {/* Moon Icon - shows when in light mode (click to go dark) */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {/* Sun Icon - shows when in dark mode (click to go light) */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default ThemeToggle; 