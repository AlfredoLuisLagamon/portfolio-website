import React from 'react';
import type { DemoSlug } from '../../types/demo';
import MessagingWorkspaceDemo from './MessagingWorkspaceDemo';
import DeveloperWorkflowDemo from './DeveloperWorkflowDemo';
import PageBuilderDemo from './PageBuilderDemo';

const demoComponents: Record<DemoSlug, React.FC> = {
  'messaging-workspace': MessagingWorkspaceDemo,
  'developer-workflow': DeveloperWorkflowDemo,
  'page-builder': PageBuilderDemo,
};

interface DemoRendererProps {
  slug: DemoSlug;
}

const DemoRenderer: React.FC<DemoRendererProps> = ({ slug }) => {
  const DemoComponent = demoComponents[slug];
  return <DemoComponent />;
};

export default DemoRenderer;

export { demoComponents };
