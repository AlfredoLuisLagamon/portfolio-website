import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Project } from "../types/project";
import { projects } from "../data/projects";
import { motion } from "framer-motion";

const ProjectsPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const projectIndex = parseInt(id as string);
      if (
        !isNaN(projectIndex) &&
        projectIndex >= 0 &&
        projectIndex < projects.length
      ) {
        setProject(projects[projectIndex]);
      } else {
        // Handle invalid project ID
        router.push("/");
      }
    }
  }, [id, router]);

  const handleNextImage = () => {
    if (project) {
      setCurrentImageIndex((prev) => (prev + 1) % project.images.length);
    }
  };

  const handlePrevImage = () => {
    if (project) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + project.images.length) % project.images.length
      );
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} | Alfredo Luis Lagamon</title>
        <meta name="description" content={project.description} />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow pt-20">
          {/* Project Header */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {project.title}
                </motion.h1>
                <motion.p
                  className="text-xl text-blue-100 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {project.description}
                </motion.p>
                <motion.div
                  className="flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-blue-800 text-blue-100"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Project Showcase */}
          <div className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                {/* Image Gallery */}
                <motion.div
                  className="relative aspect-w-16 aspect-h-9 mb-10 bg-gray-100 rounded-lg overflow-hidden shadow-xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />

                  {/* Navigation arrows */}
                  {project.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Previous image"
                      >
                        <svg
                          className="w-6 h-6"
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
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
                        aria-label="Next image"
                      >
                        <svg
                          className="w-6 h-6"
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
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white text-sm px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {project.images.length}
                    </div>
                  )}
                </motion.div>

                {/* Thumbnail gallery */}
                {project.images.length > 1 && (
                  <motion.div
                    className="flex space-x-2 mb-12 overflow-x-auto pb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {project.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-24 h-16 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all ${
                          index === currentImageIndex
                            ? "border-blue-600"
                            : "border-transparent hover:border-gray-300"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${project.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Project Details */}
                <motion.div
                  className="prose prose-lg max-w-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2>Project Overview</h2>
                  <p>{project.description}</p>

                  <h2>Key Features</h2>
                  <ul>
                    <li>
                      Responsive design for optimal viewing on all devices
                    </li>
                    <li>Intuitive user interface for seamless navigation</li>
                    <li>Secure authentication and data protection</li>
                    <li>Real-time updates and notifications</li>
                    <li>Comprehensive analytics and reporting</li>
                  </ul>

                  <h2>Technologies Used</h2>
                  <p>
                    This project was built using{" "}
                    {project.technologies.join(", ")}.
                  </p>

                  {project.projectUrl && (
                    <div className="mt-12 flex">
                      <a
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Visit Live Project
                      </a>
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 ml-4 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                        >
                          View Code on GitHub
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>

          {/* More Projects Section */}
          <div className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                More Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p, i) => i !== projects.indexOf(project))
                  .slice(0, 3)
                  .map((otherProject, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => {
                        const newIndex = projects.indexOf(otherProject);
                        if (newIndex !== -1) {
                          setCurrentImageIndex(0); // Reset image index
                          router.push(`/projects?id=${newIndex}`, undefined, {
                            shallow: true,
                          });
                        }
                      }}
                    >
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={otherProject.images[0]}
                          alt={otherProject.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {otherProject.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {otherProject.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {otherProject.technologies
                            .slice(0, 2)
                            .map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {tech}
                              </span>
                            ))}
                          {otherProject.technologies.length > 2 && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              +{otherProject.technologies.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
              <div className="text-center mt-12">
                <a
                  href="/#projects"
                  className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-600 hover:text-white transition-colors"
                >
                  View All Projects
                </a>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default ProjectsPage;
