import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../types/project";

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

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageError({});
  }, [project]);

  if (!project) return null;

  const handleNextImage = () => {
    if (isImageChanging) return; // Prevent rapid clicking

    setIsImageChanging(true);
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length);

    // Reset the flag after animation finishes
    setTimeout(() => setIsImageChanging(false), 400);
  };

  const handlePrevImage = () => {
    if (isImageChanging) return; // Prevent rapid clicking

    setIsImageChanging(true);
    setCurrentImageIndex(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );

    // Reset the flag after animation finishes
    setTimeout(() => setIsImageChanging(false), 400);
  };

  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }));
    console.error(
      `Failed to load image at index ${index}: ${project.images[index]}`
    );
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm overflow-y-auto"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 relative z-10">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {project.title}
              </h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close modal"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-300"
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
              </motion.button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-auto p-4 md:p-6 bg-white dark:bg-gray-800">
              {/* Image Gallery */}
              <div className="relative mb-6 bg-gray-900 rounded-xl overflow-hidden h-[250px] sm:h-[350px] md:h-[450px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full h-full flex items-center justify-center"
                  >
                    {!imageError[currentImageIndex] ? (
                      <img
                        src={project.images[currentImageIndex]}
                        alt={`${project.title} screenshot ${
                          currentImageIndex + 1
                        }`}
                        className="w-full h-full object-contain"
                        onError={() => handleImageError(currentImageIndex)}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <svg
                            className="w-16 h-16 mx-auto mb-4 opacity-50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-lg">Image failed to load</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows - only show if more than 1 image */}
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white z-10 transition-colors"
                      disabled={isImageChanging}
                      aria-label="Previous image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 p-3 rounded-full shadow-lg hover:bg-white z-10 transition-colors"
                      disabled={isImageChanging}
                      aria-label="Next image"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}

                {/* Image counter */}
                {project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 text-gray-800 text-sm font-medium px-4 py-2 rounded-full shadow-md border border-gray-200">
                    {currentImageIndex + 1} / {project.images.length}
                  </div>
                )}
              </div>

              {/* Thumbnail gallery */}
              {project.images.length > 1 && (
                <div className="flex mb-8 overflow-x-auto pb-6 px-2 pt-2 scrollbar-thin">
                  {project.images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        if (!isImageChanging) {
                          setIsImageChanging(true);
                          setCurrentImageIndex(index);
                          setTimeout(() => setIsImageChanging(false), 400);
                        }
                      }}
                      className={`w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all mx-1.5 ${
                        index === currentImageIndex
                          ? "ring-2 ring-blue-500 ring-offset-2 shadow-md"
                          : "border-2 border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`${project.title} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(index)}
                        loading="lazy"
                      />
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Project Details */}
              <div className="space-y-6 text-gray-800 dark:text-gray-200">
                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full mr-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Description
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-3 flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300 rounded-full mr-2">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/70 dark:text-blue-200 border border-blue-200 dark:border-blue-700"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links section */}
                {/* <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap gap-4">
                    {project.projectUrl && (
                      <motion.a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span>View Live Project</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.a>
                    )}
                    
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-5 py-2.5 bg-gray-800 text-white font-medium rounded-lg shadow-md hover:bg-gray-900 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span>View Code</span>
                        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    )}
                  </div>
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
