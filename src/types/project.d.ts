export interface Project {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  role: string;
  context: string;
  problem: string;
  solution: string;
  impact: string[];
  technicalNotes: string[];
  highlights: string[];
  technologies: string[];
  images: string[];
  imageAlts?: string[];
  projectUrl?: string;
  githubUrl?: string;
  accessNote?: string;
  featured?: boolean;
}
