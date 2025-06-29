export interface Project {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  imageAlts?: string[];
  projectUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}