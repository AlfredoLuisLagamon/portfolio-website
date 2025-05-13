import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Improved navigation handler that works on mobile
  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Close mobile menu
      setMobileMenuOpen(false);

      // Small delay to ensure menu closing animation doesn't interfere
      setTimeout(() => {
        // Scroll to element with offset for header
        const headerOffset = 80; // Adjust based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }, 10);
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a
          href="#"
          className="text-2xl font-bold flex items-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            AlfredoLuis
          </span>
          <span className="text-gray-800">.dev</span>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {[
              { name: "About", delay: 0.1 },
              { name: "Projects", delay: 0.2 },
              { name: "Contact", delay: 0.3 },
            ].map((item) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
              >
                <motion.button
                  onClick={() => handleNavigation(item.name.toLowerCase())}
                  className="font-medium hover:text-blue-600 transition-colors relative group py-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </motion.button>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <motion.button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md focus:outline-none"
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={
                  mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="w-full h-0.5 bg-gray-800 origin-left"
              />
              <motion.span
                animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-full h-0.5 bg-gray-800"
              />
              <motion.span
                animate={
                  mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
                className="w-full h-0.5 bg-gray-800 origin-left"
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            className="md:hidden bg-white/95 backdrop-blur-sm shadow-lg absolute w-full"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              className="py-4 px-6 space-y-2"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07 } },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {["About", "Projects", "Contact"].map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 },
                  }}
                >
                  <motion.button
                    onClick={() => handleNavigation(item.toLowerCase())}
                    className="block w-full text-left py-3 px-4 font-medium hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {item}
                  </motion.button>
                </motion.li>
              ))}
            </motion.ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
