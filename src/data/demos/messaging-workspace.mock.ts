import type { MessagingSearchResult, MessagingWorkspaceMock } from '../../types/demo';

const users = {
  alex: { id: 1, name: 'Alex Johnson', email: 'alex@example.com', status: 'online' as const },  maria: { id: 2, name: 'Maria Garcia', email: 'maria@example.com', status: 'away' as const },
  sam: { id: 3, name: 'Sam Lee', email: 'sam@example.com', status: 'offline' as const },
  emma: { id: 4, name: 'Emma Wilson', email: 'emma@example.com', status: 'online' as const },
  jack: { id: 5, name: 'Jack Brown', email: 'jack@example.com', status: 'offline' as const },
};

export const messagingWorkspaceMock: MessagingWorkspaceMock = {
  currentUser: users.alex,
  users: [users.alex, users.maria, users.sam, users.emma, users.jack],
  conversations: [
    {
      id: 1,
      name: 'Project Alpha Team',
      type: 'group',
      participants: [users.alex, users.maria, users.sam],
      lastMessage: {
        sender: 'Alex Johnson',
        content: 'Finished the design mockups for @ProjectAlpha. Can you review @Maria?',
        time: '10:23 AM',
        unread: true,
      },
      pinned: true,
    },
    {
      id: 2,
      name: 'Maria Garcia',
      type: 'direct',
      participants: [users.alex, users.maria],
      lastMessage: {
        sender: 'Maria Garcia',
        content: "Let's sync on @Team:Design requirements tomorrow",
        time: 'Yesterday',
        unread: false,
      },
      pinned: false,
    },
    {
      id: 3,
      name: 'Product Team',
      type: 'group',
      participants: [users.alex, users.emma, users.jack],
      lastMessage: {
        sender: 'Jack Brown',
        content: 'New feedback on @ProjectBeta launch checklist. Needs a review.',
        time: 'Monday',
        unread: true,
      },
      pinned: false,
    },
  ],
  messages: {
    1: [
      {
        id: 1,
        conversationId: 1,
        sender: users.alex,
        content: "Hey team, I've started working on the new @ProjectAlpha dashboard design",
        time: 'Yesterday, 4:30 PM',
        attachments: [],
      },
      {
        id: 2,
        conversationId: 1,
        sender: users.maria,
        content: 'Great! When do you think the first mockups will be ready? @Team:Design is waiting for an update.',
        time: 'Yesterday, 4:45 PM',
        attachments: [],
      },
      {
        id: 3,
        conversationId: 1,
        sender: users.sam,
        content: "I've prepared some data visualizations we can include. Take a look:",
        time: 'Yesterday, 5:15 PM',
        attachments: [{ type: 'image', name: 'data_viz_1.png' }],
      },
      {
        id: 4,
        conversationId: 1,
        sender: users.alex,
        content: "These look great, @Sam! I'll incorporate them. @Maria, mockups should be ready by end of day tomorrow.",
        time: 'Yesterday, 5:30 PM',
        attachments: [],
      },
      {
        id: 5,
        conversationId: 1,
        sender: users.alex,
        content: 'Finished the design mockups for @ProjectAlpha. Can you review @Maria?',
        time: '10:23 AM',
        attachments: [
          { type: 'image', name: 'dashboard_mockup.png' },
          { type: 'file', name: 'design_specs.pdf' },
        ],
        reactions: [{ emoji: '👍', count: 2, reactedByMe: false }],
      },
    ],
    2: [
      {
        id: 6,
        conversationId: 2,
        sender: users.maria,
        content: "Let's sync on @Team:Design requirements tomorrow",
        time: 'Yesterday',
        attachments: [],
      },
      {
        id: 7,
        conversationId: 2,
        sender: users.alex,
        content: 'Sounds good. I can walk through the @ProjectAlpha wireframes too.',
        time: 'Yesterday',
        attachments: [],
      },
    ],
    3: [
      {
        id: 8,
        conversationId: 3,
        sender: users.jack,
        content: 'New feedback on @ProjectBeta launch checklist. Needs a review.',
        time: 'Monday',
        attachments: [],
      },
      {
        id: 9,
        conversationId: 3,
        sender: users.emma,
        content: 'I can take the docs pass. @Jack can you share the latest file?',
        time: 'Monday',
        attachments: [{ type: 'file', name: 'launch_checklist.pdf' }],
      },
    ],
  },
  notifications: [
    {
      id: 'n1',
      type: 'mention',
      conversation: 'Project Alpha Team',
      preview: 'Alex mentioned you: "…can you review @Maria?"',
      time: '10:23 AM',
      read: false,
    },
    {
      id: 'n2',
      type: 'message',
      conversation: 'Product Team',
      preview: 'Jack: New feedback on @ProjectBeta launch checklist…',
      time: 'Monday',
      read: false,
    },
    {
      id: 'n3',
      type: 'message',
      conversation: 'Maria Garcia',
      preview: 'Maria: Let\'s sync on @Team:Design requirements tomorrow',
      time: 'Yesterday',
      read: true,
    },
  ],
  sidebar: [
    { id: 'global-search', label: 'Global Search Bar', type: 'module', highlightRegion: 'search' },
    { id: 'conversation-list', label: 'ConversationList', type: 'module', highlightRegion: 'list' },
    { id: 'message-list', label: 'MessageList', type: 'module', highlightRegion: 'thread' },
    { id: 'message-input', label: 'MessageInput', type: 'module', highlightRegion: 'input' },
    { id: 'send-message', label: 'Send Message Action', type: 'action', highlightRegion: 'input' },
    { id: 'global-search-action', label: 'Global Search Action', type: 'action', highlightRegion: 'search' },
    { id: 'add-reaction', label: 'Add Reaction Action', type: 'action', highlightRegion: 'thread' },
  ],
};

export function searchMessagingMock(
  mock: MessagingWorkspaceMock,
  query: string
): MessagingSearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: MessagingSearchResult[] = [];

  for (const conv of mock.conversations) {
    const thread = mock.messages[conv.id] ?? [];
    for (const msg of thread) {
      if (msg.content.toLowerCase().includes(q)) {
        results.push({
          id: `msg-${msg.id}`,
          resultType: 'message',
          label: conv.name,
          preview: msg.content,
          conversationId: conv.id,
          messageId: msg.id,
        });
      }
    }
  }

  for (const user of mock.users) {
    if (
      user.id !== mock.currentUser.id &&
      (user.name.toLowerCase().includes(q) || user.email.toLowerCase().includes(q))
    ) {
      results.push({
        id: `user-${user.id}`,
        resultType: 'user',
        label: user.name,
        preview: user.email,
      });
    }
  }

  const files = [
    { name: 'dashboard_mockup.png', conversationId: 1, messageId: 5 },
    { name: 'design_specs.pdf', conversationId: 1, messageId: 5 },
    { name: 'data_viz_1.png', conversationId: 1, messageId: 3 },
    { name: 'project_brief.docx', conversationId: 2, messageId: 6 },
  ];

  for (const file of files) {
    if (file.name.toLowerCase().includes(q)) {
      const conv = mock.conversations.find((c) => c.id === file.conversationId);
      results.push({
        id: `file-${file.name}`,
        resultType: 'file',
        label: file.name,
        preview: conv?.name,
        conversationId: file.conversationId,
        messageId: file.messageId,
      });
    }
  }

  return results;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getAvatarColor(id: number): string {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-teal-500',
    'bg-amber-500',
    'bg-rose-500',
  ];
  return colors[id % colors.length];
}
