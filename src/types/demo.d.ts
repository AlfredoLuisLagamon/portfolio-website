export interface MessagingUser {
  id: number;
  name: string;
  email: string;
  status: 'online' | 'away' | 'offline';
}

export interface MessagingAttachment {
  type: 'image' | 'file';
  name: string;
}

export interface MessagingReaction {
  emoji: string;
  count: number;
  reactedByMe?: boolean;
}

export interface MessagingMessage {
  id: number;
  conversationId: number;
  sender: MessagingUser;
  content: string;
  time: string;
  attachments: MessagingAttachment[];
  reactions?: MessagingReaction[];
}

export interface MessagingConversation {
  id: number;
  name: string;
  type: 'group' | 'direct';
  participants: MessagingUser[];
  lastMessage: {
    sender: string;
    content: string;
    time: string;
    unread: boolean;
  };
  pinned: boolean;
}

export interface MessagingNotification {
  id: string;
  type: 'mention' | 'message';
  conversation: string;
  preview: string;
  time: string;
  read: boolean;
}

export interface MessagingSidebarNode {
  id: string;
  label: string;
  type: 'module' | 'action';
  parentId?: string;
  highlightRegion: string;
}

export interface MessagingSearchResult {
  id: string;
  resultType: 'message' | 'user' | 'file';
  label: string;
  preview?: string;
  conversationId?: number;
  messageId?: number;
}

export interface MessagingWorkspaceMock {
  currentUser: MessagingUser;
  users: MessagingUser[];
  conversations: MessagingConversation[];
  messages: Record<number, MessagingMessage[]>;
  notifications: MessagingNotification[];
  sidebar: MessagingSidebarNode[];
}

export interface WorkflowTask {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'complete';
  priority: 'high' | 'medium' | 'low';
  clientId: string;
  tags: string[];
  clientContext?: string;
  unreadDiscussion: number;
  queueTab: 'priority' | 'due_today' | 'blocked' | 'waiting';
  doneWhen: { id: string; title: string; done: boolean }[];
  discussion: { id: string; author: string; content: string; time: string }[];
  requirements: string[];
  milestones: { id: string; title: string; done: boolean }[];
  modules: { id: string; name: string; status: 'pending' | 'in_progress' | 'done' }[];
}

export interface WorkflowActivity {
  id: string;
  text: string;
  time: string;
}

export interface WorkflowClient {
  id: string;
  name: string;
  status: string;
  tasks: number;
  blocked: number;
  tickets: number;
  updated: string;
  active?: boolean;
}

export interface WorkflowAiSuggestion {
  id: string;
  name: string;
  reason: string;
}

export interface DeveloperWorkflowMock {
  developer: { name: string; initials: string };
  overview: {
    scope: string;
    visibleClients: number;
    activeClient: string;
    permissions: string[];
  };
  stats: { clients: number; openTasks: number; blocked: number; tickets: number };
  recentActivity: WorkflowActivity[];
  clients: WorkflowClient[];
  tasks: WorkflowTask[];
  aiSuggestions: WorkflowAiSuggestion[];
}

export interface PageBuilderNode {
  id: string;
  label: string;
  type: 'page' | 'widget' | 'module' | 'slot';
  children?: PageBuilderNode[];
  previewRegion?: string;
}

export interface PageBuilderMicroservice {
  id: string;
  name: string;
  pages: { id: string; title: string }[];
}

export interface PageBuilderMock {
  microservices: PageBuilderMicroservice[];
  structure: PageBuilderNode[];
  widgetCatalog: { id: string; label: string; description: string }[];
  moduleCatalog: { id: string; label: string; slotId: string }[];
}

export type DemoSlug =
  | 'messaging-workspace'
  | 'developer-workflow'
  | 'page-builder';
