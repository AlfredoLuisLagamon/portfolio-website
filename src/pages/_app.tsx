import "../styles/globals.css";
import type { AppProps } from "next/app";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import { useEffect } from "react";
import ScrollAnimator from "../utils/ScrollAnimator";
import { inter } from "../utils/fonts";
import { initPerformanceOptimizations } from "../utils/performance";

function MyApp({ Component, pageProps, router }: AppProps) {
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
    <div className={`${inter.variable} font-sans`}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: {
              opacity: 0,
            },
            pageAnimate: {
              opacity: 1,
              transition: { duration: 0.3 },
            },
            pageExit: {
              opacity: 0,
              transition: { duration: 0.3 },
            },
          }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default MyApp;
