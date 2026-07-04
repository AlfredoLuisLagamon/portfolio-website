import { Project } from '../types/project';

const PRIVATE_ACCESS_NOTE =
  'Deployed on internal infrastructure with authenticated access. Live demo available upon request.';

export const projects: Project[] = [
  {
    title: 'GIAMS',
    slug: 'giams',
    tagline: 'Government admin system for document tracking and multi-level approvals',
    description:
      'A Government Integrated Administrative Management System that centralizes document routing, approval workflows, and resource allocation across departments.',
    role: 'Full-Stack Developer — primary front-end owner',
    context:
      'Built for a government-affiliated organization replacing paper-based routing and spreadsheet tracking across multiple departments.',
    problem:
      'Departments tracked documents manually, approval status was hard to audit, and staff had no single view of where requests stood in the pipeline.',
    solution:
      'Delivered a Vue.js admin platform with role-based dashboards, structured approval chains, and REST-backed document lifecycle tracking so staff could submit, review, and approve records in one system.',
    impact: [
      'Replaced manual document handoffs with a traceable digital workflow across departments',
      'Gave administrators a real-time view of pending, approved, and rejected requests',
      'Reduced time spent chasing approval status through calls and physical follow-ups',
      'Standardized how departments allocate and monitor shared resources',
    ],
    technicalNotes: [
      'Architected Vuex modules around document states and department-scoped permissions',
      'Built reusable Vuetify dashboard layouts with light/dark themes for long admin sessions',
      'Integrated Express.js REST APIs for document CRUD, approval actions, and audit trails',
      'Implemented route guards and role-based navigation so users only access authorized modules',
      'Structured MongoDB collections to support multi-step approval history without losing context',
    ],
    highlights: ['Approval workflows', 'Role-based dashboards', 'REST + MongoDB'],
    technologies: ['Vue.js 2', 'Vuex', 'Node.js', 'Express.js', 'MongoDB', 'Vuetify'],
    images: [
      '/images/GIAMS/Dashboard Light.png',
      '/images/GIAMS/Dashboard Dark.png',
      '/images/GIAMS/Login Page.png',
    ],
    imageAlts: [
      'GIAMS dashboard interface in light mode showing administrative controls, document tracking, and navigation menu with clean government system design',
      'GIAMS dashboard interface in dark mode displaying government administrative tools with dark theme for enhanced user experience during extended use',
      'GIAMS login page with secure authentication form, government branding, and professional design emphasizing security and accessibility',
    ],
    accessNote: PRIVATE_ACCESS_NOTE,
    featured: true,
  },
  {
    title: 'EduSync',
    slug: 'edusync',
    tagline: 'Learning platform for assignments, resources, and student progress tracking',
    description:
      'An educational platform connecting students and instructors with assignment workflows, shared materials, and performance visibility.',
    role: 'Front-End / Full-Stack Developer',
    context:
      'Developed as an institutional learning tool to give teachers and students one place to manage coursework instead of scattered files and messages.',
    problem:
      'Course materials, assignments, and progress updates lived across different channels, making it difficult for instructors to track completion and for students to see what was due.',
    solution:
      'Built a Next.js and React application with structured dashboards for teachers and students, Firebase-backed auth and data sync, and Redux-managed state for assignments, resources, and analytics views.',
    impact: [
      'Centralized assignment submission and review in a single instructor dashboard',
      'Gave students a clear view of deadlines, materials, and progress in one interface',
      'Improved visibility into class activity through structured performance summaries',
      'Reduced friction between content delivery and feedback loops for teaching staff',
    ],
    technicalNotes: [
      'Implemented Next.js page structure with TypeScript for maintainable feature modules',
      'Used Firebase Authentication and Firestore for secure, role-aware user sessions',
      'Managed assignment and resource state with Redux to keep UI predictable across views',
      'Built responsive Tailwind layouts optimized for both classroom desktop use and mobile access',
      'Separated student and instructor experiences with role-specific routes and dashboard components',
    ],
    highlights: ['Next.js + TypeScript', 'Firebase auth', 'Instructor dashboards'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Redux'],
    images: [
      '/images/EduSync/Dashboard Light.png',
      '/images/EduSync/Dashboard Dark.png',
      '/images/EduSync/Login Page.png',
    ],
    imageAlts: [
      'EduSync educational dashboard in light mode featuring student progress tracking, assignment management, and teacher-student communication tools',
      'EduSync educational dashboard in dark mode showing learning analytics, course materials, and student performance metrics with eye-friendly dark theme',
      'EduSync login page with educational institution branding, secure authentication, and user-friendly design for students and teachers',
    ],
    accessNote: PRIVATE_ACCESS_NOTE,
    featured: true,
  },
  {
    title: 'evitePro',
    slug: 'evitepro',
    tagline: 'End-to-end event management from planning to attendee tracking',
    description:
      'A comprehensive event management system covering event setup, registration, attendee management, and post-event reporting.',
    role: 'Full-Stack Developer — Vue 3 front-end lead',
    context:
      'Created for teams running recurring institutional and organizational events that needed more control than generic ticketing tools could provide.',
    problem:
      'Event coordinators juggled spreadsheets, registration lists, and follow-up data across tools, with no unified view of event status or attendee history.',
    solution:
      'Developed a Vue 3 and TypeScript platform with Pinia state management, PostgreSQL-backed APIs, and admin tooling for event creation, attendee tracking, and reporting across the full event lifecycle.',
    impact: [
      'Consolidated event planning, registration, and attendee data into one admin workspace',
      'Enabled coordinators to monitor event capacity and registration status in real time',
      'Improved post-event reporting with structured attendance and activity summaries',
      'Supported both light and dark UI modes for extended operational use',
    ],
    technicalNotes: [
      'Migrated front-end architecture to Vue 3 Composition API with Pinia for clearer state boundaries',
      'Used Vite for fast local development and modular feature delivery',
      'Designed PostgreSQL schemas for events, registrations, and attendee relationships',
      'Built filterable event listing and detail views with reusable card and table patterns',
      'Integrated Node.js REST endpoints for event CRUD, registration flows, and analytics queries',
    ],
    highlights: ['Vue 3 + Pinia', 'PostgreSQL APIs', 'Event lifecycle tooling'],
    technologies: ['Vue.js 3', 'TypeScript', 'Pinia', 'Vite', 'Node.js', 'PostgreSQL'],
    images: [
      '/images/evitePro/Dashboard Light.png',
      '/images/evitePro/Dashboard Dark.png',
      '/images/evitePro/Events Page Light.png',
      '/images/evitePro/Events Page Dark.png',
    ],
    imageAlts: [
      'evitePro event management dashboard in light mode displaying event planning tools, analytics, and management controls for professional event coordinators',
      'evitePro event management dashboard in dark mode showing event metrics, attendee tracking, and administrative features with modern dark interface',
      'evitePro events listing page in light mode featuring event cards, filtering options, and search functionality for easy event discovery and management',
      'evitePro events listing page in dark mode displaying event grid layout, category filters, and professional event management interface',
    ],
    accessNote: PRIVATE_ACCESS_NOTE,
    featured: true,
  },
  {
    title: 'HRIS',
    slug: 'hris',
    tagline: 'HR dashboard for employee records, attendance, and workforce analytics',
    description:
      'A Human Resource Information System for managing employee data, attendance, payroll-related records, and HR reporting.',
    role: 'Full-Stack Developer',
    context:
      'Built as an internal HR operations tool to move employee and attendance data out of fragmented records into a maintainable web system.',
    problem:
      'HR staff relied on disconnected records for employee information, attendance, and reporting, which made updates slow and cross-checking error-prone.',
    solution:
      'Delivered a React admin application with Material UI components, Chart.js analytics, and Express.js APIs over MongoDB to manage employee profiles, attendance tracking, and HR dashboard views.',
    impact: [
      'Unified employee records and attendance visibility in a single HR workspace',
      'Gave HR staff chart-based summaries for workforce and attendance trends',
      'Reduced manual data gathering before payroll and reporting cycles',
      'Established a modular codebase that could extend into additional HR modules over time',
    ],
    technicalNotes: [
      'Built React dashboard views with Material UI for consistent enterprise-style forms and tables',
      'Visualized attendance and workforce metrics using Chart.js with filterable date ranges',
      'Implemented Express.js REST endpoints for employee CRUD, attendance logs, and summary queries',
      'Structured MongoDB models to separate employee profiles, attendance events, and reporting aggregates',
      'Applied component-driven patterns so HR modules could be extended without rewriting core layouts',
    ],
    highlights: ['HR analytics', 'Chart.js dashboards', 'Express + MongoDB'],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Material-UI', 'Chart.js'],
    images: ['/images/HRIS/Dashboard.png', '/images/HRIS/Login Page.png'],
    imageAlts: [
      'HRIS dashboard showing comprehensive human resource management tools including employee records, payroll overview, attendance tracking, and HR analytics with professional business interface',
      'HRIS login page with corporate branding, secure authentication system, and professional design for human resource management access',
    ],
    accessNote: PRIVATE_ACCESS_NOTE,
    featured: false,
  },
];
