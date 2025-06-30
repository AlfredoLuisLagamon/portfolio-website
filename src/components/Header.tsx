import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  // Prevent hydration mismatch for theme-dependent logo
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll-based header transitions
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 20);
    };

    // Set initial state
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    closeMenu();
  };

  const handleKeyDown = (event: React.KeyboardEvent, path: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigation(path);
    }
  };

  const isActivePage = (path: string) => {
    if (path === '/' && router.pathname === '/') return true;
    if (path !== '/' && router.pathname === path) return true;
    return false;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-white/15 shadow-md'
          : 'bg-transparent backdrop-blur-none border-b border-transparent'
      }`}
      role="banner"
    >
      <nav 
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={`transition-all duration-300 ease-in-out ${
          isScrolled ? 'h-12 md:h-14' : 'h-16 md:h-20'
        }`}>

          {/* Mobile Layout - 2 columns */}
          <div className="flex items-center justify-between h-full md:hidden">
            {/* Logo/Brand - Left */}
                         <div 
               className="flex-shrink-0 cursor-pointer"
               onClick={() => handleNavigation('/')}
               onKeyDown={(e) => handleKeyDown(e, '/')}
               tabIndex={0}
               role="button"
               aria-label="Go to homepage"
             >
               {mounted ? (
                 <img
                   src={resolvedTheme === 'dark' ? '/images/Logo_dark.png' : '/images/Logo_light.png'}
                   alt="Alfredo Luis Lagamon Logo"
                   className={`h-8 w-auto transition-all duration-300 ease-in-out ${
                     isScrolled ? 'h-7' : 'h-8'
                   } ${!isScrolled ? 'drop-shadow-sm' : ''}`}
                 />
               ) : (
                 <div className={`h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${
                   isScrolled ? 'h-7' : 'h-8'
                 }`} />
               )}
             </div>

            {/* Right side: Theme toggle and mobile menu */}
            <div className="flex items-center space-x-4">
              <ThemeToggle isScrolled={isScrolled} />
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className={`inline-flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    : 'text-gray-900 dark:text-white drop-shadow-sm hover:bg-white/20 dark:hover:bg-black/20'
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              >
                <span className="sr-only">{isMenuOpen ? "Close main menu" : "Open main menu"}</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout - 3 columns */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:h-full">
            {/* Logo/Brand - Left */}
                         <div 
               className="flex-shrink-0 cursor-pointer justify-self-start"
               onClick={() => handleNavigation('/')}
               onKeyDown={(e) => handleKeyDown(e, '/')}
               tabIndex={0}
               role="button"
               aria-label="Go to homepage"
             >
               <h1 className={`font-bold transition-all duration-300 ease-in-out ${
                 isScrolled 
                   ? 'text-gray-900 dark:text-white' 
                   : 'text-gray-900 dark:text-white drop-shadow-sm'
               }`}>
                 <span className="text-xl">Alfredo Luis Lagamon</span>
               </h1>
             </div>

            {/* Desktop Navigation - Center */}
            <div className="flex justify-center">
              <div className="flex items-baseline space-x-8">
                {[
                  { path: '/', label: 'Home' },
                  { path: '/about', label: 'About' },
                  { path: '/projects', label: 'Projects' },
                  { path: '/contact', label: 'Contact' }
                ].map(({ path, label }) => (
                  <button
                    key={path}
                    onClick={() => handleNavigation(path)}
                    onKeyDown={(e) => handleKeyDown(e, path)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none rounded-md ${
                      isActivePage(path)
                        ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                        : isScrolled 
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-900 dark:text-white drop-shadow-sm'
                    }`}
                    aria-current={isActivePage(path) ? 'page' : undefined}
                    tabIndex={0}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

                         {/* Right side: Theme toggle only */}
             <div className="flex items-center justify-self-end">
               <ThemeToggle isScrolled={isScrolled} />
             </div>
           </div>
         </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div 
            className="md:hidden"
            id="mobile-menu"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="mobile-menu-button"
          >
            <div className="px-3 pt-3 pb-4 space-y-2 border-t border-gray-200/20 dark:border-white/10">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/projects', label: 'Projects' },
                { path: '/contact', label: 'Contact' }
              ].map(({ path, label }) => (
                <button
                  key={path}
                  onClick={() => handleNavigation(path)}
                  onKeyDown={(e) => handleKeyDown(e, path)}
                  className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none rounded-lg ${
                    isActivePage(path)
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  role="menuitem"
                  aria-current={isActivePage(path) ? 'page' : undefined}
                  tabIndex={0}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
