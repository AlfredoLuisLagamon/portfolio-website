import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Project } from "../types/project";
import { projects } from "../data/projects";

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      {/* Section Header */}
      <section className="pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Featured Projects</h2>
          </div>
        </div>
      </section>

      {/* Individual Project Cards */}
                {projects.map((project) => (
        <section key={project.title} className="py-3 md:py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div 
                className="relative h-72 md:h-96 rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => handleProjectClick(project)}
              >
                {/* Full Background Image */}
                <img
                  src={project.images[0]}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-colors duration-300" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-6">
                  {/* Technologies at top */}
                  <div className="flex flex-wrap gap-2 justify-end">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100/80 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200 border border-blue-200/60 dark:border-blue-700/60 font-medium rounded-full backdrop-blur-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-blue-100/80 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200 border border-blue-200/60 dark:border-blue-700/60 font-medium rounded-full backdrop-blur-sm">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Project Info at bottom */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/90 text-sm md:text-base mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Click indicator */}
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">Learn more</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <ProjectDetailsModal
        project={selectedProject}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProjectsSection;
