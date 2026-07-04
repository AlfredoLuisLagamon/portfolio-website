import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import { Project } from "../types/project";
import { projects } from "../data/projects";
import { GITHUB_PROFILE_URL, githubRepos } from "../data/githubRepos";

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
      <section id="projects" className="pt-4 md:pt-6 pb-4 md:pb-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-page mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Projects</h2>
          </div>
        </div>
      </section>

      {projects.map((project) => (
        <section key={project.title} className="py-3 md:py-4">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-page mx-auto">
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
                  {/* Proof highlights at top */}
                  <div className="flex flex-wrap gap-2 justify-end">
                    {project.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-blue-100/80 text-blue-800 dark:bg-blue-900/80 dark:text-blue-200 border border-blue-200/60 dark:border-blue-700/60 font-medium rounded-full backdrop-blur-sm"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Info at bottom */}
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/90 text-sm md:text-base mb-1 line-clamp-1">
                      {project.tagline}
                    </p>
                    <p className="text-white/75 text-sm md:text-base mb-4 line-clamp-1">
                      {project.impact[0]}
                    </p>
                    
                    {/* Click indicator */}
                    <div className="flex items-center gap-2 text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm font-medium">View case study</span>
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

      {/* More on GitHub */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-page mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
              More on GitHub
            </h2>
            <p className="text-secondary mb-6">
              Browse repositories and other projects on my GitHub profile.
            </p>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-primary font-medium transition-colors mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View Alfredo Luis Lagamon on GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View profile @AlfredoLuisLagamon
            </a>
            <ul className="space-y-3" role="list">
              {githubRepos.map((repo) => (
                <li key={repo.name}>
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 rounded-xl glass-surface hover:glass-surface-strong transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`View ${repo.name} on GitHub`}
                  >
                    <span className="font-semibold text-primary">{repo.name}</span>
                    <p className="text-sm text-secondary mt-1">{repo.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
