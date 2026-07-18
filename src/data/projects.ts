import { Project } from '../types/project';

const FULL_STACK_DEMO_DESCRIPTION =
  'Built the interface, data model, and backend-style action flow for a sanitized interactive demo based on real platform work.';

export const projects: Project[] = [
  {
    title: 'Team Messaging Workspace',
    slug: 'messaging-workspace',
    tagline:
      'Realtime Slack-style workspace: Socket.io rooms, JWT/SSO auth, cursor-paginated feeds, and PWA push',
    description: FULL_STACK_DEMO_DESCRIPTION,
    role: 'Full-Stack Developer, Genius OS Platform',
    context:
      'Built as a Genius OS client microservice for internal team chat: DMs, group channels, mentions, files, and notifications, wired into the wider platform via shared user identity, SSO, and CRM-triggered bot messages.',
    problem:
      'The team needed durable, searchable internal messaging with realtime delivery, not email threads. That meant a production stack: persist-first APIs, WebSocket fan-out, multi-path auth against platform users, and a PWA that still works when the tab is backgrounded.',
    solution:
      'I built a Next.js 15 + Express monorepo with PostgreSQL/Sequelize for conversations and messages, Socket.io rooms for live delivery, multi-path JWT/SSO auth, UploadThing attachments, cursor-based infinite scroll, optimistic sends, and VAPID web-push via a service worker, deployed as Vercel frontend + Railway API + Supabase Postgres.',
    impact: [
      'Realtime chat with REST for durability and Socket.io for fan-out (conversation rooms + per-user notification rooms)',
      'Polymorphic user resolution so messaging UUIDs work across platform identity tables without brittle FKs',
      'Production split deploy (Vercel / Railway / Supabase) with PWA install, offline IndexedDB cache, and push notifications',
    ],
    technicalNotes: [
      'Architecture: Next.js/React UI → Axios REST + Socket.io client → Express controllers → Sequelize models; after each persist, the API emits to conversation rooms and user_${id} rooms.',
      'Realtime: join_conversation / receive_message / typing / messages_read; client-side reconnect, heartbeat, and ~16ms event batching so typing and reactions stay smooth under load.',
      'Auth: stacked middleware (platform JWT, direct login, session, SSO token exchange) so the workspace can embed in the parent app or stand alone.',
      'Data model: Conversations + UserConversations (pinned, lastRead watermark), Messages with JSONB metadata, Tags/MessageTag, Reactions, Files/MessageAttachments; unread derived from lastRead, not per-message receipts.',
      'UX engineering: optimistic temp IDs reconciled on socket confirm, cursor pagination for live feeds, UploadThing for files, and a VAPID + service-worker push stack with IndexedDB offline caching.',
    ],
    highlights: ['Socket.io realtime', 'Optimistic send + cursor pages', 'JWT/SSO + PWA push'],
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
      'Web Push',
      'PWA',
    ],
    images: [],
    demoType: 'interactive',
    ecosystem: 'genius-os',
    featured: true,
  },
  {
    title: 'Developer Workflow System',
    slug: 'developer-workflow',
    tagline:
      'Client-scoped task queues, Done-when checklists, task discussion, and work-session gates',
    description: FULL_STACK_DEMO_DESCRIPTION,
    role: 'Full-Stack Developer, Genius OS Platform',
    context:
      'Built as the Genius OS developer dashboard (Developer Studio): the daily hub where in-house developers pick up client-scoped work, prove progress against Done-when criteria, discuss in task threads, and clock in/out against Railway-backed workflow state.',
    problem:
      'Delivery work was spread across clients with no single queue of assigned priorities, no shared definition of done tied to client goals, and no audit trail that forced discussion and checklist progress before a session could close.',
    solution:
      'I built the App Router studio at /genius-os/developers/dashboard: Regular/Legacy task buckets enriched with managed-priority lanes, task detail with Done-when + completion checklists, InlineDiscussion with S3 attachments, and a CompactWorkflowBar that clocks sessions through Route Handlers with server-side clock-out gates.',
    impact: [
      'Client-scoped task orchestration: assigned microdata tasks sorted by active priority lane, cockpit activity, then recency',
      'Proof-oriented delivery: Done-when progress on managed priorities, discussion messages, and S3/Loom proofs before clock-out',
      'SQL-first Next.js APIs on Railway Postgres with custom cookie sessions, developer scopes, and unread counts from conversation last_read_at',
    ],
    technicalNotes: [
      'Architecture: Next.js App Router UI → /api/genius-os/* Route Handlers → raw SQL via railwayQuery on Railway PostgreSQL; tasks join task_assignments, client labels, and client managed-priority tables.',
      'Queues: GET /api/genius-os/tasks?bucket=regular|legacy; enrichTasksWithManagedPriorityLanes exposes execution_lane (in_progress/queued), Done-when client notes, and unread discussion counts.',
      'Done-when: criteria live as done_when text[] + done_when_progress JSONB on managed priorities (shared with the client priority queue), not a simple boolean checklist on the task row.',
      'Discussion: microdata_tasks.conversation_id → conversations/messages; InlineDiscussion handles mentions, Loom embeds, and S3 uploads (presigned / streamed) as attachment proofs.',
      'Work sessions: CompactWorkflowBar polls daily-workflow + work-session APIs; clock-out is gated server-side on task discussion activity and at least one Done-when line completed since session start.',
    ],
    highlights: ['Priority-lane queues', 'Done-when + S3 proofs', 'Gated work sessions'],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'PostgreSQL',
      'AWS S3',
      'Radix UI',
      'Framer Motion',
      'Zod',
    ],
    images: [],
    demoType: 'interactive',
    ecosystem: 'genius-os',
    featured: true,
  },
  {
    title: 'Dynamic Page Engine',
    slug: 'page-builder',
    tagline:
      'Schema-driven UI: backend Page → Widget → Module → Action config renders interfaces without redeploying pages',
    description: FULL_STACK_DEMO_DESCRIPTION,
    role: 'Full-Stack Developer, Enginezs / Genius OS Platform',
    context:
      'Enginezs is the Genius OS studio for composing multi-client microservice UIs. Unlike a Squarespace/Wix-style CMS (fixed template + dynamic content), this engine stores composition itself: which components appear, their order, config, actions, and layout come from Railway Postgres rows that production also loads.',
    problem:
      'Client interfaces needed to change structure and behavior without rewriting or redeploying individual pages. A content CMS only swaps text and images; we needed configuration that drives the component tree, slot layout, and gateway action bindings.',
    solution:
      'I built a schema-driven rendering and workbench system: staff edit Page → Widget → Module trees with slot injection (SZ_SLOT_*), @enginezs metadata and actionBindings, react-live preview parity to the production runner, and typed POST /api/editor/save operations that persist composition to PostgreSQL.',
    impact: [
      'Changing backend configuration produces a different page structure and behavior without touching frontend route code',
      'Same composition model in Enginezs preview and Vibezs-runner production (keyed DynamicWidget / DynamicModule trees)',
      'Differentiates from content-driven builders: data selects components, order, permissions, and actions, not only copy and media',
    ],
    technicalNotes: [
      'Architecture: Page (db_pages_enhanced) composes DynamicWidget shells; widgets host DynamicModule slot entities; modules bind to gateway action_definitions via StoredActionBinding[].',
      'Runtime: DynamicPageRenderer builds widgetCodeMap / moduleCodeMap from DB rows, binds them into nested react-live scopes (baseLiveScope + GatewayClient), and compiles page.code_content.',
      'Editor UX: Workbench structure tree ↔ canvas inspect selection ↔ inspector; module appearance fields are driven by MODULE_APPEARANCE_SECTIONS schema, values stored in leading /** @enginezs {…} */ JSON.',
      'Composition DSL: typed save kinds (page/widget/module, inject_module_into_widget, append_widget_tag, …) in editor-repository; AST-aware injection splices tags inside Page returns; revisions snapshot to enginezs_editor_snapshots.',
      'vs CMS: not Fixed template + dynamic content. API/config → page → widget → module → action → rendered interface, so layout and capabilities change with schema, not only filled-in fields.',
    ],
    highlights: ['Schema-driven UI', 'Page → Widget → Module', 'Config changes structure'],
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
