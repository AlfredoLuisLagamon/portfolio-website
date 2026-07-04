export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bioParagraphs: string[];
  email: string;
  avatar: string;
  status: string;
  experience: string;
  projects: number;
  socialLinks: SocialLink[];
  skills: SkillCategory[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
  color: string;
}

const getYearsOfExperience = (): string => {
  const startDate = new Date('2020-06-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  return `${diffYears}+`;
};

export const profileData: ProfileData = {
  name: 'Alfredo Luis Lagamon',
  title: 'Front-End / Full-Stack Developer',
  location: 'Cagayan de Oro, Philippines',
  bioParagraphs: [
    'I build production web applications, dashboards, and internal tools that make business workflows easier to run. With 6+ years of experience across universities, organizations, and product teams, I own features from UI architecture and API integration through debugging, refinement, and deployment-ready code.',
    'I specialize in React, Next.js, Vue, and TypeScript, and use AI-assisted workflows to move faster while keeping responsibility for planning, testing, and final code quality.',
  ],
  email: 'alfredoluis.lagamon@gmail.com',
  avatar: '/images/Profile-Photo.jpg',
  status: 'Open to full-time and contract roles · Remote · Philippines (UTC+8)',
  experience: getYearsOfExperience(),
  projects: 25,
  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/AlfredoLuisLagamon',
      icon: 'github',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/alfredo-luis-lagamon-a70065236/',
      icon: 'linkedin',
    },
  ],
  skills: [
    {
      name: 'Frontend',
      skills: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      color: 'blue',
    },
    {
      name: 'Backend',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'Firebase'],
      color: 'green',
    },
    {
      name: 'Tools',
      skills: ['Git', 'Vite', 'REST APIs', 'VS Code', 'GitHub'],
      color: 'purple',
    },
  ],
};
