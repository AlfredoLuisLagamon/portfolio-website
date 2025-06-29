export interface ProfileData {
  name: string;
  title: string;
  location: string;
  bio: string;
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

// Calculate years of experience dynamically from June 2020
const getYearsOfExperience = (): string => {
  const startDate = new Date('2020-06-01');
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
  return `${diffYears}+`;
};

export const profileData: ProfileData = {
  name: "Alfredo Luis Lagamon",
  title: "Front-End Developer",
  location: "Cagayan de Oro, Philippines",
  bio: `Front-End Developer with over ${getYearsOfExperience().replace('+', '')} years of experience, focused on building clean, modern web experiences. Helping startups and teams turn ideas into smooth, responsive UIs.`,
  avatar: "/images/Profile-Photo.jpg",
  status: "Available for freelance work",
  experience: getYearsOfExperience(),
  projects: 25,
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/AlfredoLuisLagamon",
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/alfredo-luis-lagamon-a70065236/",
      icon: "linkedin"
    }
  ],
  skills: [
    {
      name: "Frontend",
      skills: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"],
      color: "blue"
    },
    {
      name: "Backend",
      skills: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Firebase"],
      color: "green"
    },
    {
      name: "Tools",
      skills: ["Git", "Vite", "Figma", "VS Code", "GitHub"],
      color: "purple"
    }
  ]
}; 