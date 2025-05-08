import { Project } from '../types/project';

export const projects: Project[] = [
  {
    title: "GIAMS",
    description: "A Government Integrated Administrative Management System that streamlines document tracking, approval processes, and resource allocation across government departments.",
    technologies: ["Vue.js 2", "Vuex", "Node.js", "Express.js", "MongoDB", "Vuetify"],
    images: [
      "/images/GIAMS/Dashboard Light.png",
      "/images/GIAMS/Dashboard Dark.png",
      "/images/GIAMS/Login Page.png"
    ],
    projectUrl: "https://giams.example.com",
    featured: true
  },
  {
    title: "EduSync",
    description: "An educational platform connecting students and teachers with integrated assignment tracking, resource sharing, and performance analytics for optimized learning outcomes.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Redux"],
    images: [
      "/images/EduSync/Dashboard Light.png",
      "/images/EduSync/Dashboard Dark.png",
      "/images/EduSync/Login Page.png"
    ],
    projectUrl: "https://edusync.example.com",
    featured: true
  },
  {
    title: "evitePro",
    description: "A comprehensive event management system with features for planning, ticketing, attendee tracking, and post-event analytics to streamline the entire event lifecycle.",
    technologies: ["Vue.js 3", "TypeScript", "Pinia", "Vite", "Node.js", "PostgreSQL"],
    images: [
      "/images/evitePro/Dashboard Light.png",
      "/images/evitePro/Dashboard Dark.png",
      "/images/evitePro/Events Page Light.png",
      "/images/evitePro/Events Page Dark.png"
    ],
    projectUrl: "https://evitepro.example.com",
    featured: true
  },
  {
    title: "HRIS",
    description: "A Human Resource Integrated System that handles employee data management, payroll processing, leave tracking, and performance evaluations for organizations of all sizes.",
    technologies: ["React.js", "Redux Toolkit", "Express.js", "MongoDB", "Material UI", "JWT"],
    images: [
      "/images/HRIS/Dashboard.png",
      "/images/HRIS/Login Page.png"
    ],
    projectUrl: "https://hris.example.com",
    featured: true
  }
];