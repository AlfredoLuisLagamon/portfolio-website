import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface BackgroundAnimatorProps {
  variant?: "light" | "dark";
  intensity?: "subtle" | "medium" | "high";
  className?: string;
}

/**
 * An optimized component that adds subtle animated background elements to any section
 * - Uses IntersectionObserver to only animate when in viewport
 * - Reduces animation complexity for better performance
 * - Supports reduced motion preferences
 */
const OptimizedBackgroundAnimator: React.FC<BackgroundAnimatorProps> = ({
  variant = "light",
  intensity = "medium",
  className = "",
}) => {
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "200px",
  });

  // Check for reduced motion preference and client-side rendering
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Determine opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case "subtle":
        return variant === "light" ? 0.3 : 0.15;
      case "high":
        return variant === "light" ? 0.5 : 0.25;
      default:
        return variant === "light" ? 0.4 : 0.2;
    }
  };

  // Determine colors based on variant
  const getColors = () => {
    if (variant === "light") {
      return {
        first: "bg-blue-300",
        second: "bg-indigo-300",
        third: "bg-purple-300",
      };
    }
    return {
      first: "bg-blue-500",
      second: "bg-indigo-500",
      third: "bg-purple-500",
    };
  };

  const colors = getColors();
  const opacity = getOpacity();

  // Simpler and slower animations for better performance
  const shouldAnimate = isClient && inView && !prefersReducedMotion;

  // Define animation properties
  const animationProps = (delay = 0) => ({
    initial: { x: 0, y: 0, scale: 1 },
    animate: shouldAnimate
      ? {
          x: [0, -30, 0],
          y: [0, -35, 0],
          scale: [1, 1.05, 1],
        }
      : { x: 0, y: 0, scale: 1 },
    transition: {
      repeat: shouldAnimate ? Infinity : 0,
      duration: 20,
      ease: "easeInOut",
      delay: delay,
    },
  });

  const opacityClass = {
    subtle: "opacity-30 dark:opacity-15",
    medium: "opacity-40 dark:opacity-20",
    high: "opacity-50 dark:opacity-25",
  };

  return (
    <div
      ref={ref}
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
    >
      <motion.div
        className={`absolute top-1/4 right-10 w-96 h-96 rounded-full ${colors.first} blur-[100px] ${opacityClass[intensity] || opacityClass.medium}`}
        {...animationProps(0)}
      />
      <motion.div
        className={`absolute bottom-0 left-0 w-80 h-80 rounded-full ${colors.second} blur-[100px] ${opacityClass[intensity] || opacityClass.medium}`}
        {...animationProps(1)}
      />
      <motion.div
        className={`absolute top-1/2 left-1/4 w-64 h-64 rounded-full ${colors.third} blur-[100px] ${opacityClass[intensity] || opacityClass.medium}`}
        {...animationProps(2)}
      />
    </div>
  );
};

export default OptimizedBackgroundAnimator;
