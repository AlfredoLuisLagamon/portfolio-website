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
    imageAlts: [
      "GIAMS dashboard interface in light mode showing administrative controls, document tracking, and navigation menu with clean government system design",
      "GIAMS dashboard interface in dark mode displaying government administrative tools with dark theme for enhanced user experience during extended use",
      "GIAMS login page with secure authentication form, government branding, and professional design emphasizing security and accessibility"
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
    imageAlts: [
      "EduSync educational dashboard in light mode featuring student progress tracking, assignment management, and teacher-student communication tools",
      "EduSync educational dashboard in dark mode showing learning analytics, course materials, and student performance metrics with eye-friendly dark theme",
      "EduSync login page with educational institution branding, secure authentication, and user-friendly design for students and teachers"
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
    imageAlts: [
      "evitePro event management dashboard in light mode displaying event planning tools, analytics, and management controls for professional event coordinators",
      "evitePro event management dashboard in dark mode showing event metrics, attendee tracking, and administrative features with modern dark interface",
      "evitePro events listing page in light mode featuring event cards, filtering options, and search functionality for easy event discovery and management",
      "evitePro events listing page in dark mode displaying event grid layout, category filters, and professional event management interface"
    ],
    projectUrl: "https://evitepro.example.com",
    featured: true
  },
  {
    title: "HRIS",
    description: "A Human Resource Information System designed to manage employee records, payroll processing, attendance tracking, and HR analytics for modern workplace management.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Material-UI", "Chart.js"],
    images: [
      "/images/HRIS/Dashboard.png",
      "/images/HRIS/Login Page.png"
    ],
    imageAlts: [
      "HRIS dashboard showing comprehensive human resource management tools including employee records, payroll overview, attendance tracking, and HR analytics with professional business interface",
      "HRIS login page with corporate branding, secure authentication system, and professional design for human resource management access"
    ],
    projectUrl: "https://hris.example.com",
    featured: false
  }
];