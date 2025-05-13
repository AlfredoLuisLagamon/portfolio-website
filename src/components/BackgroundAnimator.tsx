import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface BackgroundAnimatorProps {
  variant?: "light" | "dark";
  intensity?: "subtle" | "medium" | "high";
  className?: string;
  reducedMotion?: boolean;
}

/**
 * A component that adds subtle animated background elements to any section
 * Use this to create visual interest without being distracting
 * Now with performance optimizations and reduced motion support
 */
const BackgroundAnimator: React.FC<BackgroundAnimatorProps> = ({
  variant = "light",
  intensity = "medium",
  className = "",
  reducedMotion = false,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "200px",
  });

  // Only animate when component is in viewport and client-side
  useEffect(() => {
    setIsClient(true);
  }, []);
  // Determine opacity based on intensity
  const getOpacity = () => {
    switch (intensity) {
      case "subtle":
        return variant === "light" ? 0.4 : 0.2; // Increased for better visibility
      case "high":
        return variant === "light" ? 0.6 : 0.35; // Increased for better visibility
      default:
        return variant === "light" ? 0.5 : 0.25; // Increased for better visibility
    }
  };

  // Determine colors based on variant
  const getColors = () => {
    if (variant === "light") {
      return {
        first: "bg-blue-300",
        second: "bg-indigo-300",
        third: "bg-purple-300",
        fourth: "bg-cyan-300",
      };
    }
    return {
      first: "bg-blue-500",
      second: "bg-indigo-500",
      third: "bg-purple-500",
      fourth: "bg-cyan-500",
    };
  };

  const colors = getColors();
  const opacity = getOpacity();

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}
      style={{ opacity: 1 }} // Ensure the container is fully visible
    >
      <motion.div
        className={`absolute top-1/4 right-10 w-96 h-96 rounded-full ${colors.first} blur-[100px]`}
        style={{ opacity }}
        initial={{ x: 0, y: 0, scale: 1 }} // Set explicit initial state
        animate={{
          x: [0, -60, 0], // Increased movement range
          y: [0, -70, 0], // Increased movement range
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 15, // Decreased duration for more noticeable movement
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute bottom-0 left-0 w-80 h-80 rounded-full ${colors.second} blur-[100px]`}
        style={{ opacity }}
        initial={{ x: 0, y: 0, scale: 1 }} // Set explicit initial state
        animate={{
          x: [0, 70, 0], // Increased movement range
          y: [0, -50, 0], // Increased movement range
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 18, // Adjusted duration
          ease: "easeInOut",
          delay: 0.5, // Added delay for staggered animation
        }}
      />
      <motion.div
        className={`absolute top-1/2 left-1/4 w-64 h-64 rounded-full ${colors.third} blur-[100px]`}
        style={{ opacity }}
        initial={{ x: 0, y: 0, scale: 1 }} // Set explicit initial state
        animate={{
          x: [0, 50, 0], // Increased movement range
          y: [0, 60, 0], // Increased movement range
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 14, // Decreased duration for more noticeable movement
          ease: "easeInOut",
          delay: 1, // Added delay for staggered animation
        }}
      />
      <motion.div
        className={`absolute top-1/3 right-1/3 w-72 h-72 rounded-full ${colors.fourth} blur-[100px]`}
        style={{ opacity }}
        initial={{ x: 0, y: 0, scale: 1 }} // Set explicit initial state
        animate={{
          x: [0, 60, 0], // Increased movement range
          y: [0, 40, 0], // Increased movement range
          scale: [1, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 16, // Adjusted duration
          ease: "easeInOut",
          delay: 1.5, // Added delay for staggered animation
        }}
      />
    </div>
  );
};

export default BackgroundAnimator;
