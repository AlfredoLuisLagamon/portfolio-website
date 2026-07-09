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
            {/* Header */}
            <div className="relative shrink-0 px-4 sm:px-6 pt-4 sm:pt-6 pb-4 sm:pb-5 border-b border-gray-200/60 dark:border-white/10 bg-gray-50/70 dark:bg-white/[0.03]">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 sm:p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 sm:bg-black/10 sm:hover:bg-black/20 sm:dark:bg-white/10 sm:dark:hover:bg-white/20 transition-colors group touch-manipulation shadow-sm"
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
                <div className="mb-4 sm:mb-5">
                  <h2 id="project-modal-title" className="text-xl sm:text-2xl md:text-3xl font-bold text-primary leading-tight tracking-tight">
                    {project.title}
                  </h2>
                  <p className="mt-2 text-secondary text-sm leading-relaxed max-w-2xl">
                    {project.tagline}
                  </p>
                </div>
                <p className="text-xs sm:text-sm font-medium tracking-wide text-blue-600/80 dark:text-blue-400/80 mb-4 sm:mb-5">
                  {project.role}
                </p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 sm:px-2.5 py-0.5 rounded-md text-xs font-medium text-blue-700/80 dark:text-blue-300/80 bg-blue-50/80 dark:bg-blue-900/20 border border-blue-100/80 dark:border-blue-800/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
              <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-4 sm:space-y-5">
                {/* Overview: Context / Problem / Solution */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
                  {[
                    { title: "Context", body: project.context },
                    { title: "Problem", body: project.problem },
                    { title: "What I built", body: project.solution },
                  ].map((section) => (
                    <section
                      key={section.title}
                      className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] p-4 sm:p-5"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400 mb-2.5">
                        {section.title}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        {section.body}
                      </p>
                    </section>
                  ))}
                </div>

                {/* Technical notes & Impact */}
                <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                  <section className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4 sm:p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400 mb-3">
                      Technical notes
                    </h3>
                    <ul className="space-y-2.5">
                      {project.technicalNotes.map((note) => (
                        <li key={note} className="flex items-start gap-3 text-secondary text-sm leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-white/[0.02] p-4 sm:p-5">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400 mb-3">
                      Impact
                    </h3>
                    <ul className="space-y-2.5">
                      {project.impact.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-secondary text-sm leading-relaxed">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Gallery */}
                {project.images.length > 0 && (
                  <section className="rounded-xl border border-gray-200/70 dark:border-white/10 overflow-hidden bg-gray-50/50 dark:bg-white/[0.02]">
                    <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
                      <h3 className="text-xs font-semibold uppercase tracking-[0.08em] text-blue-600 dark:text-blue-400">
                        Screenshots
                      </h3>
                    </div>
                    <div className="relative bg-gray-100 dark:bg-black/30 h-[280px] sm:h-[300px] md:h-[400px] lg:h-[460px] border-y border-gray-200/60 dark:border-white/10">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{
                            duration: prefersReducedMotion ? 0.01 : 0.15,
                            ease: "easeInOut",
                          }}
                          className="w-full h-full flex items-center justify-center opacity-transition"
                          style={{ willChange: "opacity" }}
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

                      {project.images.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 p-3 sm:p-2 bg-white/95 hover:bg-white dark:bg-white/95 dark:hover:bg-white text-gray-800 rounded-full transition-all hover:scale-110 disabled:opacity-50 touch-manipulation shadow-lg"
                            disabled={isImageChanging}
                            aria-label="Previous image"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-3 sm:p-2 bg-white/95 hover:bg-white dark:bg-white/95 dark:hover:bg-white text-gray-800 rounded-full transition-all hover:scale-110 disabled:opacity-50 touch-manipulation shadow-lg"
                            disabled={isImageChanging}
                            aria-label="Next image"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 sm:py-1 bg-black/80 text-white text-sm font-medium rounded-full backdrop-blur-sm shadow-lg">
                            {currentImageIndex + 1} / {project.images.length}
                          </div>
                        </>
                      )}
                    </div>

                    {project.images.length > 1 && (
                      <div className="px-4 sm:px-5 py-3 sm:py-4">
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-hide">
                          {project.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                if (!isImageChanging) {
                                  setIsImageChanging(true);
                                  setCurrentImageIndex(index);
                                  setTimeout(
                                    () => setIsImageChanging(false),
                                    prefersReducedMotion ? 20 : 200
                                  );
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
                  </section>
                )}

                {/* Access note & links */}
                {(project.accessNote ||
                  project.githubUrl ||
                  (project.projectUrl && !project.projectUrl.includes("example.com"))) && (
                  <section className="rounded-xl border border-gray-200/70 dark:border-white/10 bg-gray-50/80 dark:bg-white/[0.03] p-4 sm:p-5">
                    {project.accessNote && (
                      <p className="text-sm text-secondary leading-relaxed flex items-start gap-2.5">
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
                    )}

                    {(project.githubUrl ||
                      (project.projectUrl && !project.projectUrl.includes("example.com"))) && (
                      <div className={`flex flex-wrap gap-3 ${project.accessNote ? "mt-4 pt-4 border-t border-gray-200/70 dark:border-white/10" : ""}`}>
                        {project.projectUrl && !project.projectUrl.includes("example.com") && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-primary text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
                  </section>
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
