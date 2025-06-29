import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageSrc: string;
  imageAlt: string;
  projectUrl?: string;
  githubUrl?: string;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  imageSrc,
  imageAlt,
  onClick,
}) => {
  return (
    <div
      className="project-card group h-full flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {" "}
      <div className="relative overflow-hidden">
        <div className="h-60 sm:h-64 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={400}
            height={240}
            quality={80}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/30 to-transparent opacity-0 group-hover:opacity-100 flex items-end justify-center pb-6 transition-all duration-300">
            <motion.button
              className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {technologies.slice(0, 3).map((tech, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 rounded-full font-medium bg-blue-100/80 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
          {technologies.length > 3 && (
            <motion.span
              className="px-3 py-1 rounded-full font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              +{technologies.length - 3}
            </motion.span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
