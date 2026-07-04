export const GITHUB_PROFILE_URL = 'https://github.com/AlfredoLuisLagamon';

export interface GitHubRepo {
  name: string;
  url: string;
  description: string;
}

export const githubRepos: GitHubRepo[] = [
  {
    name: 'portfolio-website',
    url: `${GITHUB_PROFILE_URL}/portfolio-website`,
    description: 'Personal portfolio — Next.js, TypeScript, Tailwind, accessible project case-study modals',
  },
  {
    name: 'bea-portfolio-website',
    url: `${GITHUB_PROFILE_URL}/bea-portfolio-website`,
    description: 'Client portfolio site with responsive layout and polished UI components',
  },
  {
    name: 'vetcrest',
    url: `${GITHUB_PROFILE_URL}/vetcrest`,
    description: 'Full-stack web application with structured UI, forms, and API integration',
  },
  {
    name: 'assesment-repo',
    url: `${GITHUB_PROFILE_URL}/assesment-repo`,
    description: 'Front-end technical assessment exercises — components, state, and UI patterns',
  },
];
