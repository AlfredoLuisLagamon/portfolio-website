import "../styles/globals.css";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ScrollAnimator from "../utils/ScrollAnimator";
import { inter } from "../utils/fonts";
import { initPerformanceOptimizations } from "../utils/performance";
import { ThemeProvider } from "../contexts/ThemeContext";
import ErrorBoundary from "../components/ErrorBoundary";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps, router }: AppProps) {
  const nextRouter = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Handle router loading states
  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    nextRouter.events.on('routeChangeStart', handleStart);
    nextRouter.events.on('routeChangeComplete', handleComplete);
    nextRouter.events.on('routeChangeError', handleComplete);

    return () => {
      nextRouter.events.off('routeChangeStart', handleStart);
      nextRouter.events.off('routeChangeComplete', handleComplete);
      nextRouter.events.off('routeChangeError', handleComplete);
    };
  }, [nextRouter]);

  // Initialize scroll animations
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();

    // Initialize ScrollAnimator to add animations to elements with .reveal class
    ScrollAnimator.init();

    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');

      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute("href");
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Account for fixed header
            const headerHeight = 80;
            const targetPosition =
              targetElement.getBoundingClientRect().top +
              window.pageYOffset -
              headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: "smooth",
            });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className={`${inter.variable} font-sans`}>
        <ErrorBoundary>
          {/* Loading Bar */}
          {isLoading && (
            <div className="fixed top-0 left-0 right-0 z-[100]">
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse" />
              <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 animate-bounce origin-left transform scale-x-0 animate-pulse" 
                   style={{ animation: 'loading-bar 1s ease-in-out infinite' }} />
            </div>
          )}

          {/* Persistent Layout */}
          <div className="flex flex-col min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50/30 to-blue-50/30 dark:from-slate-900/30 dark:to-blue-900/30">
            <Header />

            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={router.route}
                  initial="pageInitial"
                  animate="pageAnimate"
                  exit="pageExit"
                  variants={{
                    pageInitial: {
                      opacity: 0,
                      y: 20,
                    },
                    pageAnimate: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: "easeOut" },
                    },
                    pageExit: {
                      opacity: 0,
                      y: -20,
                      transition: { duration: 0.2, ease: "easeIn" },
                    },
                  }}
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <ErrorBoundary fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="text-center p-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                          Unable to load page
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                          Please refresh the page or try again later.
                        </p>
                        <button
                          onClick={() => window.location.reload()}
                          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Refresh Page
                        </button>
                      </div>
                    </div>
                  }>
                    {/* Page Content with padding for header */}
                    <div className="pt-20 md:pt-28 pb-12 md:pb-16">
                      <Component {...pageProps} />
                    </div>
                  </ErrorBoundary>
                </motion.div>
              </AnimatePresence>
            </main>

            <Footer />
          </div>
        </ErrorBoundary>

        <Analytics />

        {/* Add loading bar keyframes */}
        <style jsx>{`
          @keyframes loading-bar {
            0% { transform: scaleX(0); }
            50% { transform: scaleX(0.7); }
            100% { transform: scaleX(1); }
          }
        `}</style>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
