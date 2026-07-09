import React, { useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { scrollToSection } from "../utils/scrollToSection";

const NAV_ITEMS = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work Samples" },
  { id: "contact", label: "Contact" },
] as const;

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    closeMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSectionNav = (sectionId: string) => {
    closeMenu();
    scrollToSection(sectionId);
    window.history.replaceState(null, "", `#${sectionId}`);
  };

  const navLinkClass = (isScrolled: boolean) =>
    `px-3 py-2 text-sm font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none rounded-md ${
      isScrolled
        ? "text-gray-700 dark:text-gray-300"
        : "text-gray-900 dark:text-white drop-shadow-sm"
    }`;

  const mobileNavLinkClass =
    "block w-full text-left px-4 py-3 text-base font-medium transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:outline-none rounded-lg text-gray-700 dark:text-gray-300";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled || isMenuOpen
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-b border-gray-200/30 dark:border-white/15 shadow-md"
          : "bg-transparent backdrop-blur-none border-b border-transparent"
      }`}
      role="banner"
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        role="navigation"
        aria-label="Main navigation"
      >
        <div
          className={`transition-all duration-300 ease-in-out ${
            isScrolled ? "h-12 md:h-14" : "h-16 md:h-20"
          }`}
        >
          {/* Mobile Layout */}
          <div className="flex items-center justify-between h-full md:hidden">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={handleLogoClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Scroll to top"
            >
              {mounted ? (
                <img
                  src={
                    resolvedTheme === "dark"
                      ? "/images/Logo_dark.png"
                      : "/images/Logo_light.png"
                  }
                  alt="Alfredo Luis Lagamon Logo"
                  className={`h-8 w-auto transition-all duration-300 ease-in-out ${
                    isScrolled ? "h-7" : "h-8"
                  } ${!isScrolled ? "drop-shadow-sm" : ""}`}
                />
              ) : (
                <div
                  className={`h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${
                    isScrolled ? "h-7" : "h-8"
                  }`}
                />
              )}
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle isScrolled={isScrolled} />

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`inline-flex items-center justify-center p-2.5 rounded-lg transition-all duration-200 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none ${
                  isScrolled
                    ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    : "text-gray-900 dark:text-white drop-shadow-sm hover:bg-white/20 dark:hover:bg-black/20"
                }`}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
              >
                <span className="sr-only">
                  {isMenuOpen ? "Close main menu" : "Open main menu"}
                </span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:grid md:grid-cols-3 md:items-center md:h-full">
            <div
              className="flex-shrink-0 cursor-pointer justify-self-start"
              onClick={handleLogoClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleLogoClick();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Scroll to top"
            >
              <p
                className={`font-bold transition-all duration-300 ease-in-out ${
                  isScrolled
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-white drop-shadow-sm"
                }`}
              >
                <span className="text-xl">Alfredo Luis Lagamon</span>
              </p>
            </div>

            <div className="flex justify-center">
              <div className="flex items-baseline space-x-6">
                {NAV_ITEMS.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleSectionNav(id)}
                    className={navLinkClass(isScrolled)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-self-end">
              <ThemeToggle isScrolled={isScrolled} />
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div
            className="md:hidden"
            id="mobile-menu"
            role="menu"
            aria-orientation="vertical"
          >
            <div className="px-3 pt-3 pb-4 space-y-2 border-t border-gray-200/20 dark:border-white/10">
              {NAV_ITEMS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSectionNav(id)}
                  className={mobileNavLinkClass}
                  role="menuitem"
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
