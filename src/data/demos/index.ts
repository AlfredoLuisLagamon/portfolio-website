import type { DemoSlug } from '../../types/demo';
import { messagingWorkspaceMock } from './messaging-workspace.mock';
import { developerWorkflowMock } from './developer-workflow.mock';
import { pageBuilderMock } from './page-builder.mock';

export interface DemoMeta {
  slug: DemoSlug;
  title: string;
  tagline: string;
  ecosystem: 'genius-os' | 'geniuzs-os' | 'enginezs' | 'genius-os-marketing';
}

export const demoRegistry: Record<DemoSlug, DemoMeta> = {
  'messaging-workspace': {
    slug: 'messaging-workspace',
    title: 'Team Messaging Workspace',
    tagline: 'Genius OS internal comms: conversations, mentions, search, and attachments',
    ecosystem: 'genius-os',
  },
  'developer-workflow': {
    slug: 'developer-workflow',
    title: 'Developer Workflow System',
    tagline: 'Genius OS Developer Studio: tasks, checklists, and team discussion',
    ecosystem: 'genius-os',
  },
  'page-builder': {
    slug: 'page-builder',
    title: 'Dynamic Page Engine',
    tagline:
      'Schema-driven UI: Page → Widget → Module → Action config renders interfaces without redeploying pages',
    ecosystem: 'enginezs',
  },
};

export const demoMocks = {
  'messaging-workspace': messagingWorkspaceMock,
  'developer-workflow': developerWorkflowMock,
  'page-builder': pageBuilderMock,
} as const;

export function isDemoSlug(value: string): value is DemoSlug {
  return value in demoRegistry;
}
