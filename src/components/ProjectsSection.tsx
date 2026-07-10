import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import DemoRenderer from "./demos/DemoRenderer";
import { Project } from "../types/project";
import { projects } from "../data/projects";
import { GITHUB_PROFILE_URL, githubRepos } from "../data/githubRepos";
import { isDemoSlug } from "../data/demos";

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      {/* Section Header */}
      <section id="projects" className="py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-page mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Projects
            </h2>
            <p className="text-secondary mt-2 max-w-2xl">
              Interactive demos from selected full-stack projects I&apos;ve worked on, covering
              messaging, developer workflows, and visual page building.
            </p>
          </div>
        </div>
      </section>

      {projects.map((project) => (
        <section key={project.slug} id={`project-${project.slug}`} className="py-6 md:py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-page mx-auto space-y-4">
              {/* Project header */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-primary">{project.title}</h3>
                  <p className="text-secondary mt-1">{project.tagline}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-blue-700/60 dark:bg-blue-900/30 dark:text-blue-200 dark:hover:bg-blue-900/50"
                >
                  Show details
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Inline demo */}
              {isDemoSlug(project.slug) && (
                <div className="rounded-2xl border border-gray-200/60 dark:border-white/10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm overflow-hidden shadow-sm">
                  <DemoRenderer slug={project.slug} />
                </div>
              )}

              <p className="text-xs text-secondary">
                Sample data only. Runs entirely in the browser with no backend.
              </p>
            </div>
          </div>
        </section>
      ))}

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* More on GitHub */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-page mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">
                More on GitHub
              </h2>
              <p className="text-secondary mt-2">
                Browse repositories and other projects on my GitHub profile.
              </p>
            </div>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-primary text-sm font-medium transition-colors duration-300 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="View Alfredo Luis Lagamon on GitHub"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                    className="block p-4 rounded-2xl glass-surface hover:glass-surface-strong transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
