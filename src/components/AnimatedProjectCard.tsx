import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies?: string[];
  link?: string;
  direction?: "left" | "right";
}

const AnimatedProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageUrl,
  technologies = [],
  link,
  direction = "left",
}) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="flex flex-col md:flex-row gap-8 mb-24 w-full"
    >
      <div
        className={`w-full md:w-1/2 ${
          direction === "right" ? "md:order-2" : ""
        }`}
      >
        <div className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span className="text-white font-semibold text-lg px-4 py-2 border-2 border-white rounded-lg">
                View Project
              </span>
            </a>
          )}
        </div>
      </div>
      <div
        className={`w-full md:w-1/2 flex flex-col justify-center ${
          direction === "right" ? "md:order-1 md:pr-8" : "md:pl-8"
        }`}
      >
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 mb-5">{description}</p>

        {technologies.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm text-gray-500 uppercase mb-2">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AnimatedProjectCard;
