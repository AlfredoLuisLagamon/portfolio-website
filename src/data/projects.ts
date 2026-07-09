import { Project } from '../types/project';

const FULL_STACK_DEMO_DESCRIPTION =
  'Built the interface, data model, and backend-style action flow for a sanitized interactive demo based on real platform work.';

export const projects: Project[] = [
  {
    title: 'Team Messaging Workspace',
    slug: 'messaging-workspace',
    tagline: 'Genius OS internal comms: conversations, mentions, search, and attachments',
    description: FULL_STACK_DEMO_DESCRIPTION,
    role: 'Full-Stack Developer, Genius OS Platform',
    context:
      'Built as part of Genius OS, where messaging worked as a tenant microservice connected to platform pages, modules, actions, and backend data flows.',
    problem:
      'Team updates were scattered across email and chat threads with no shared project context, mention awareness, or unified search across messages and files.',
    solution:
      'I built a full-stack messaging workspace with conversation switching, message search, mention highlighting, emoji reactions, attachment handling, optimistic message sending, and backend-style action flows for fetching, creating, and navigating messages.',
    impact: [
      'Demonstrates Genius OS tenant microservice UX with UI-heavy output backed by action/data-flow patterns',
      'Shows optimistic UI, mention rendering, and cross-module search navigation',
      'Sanitized generic team data runs fully in-browser for portfolio visitors',
    ],
    technicalNotes: [
      'Built both the interactive messaging UI and the supporting data/action flow patterns.',
      'Modeled conversations, messages, mentions, attachments, and reactions using sanitized data structures.',
      'Simulated backend actions for message fetch, search, send, react, and attachment preview.',
      'Added optimistic UI so sent messages appear immediately while the save action resolves.',
      'Designed the workspace as a Genius OS module, not a standalone chat app.',
    ],
    highlights: ['Full-stack demo', '@mentions & search', 'Optimistic send'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'PostgreSQL',
      'Sequelize',
      'Socket.io',
      'JWT',
      'UploadThing',
    ],
    images: [],
    demoType: 'interactive',
    ecosystem: 'genius-os',
    featured: true,
  },
  {
    title: 'Developer Workflow System',
    slug: 'developer-workflow',
    tagline: 'Genius OS Developer Studio: tasks, checklists, and team discussion',
    description: FULL_STACK_DEMO_DESCRIPTION,
    role: 'Full-Stack Developer, Genius OS Platform',
    context:
      'Part of Genius OS Developer Studio, where developers manage client-scoped tasks, track checklists, and collaborate through discussion threads tied to backend workflow state.',
    problem:
      'Developers juggled tasks across multiple clients without a unified view of priorities, progress checklists, or in-context discussion.',
    solution:
      'I built a full-stack developer workflow simulator with task queues, task details, milestones, module tracking, progress updates, fake attachment/reference handling, AI-style workspace analysis, module selection, and submission flow.',
    impact: [
      'Mirrors the production Developer Studio layout from the Genius OS platform',
      'Shows client-scoped task orchestration with queue tabs and checklist progress',
      'Discussion and submission flows demonstrate backend-style state without live endpoints',
    ],
    technicalNotes: [
      'Built the task execution UI and the backend-style workflow logic behind task state, progress updates, module selection, and submissions.',
      'Modeled task records, client context, milestones, modules, dependencies, notes, and submission readiness.',
      'Simulated async backend behavior for workspace analysis, AI suggestions, and submit actions.',
      'Used local sanitized JSON instead of real tenant data or private backend endpoints.',
      'Designed the flow around how developer work moves from task review to implementation to submission.',
    ],
    highlights: ['Full-stack demo', 'Task queues', 'Checklists & discussion'],
    technologies: [
      'Next.js',
      'React',
      'JavaScript',
      'Tailwind CSS',
      'PostgreSQL',
      'NextAuth',
      'AWS S3',
      'Zod',
      'Monaco Editor',
      'react-live',
    ],
    images: [],
    demoType: 'interactive',
    ecosystem: 'genius-os',
    featured: true,
  },
  {
    title: 'Dynamic Page Builder',
    slug: 'page-builder',
    tagline: 'Interactive page editor showing how pages are composed from widgets, modules, and backend actions',
    description: FULL_STACK_DEMO_DESCRIPTION,
    role: 'Full-Stack Developer, Enginezs / Genius OS Platform',
    context:
      'Enginezs is the visual builder layer of the Genius OS platform. Staff compose tenant microservice UIs through a workbench editor connected to page, widget, module, and action data models.',
    problem:
      'Page layouts were hard to iterate on without a visual editor that showed structure, live preview, configuration, and how backend actions wired into the composition model.',
    solution:
      'I built a full-stack dynamic page builder demo showing how pages can be assembled from microservices, widgets, modules, slots, and backend actions, with a structure tree, preview canvas, inspector panel, and simulated save-to-database flow.',
    impact: [
      'Demonstrates data-driven UI composition architecture across page, widget, module, and action layers',
      'Shows builder UX patterns: tree selection, canvas highlight, inspector panel',
      'Action log simulates backend persistence without exposing real internal endpoints',
    ],
    technicalNotes: [
      'Modeled the system around Page → Widget → Module → Action.',
      'Built the editor UI for selecting pages, inspecting structure, highlighting preview regions, and adding widgets/modules.',
      'Simulated backend persistence through a fake save log and action output panel.',
      'Represented backend action wiring without exposing real internal endpoints or database records.',
      'Used sanitized presets to show the architecture safely in a public portfolio.',
    ],
    highlights: ['Full-stack demo', 'Data-driven pages', '3-panel editor'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'Radix UI',
      'react-live',
      'AWS S3',
      'Framer Motion',
      'OpenAI',
    ],
    images: [],
    demoType: 'interactive',
    ecosystem: 'enginezs',
    featured: true,
  },
];
