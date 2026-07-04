export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'work' | 'education';
  description: string[];
  technologies?: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: 'genius-substrates-2026',
    title: 'Senior Software Engineer',
    company: 'Genius Substrates Inc.',
    location: 'Remote',
    period: '2026 - Present',
    type: 'work',
    description: [
      'Build and maintain production web applications, internal tools, and platform features for business operations and client-facing workflows',
      'Work across front-end and full-stack features using modern JavaScript frameworks, API integrations, data-driven UI patterns, and deployment-ready code',
      'Translate business requirements into usable dashboards, workflow tools, and system interfaces with clear UX and maintainable component structure',
      'Use AI-assisted development to speed up planning, scaffolding, debugging, and iteration while owning final implementation quality and system behavior',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: 'restore-masters-2025',
    title: 'Senior Software Engineer',
    company: 'RestoreMasters Contracting LLC',
    location: 'Remote',
    period: '2025 - 2026',
    type: 'work',
    description: [
      'Developed React and Next.js applications that digitized business processes, internal workflows, and operational reporting',
      'Built responsive dashboards, task-driven interfaces, real-time messaging features, and API-backed tools for production-style business systems',
      'Implemented authentication flows, searchable message history, WebSocket-based communication, and dynamic data handling',
      'Owned debugging, UI refinement, integration fixes, and release-ready code across front-end and back-end feature work',
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
  },
  {
    id: 'ustp-programmer',
    title: 'Computer Programmer',
    company: 'University of Science and Technology of Southern Philippines',
    location: 'Cagayan de Oro, Philippines',
    period: '2021 - 2025',
    type: 'work',
    description: [
      'Built and maintained institutional web systems for university operations, including GIAMS, EduSync, evitePro, HRIS, dashboards, and admin tools',
      'Developed Vue.js and React interfaces with REST API integration, responsive layouts, role-based workflows, and reusable UI components',
      'Improved usability, performance, and mobile responsiveness across internal applications used by staff, students, and end users',
      'Collaborated with teams to translate operational requirements into tested, maintainable, and production-ready web features',
    ],
    technologies: ['Vue.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'PostgreSQL'],
  },
];
