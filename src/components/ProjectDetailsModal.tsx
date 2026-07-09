import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Project } from "../types/project";
import { useReducedMotion } from "../utils/useReducedMotion";

interface ProjectDetailsModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({
  project,
  onClose,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [isImageChanging, setIsImageChanging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Ensure component is mounted before using portal
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError({});
  }, [project]);

  // Handle ESC key press and body scroll lock
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
      
      // Optimize performance by removing will-change after animation
      const timer = setTimeout(() => {
        const modalElement = document.querySelector('[data-modal]');
        if (modalElement instanceof HTMLElement) {
          modalElement.style.willChange = 'auto';
        }
      }, prefersReducedMotion ? 20 : 300);

      return () => {
        document.removeEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'unset';
        clearTimeout(timer);
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose, prefersReducedMotion]);

  if (!project || !isMounted) return null;

  const handleNextImage = () => {
    if (isImageChanging) return;
    setIsImageChanging(true);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    setTimeout(() => setIsImageChanging(false), prefersReducedMotion ? 20 : 200);
  };

  const handlePrevImage = () => {
    if (isImageChanging) return;
    setIsImageChanging(true);
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
    setTimeout(() => setIsImageChanging(false), prefersReducedMotion ? 20 : 200);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
  };

  // Optimized animation variants for smooth performance
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.15,
        ease: "easeOut"
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.12,
        ease: "easeIn"
      } 
    },
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.98,
      y: prefersReducedMotion ? 0 : (typeof window !== 'undefined' && window.innerWidth < 640 ? 20 : 8), // Slide up on mobile
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.18,
        ease: [0.16, 1, 0.3, 1], // Custom smooth easing
        scale: { duration: prefersReducedMotion ? 0.01 : 0.15 },
        opacity: { duration: prefersReducedMotion ? 0.01 : 0.12 }
      } 
    },
    exit: { 
      opacity: 0, 
      scale: prefersReducedMotion ? 1 : 0.98,
      y: prefersReducedMotion ? 0 : (typeof window !== 'undefined' && window.innerWidth < 640 ? 10 : 4), // Slide down on mobile
      transition: { 
        duration: prefersReducedMotion ? 0.01 : 0.12,
        ease: "easeIn"
      } 
    },
  };

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/40 dark:bg-black/75 backdrop-blur-md supports-[backdrop-filter]:backdrop-blur-lg will-change-opacity"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{ willChange: 'opacity' }}
          aria-hidden="true"
        >
          <motion.div
            variants={modalVariants}
            className="bg-white dark:bg-gray-900 sm:bg-white/98 sm:dark:bg-gray-900/98 sm:backdrop-blur-xl rounded-xl sm:rounded-2xl max-w-6xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col border border-gray-200/60 dark:border-white/15 shadow-2xl shadow-black/20 dark:shadow-black/50 will-change-transform opacity-transition"
            onClick={(e) => e.stopPropagation()}
            data-modal
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            style={{ 
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)' // Hardware acceleration
            }}
          >
            {/* Header with close button - Full screen mobile */}
            <div className="relative p-4 sm:p-6 pb-3 sm:pb-4 border-b border-gray-200/50 dark:border-white/10 sm:border-0">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-4 sm:right-4 p-2.5 sm:p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 sm:bg-black/10 sm:hover:bg-black/20 sm:dark:bg-white/10 sm:dark:hover:bg-white/20 transition-colors group touch-manipulation shadow-sm"
                aria-label="Close modal"
              >
                <svg
                  className="w-5 h-5 sm:w-5 sm:h-5 text-gray-600 group-hover:text-gray-800 dark:text-white/70 dark:group-hover:text-white transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div className="pr-12 sm:pr-12">
                <h2 id="project-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-2 leading-tight">
                  {project.title}
                </h2>
                <p className="text-secondary text-sm sm:text-base md:text-base leading-relaxed pr-4 sm:pr-0 mb-3">
                  {project.tagline}
                </p>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  {project.role}
                </p>
              </div>
            </div>

            {/* Content - Full screen mobile optimized */}
            <div className="flex-1 overflow-auto">
              {/* Case study */}
              <div className="px-4 sm:px-6 pt-4 sm:pt-0 pb-5 sm:pb-6 space-y-5 border-b border-gray-200/60 dark:border-white/10">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                    Context
                  </h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    {project.context}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                    Problem
                  </h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                    What I built
                  </h3>
                  <p className="text-secondary text-sm sm:text-base leading-relaxed">
                    {project.solution}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                    Technical notes
                  </h3>
                  <ul className="space-y-2">
                    {project.technicalNotes.map((note) => (
                      <li key={note} className="flex items-start gap-3 text-secondary text-sm sm:text-base">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-primary mb-2">
                    Impact
                  </h3>
                  <ul className="space-y-2">
                    {project.impact.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-secondary text-sm sm:text-base">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Image Gallery - Full screen mobile */}
              {project.images.length > 0 && (
              <>
              <div className="px-0 sm:px-6 mb-4 sm:mb-6">
                <div className="relative bg-gray-100 dark:bg-black/30 rounded-none sm:rounded-xl overflow-hidden h-[300px] sm:h-[280px] md:h-[400px] lg:h-[480px] border-0 sm:border sm:border-gray-200 sm:dark:border-white/10">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: prefersReducedMotion ? 0.01 : 0.15,
                        ease: "easeInOut"
                      }}
                      className="w-full h-full flex items-center justify-center opacity-transition"
                      style={{ willChange: 'opacity' }}
                    >
                      {!imageError[currentImageIndex] ? (
                        <Image
                          src={project.images[currentImageIndex]}
                          alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 90vw"
                          className="object-contain"
                          onError={() => handleImageError(currentImageIndex)}
                          priority={currentImageIndex === 0}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-secondary">
                          <svg
                            className="w-12 h-12 mb-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p>Image failed to load</p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation arrows - Full screen mobile */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-2 bg-white/95 hover:bg-white dark:bg-white/95 dark:hover:bg-white text-gray-800 rounded-full transition-all hover:scale-110 disabled:opacity-50 touch-manipulation shadow-lg"
                        disabled={isImageChanging}
                        aria-label="Previous image"
                      >
                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-2 bg-white/95 hover:bg-white dark:bg-white/95 dark:hover:bg-white text-gray-800 rounded-full transition-all hover:scale-110 disabled:opacity-50 touch-manipulation shadow-lg"
                        disabled={isImageChanging}
                        aria-label="Next image"
                      >
                        <svg className="w-5 h-5 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Image counter - Mobile enhanced */}
                  {project.images.length > 1 && (
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:py-1 bg-black/80 dark:bg-black/80 text-white text-sm font-medium rounded-full backdrop-blur-sm shadow-lg">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail gallery - Full screen mobile */}
              {project.images.length > 1 && (
                <div className="px-4 sm:px-6 mb-4 sm:mb-6">
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 px-0 sm:px-1 py-1 scrollbar-hide">
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          if (!isImageChanging) {
                            setIsImageChanging(true);
                            setCurrentImageIndex(index);
                            setTimeout(() => setIsImageChanging(false), prefersReducedMotion ? 20 : 200);
                          }
                        }}
                        className={`w-20 h-12 sm:w-16 sm:h-10 flex-shrink-0 rounded-lg overflow-hidden transition-all touch-manipulation ${
                          index === currentImageIndex
                            ? "ring-2 ring-blue-500 ring-offset-2 ring-offset-transparent shadow-lg"
                            : "opacity-70 hover:opacity-100 shadow-sm"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(index)}
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              </>
              )}

              {/* Technologies */}
              <div
                className={`px-4 sm:px-6 pb-6 sm:pb-8 ${
                  project.images.length === 0 ? 'pt-6 sm:pt-8' : 'pt-4 sm:pt-6'
                }`}
              >
                <h3 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-5 flex items-center">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 sm:px-3 py-1 sm:py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-700 font-medium rounded-full text-xs sm:text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.accessNote && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
                    <p className="text-sm text-secondary leading-relaxed flex items-start gap-2">
                      <svg
                        className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                      {project.accessNote}
                    </p>
                  </div>
                )}

                {(project.githubUrl || (project.projectUrl && !project.projectUrl.includes("example.com"))) && (
                  <div className="flex flex-wrap gap-3 mt-4">
                    {project.projectUrl && !project.projectUrl.includes("example.com") && (
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Visit ${project.title} live site`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Visit site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-primary font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`View ${project.title} source on GitHub`}
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        View source
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectDetailsModal;
