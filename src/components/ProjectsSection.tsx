import React, { useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";
import DemoRenderer from "./demos/DemoRenderer";
import { Project } from "../types/project";
import { projects } from "../data/projects";
import { isDemoSlug } from "../data/demos";

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="page-section">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-page mx-auto">
          <header className="section-header">
            <h2 className="section-title">Projects</h2>
            <p className="text-secondary max-w-2xl">
              Interactive demos from selected full-stack projects I&apos;ve worked on, covering
              messaging, developer workflows, and visual page building.
            </p>
            <p className="text-xs text-secondary mt-3 max-w-2xl">
              Interactive demos use sanitized sample data. Private company data and backend
              integrations are excluded.
            </p>
          </header>

          {projects.map((project) => (
            <article
              key={project.slug}
              id={`project-${project.slug}`}
              className="project space-y-4"
            >
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

              {isDemoSlug(project.slug) && (
                <div
                  className={`demo-frame${
                    project.slug === 'developer-workflow' ? ' demo-frame-fade' : ''
                  }`}
                >
                  <DemoRenderer slug={project.slug} />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>

      <ProjectDetailsModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default ProjectsSection;
