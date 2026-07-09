import React, { useState, useCallback, useRef, useEffect } from 'react';
import {
  messagingWorkspaceMock,
  searchMessagingMock,
  getInitials,
  getAvatarColor,
} from '../../data/demos/messaging-workspace.mock';
import type {
  MessagingMessage,
  MessagingNotification,
  MessagingSearchResult,
} from '../../types/demo';

function renderMentionContent(content: string, highlightTerm?: string) {
  const segments = content.split(/(@[\w:]+)/g);
  return segments.map((part, i) => {
    if (part.startsWith('@')) {
      return (
        <span key={i} className="text-blue-600 dark:text-blue-400 font-medium">
          {part}
        </span>
      );
    }
    if (highlightTerm && part.toLowerCase().includes(highlightTerm.toLowerCase())) {
      const escaped = highlightTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(${escaped})`, 'gi');
      return part.split(regex).map((sub, j) =>
        sub.toLowerCase() === highlightTerm.toLowerCase() ? (
          <mark key={`${i}-${j}`} className="bg-yellow-500/40 text-inherit rounded px-0.5">
            {sub}
          </mark>
        ) : (
          <span key={`${i}-${j}`}>{sub}</span>
        )
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function Avatar({ user, size = 'md' }: { user: { id: number; name: string }; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm';
  return (
    <div
      className={`${dim} ${getAvatarColor(user.id)} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}
    >
      {getInitials(user.name)}
    </div>
  );
}

const MessagingWorkspaceDemo: React.FC = () => {
  const mock = messagingWorkspaceMock;
  const [activeConversationId, setActiveConversationId] = useState(1);
  const [messagesByConv, setMessagesByConv] = useState<Record<number, MessagingMessage[]>>(
    () => JSON.parse(JSON.stringify(mock.messages))
  );
  const [draft, setDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MessagingSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [notifications, setNotifications] = useState<MessagingNotification[]>(mock.notifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupSelection, setGroupSelection] = useState<number[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [highlightMessageId, setHighlightMessageId] = useState<number | null>(null);
  const [highlightTerm, setHighlightTerm] = useState<string | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [isTyping, setIsTyping] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const nextMessageId = useRef(100);

  const activeConversation = mock.conversations.find((c) => c.id === activeConversationId)!;
  const thread = messagesByConv[activeConversationId] ?? [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [thread, activeConversationId, isTyping]);

  const handleSelectConversation = (id: number) => {
    setActiveConversationId(id);
    setMobileView('chat');
    setHighlightMessageId(null);
    setHighlightTerm(null);
    if (id === 2) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessagesByConv((prev) => {
          const existing = prev[2] ?? [];
          if (existing.some((m) => m.id === 99)) return prev;
          return {
            ...prev,
            2: [
              ...existing,
              {
                id: 99,
                conversationId: 2,
                sender: mock.users.find((u) => u.id === 2)!,
                content: 'Sure, I can review the @ProjectAlpha mockups this afternoon.',
                time: 'Just now',
                attachments: [],
              },
            ],
          };
        });
      }, 1500);
    }
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    const newMsg: MessagingMessage = {
      id: nextMessageId.current++,
      conversationId: activeConversationId,
      sender: mock.currentUser,
      content: text,
      time: 'Just now',
      attachments: [],
    };
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConversationId]: [...(prev[activeConversationId] ?? []), newMsg],
    }));
    setDraft('');
  };

  const handleReaction = (messageId: number) => {
    setMessagesByConv((prev) => ({
      ...prev,
      [activeConversationId]: (prev[activeConversationId] ?? []).map((msg) => {
        if (msg.id !== messageId) return msg;
        const reactions = msg.reactions ?? [];
        const existing = reactions.find((r) => r.emoji === '👍');
        if (existing?.reactedByMe) {
          return {
            ...msg,
            reactions: reactions
              .map((r) =>
                r.emoji === '👍'
                  ? { ...r, count: Math.max(0, r.count - 1), reactedByMe: false }
                  : r
              )
              .filter((r) => r.count > 0),
          };
        }
        if (existing) {
          return {
            ...msg,
            reactions: reactions.map((r) =>
              r.emoji === '👍' ? { ...r, count: r.count + 1, reactedByMe: true } : r
            ),
          };
        }
        return { ...msg, reactions: [{ emoji: '👍', count: 1, reactedByMe: true }] };
      }),
    }));
  };

  const runSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        setSearchResults([]);
        setShowSearchResults(false);
        return;
      }
      setIsSearching(true);
      setShowSearchResults(true);
      setTimeout(() => {
        setSearchResults(searchMessagingMock(mock, query));
        setIsSearching(false);
      }, 400);
    },
    [mock]
  );

  const handleSearchResultClick = (result: MessagingSearchResult) => {
    const term = searchQuery;
    if (result.conversationId) {
      setActiveConversationId(result.conversationId);
      setMobileView('chat');
      if (result.messageId) {
        setHighlightMessageId(result.messageId);
        setHighlightTerm(term);
      }
    }
    setShowSearchResults(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCreateGroup = () => {
    if (groupSelection.length < 1) return;
    setShowGroupModal(false);
    setGroupSelection([]);
    setToast('Group created (demo)');
    setTimeout(() => setToast(null), 3000);
  };

  const toggleGroupMember = (id: number) => {
    setGroupSelection((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[560px] bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Conversation list */}
      <div
        className={`w-full lg:w-64 border-r border-gray-200 dark:border-gray-700/60 flex flex-col bg-gray-50 dark:bg-gray-900 ${
          mobileView === 'chat' ? 'hidden lg:flex' : 'flex'
        }`}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-700/60">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => runSearch(e.target.value)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
              placeholder="Search messages, people, files…"
              className="w-full px-3 py-2 pl-8 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <svg className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                {isSearching ? (
                  <div className="p-3 text-sm text-gray-500 dark:text-gray-400">Searching…</div>
                ) : searchResults.length === 0 ? (
                  <div className="p-3 text-sm text-gray-500 dark:text-gray-400">No results</div>
                ) : (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => handleSearchResultClick(result)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-100 border-b border-gray-100 last:border-0 dark:hover:bg-gray-700 dark:border-gray-700/50"
                    >
                      <p className="text-xs text-blue-600 dark:text-blue-400 uppercase">{result.resultType}</p>
                      <p className="text-sm font-medium truncate">{result.label}</p>
                      {result.preview && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{result.preview}</p>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2 border-b border-gray-200 dark:border-gray-700/60">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Messages</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowGroupModal(true)}
              className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Create group"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setShowNotifications((v) => !v)}
              className="relative p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 hover:text-gray-800 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Notifications"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {showNotifications && (
          <div className="border-b border-gray-200 dark:border-gray-700/60 bg-gray-100/80 max-h-40 overflow-y-auto dark:bg-gray-800/80">
            {notifications.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() =>
                  setNotifications((prev) =>
                    prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
                  )
                }
                className={`w-full text-left px-3 py-2 border-b border-gray-200/80 hover:bg-gray-200/80 dark:border-gray-700/40 dark:hover:bg-gray-700/50 ${
                  !n.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <p className="text-xs text-blue-600 dark:text-blue-400">{n.type === 'mention' ? 'Mention' : 'Message'}</p>
                <p className="text-sm font-medium">{n.conversation}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{n.preview}</p>
              </button>
            ))}
          </div>
        )}

        <ul className="flex-1 overflow-y-auto">
          {mock.conversations.map((conv) => (
            <li key={conv.id}>
              <button
                type="button"
                onClick={() => handleSelectConversation(conv.id)}
                className={`w-full text-left px-3 py-3 flex gap-3 hover:bg-gray-100 transition-colors dark:hover:bg-gray-800/80 ${
                  activeConversationId === conv.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <Avatar user={conv.participants[conv.type === 'direct' ? 1 : 0] ?? conv.participants[0]} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm truncate">{conv.name}</span>
                    <span className="text-[10px] text-gray-400 flex-shrink-0">{conv.lastMessage.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{conv.lastMessage.content}</p>
                </div>
                {conv.lastMessage.unread && (
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat panel */}
      <div
        className={`flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 ${
          mobileView === 'list' ? 'hidden lg:flex' : 'flex'
        }`}
      >
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700/60 flex items-center gap-3 bg-white dark:bg-gray-900">
          <button
            type="button"
            onClick={() => setMobileView('list')}
            className="lg:hidden p-1 rounded hover:bg-gray-100 text-gray-500 dark:hover:bg-gray-800 dark:text-gray-400"
            aria-label="Back to conversations"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <Avatar user={activeConversation.participants[activeConversation.type === 'direct' ? 1 : 0] ?? activeConversation.participants[0]} />
          <div>
            <h3 className="font-semibold text-sm">{activeConversation.name}</h3>
            <p className="text-xs text-gray-500">
              {activeConversation.participants.length} participants
            </p>
          </div>
        </div>

        <div
          ref={threadRef}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          {thread.map((msg) => {
            const isMe = msg.sender.id === mock.currentUser.id;
            const isHighlighted = highlightMessageId === msg.id;
            return (
              <div
                key={msg.id}
                className={`flex gap-2 group ${isMe ? 'flex-row-reverse' : ''} ${
                  isHighlighted ? 'ring-2 ring-yellow-500/60 rounded-lg p-1 -m-1' : ''
                }`}
              >
                {!isMe && <Avatar user={msg.sender} size="sm" />}
                <div className={`max-w-[75%] ${isMe ? 'items-end' : ''}`}>
                  {!isMe && (
                    <p className="text-[10px] text-gray-500 mb-0.5 ml-1">{msg.sender.name}</p>
                  )}
                  <div
                    className={`px-3 py-2 rounded-2xl text-sm ${
                      isMe
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md dark:bg-gray-800 dark:text-gray-100'
                    }`}
                  >
                    {renderMentionContent(
                      msg.content,
                      highlightMessageId === msg.id ? highlightTerm ?? undefined : undefined
                    )}
                  </div>
                  {msg.attachments.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {msg.attachments.map((att) =>
                        att.type === 'image' ? (
                          <div
                            key={att.name}
                            className="w-48 h-28 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-xs text-gray-500 dark:bg-gray-800 dark:border-gray-700"
                          >
                            📷 {att.name}
                          </div>
                        ) : (
                          <div
                            key={att.name}
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300"
                          >
                            📄 {att.name}
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                    {msg.reactions && msg.reactions.length > 0 && (
                      <button
                        type="button"
                        onClick={() => handleReaction(msg.id)}
                        className={`text-xs px-1.5 py-0.5 rounded-full bg-gray-100 border border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ${
                          msg.reactions[0].reactedByMe ? 'border-blue-500' : ''
                        }`}
                      >
                        {msg.reactions[0].emoji} {msg.reactions[0].count}
                      </button>
                    )}
                    {!msg.reactions?.length && (
                      <button
                        type="button"
                        onClick={() => handleReaction(msg.id)}
                        className="opacity-0 group-hover:opacity-100 text-xs text-gray-400 hover:text-gray-600 transition-opacity dark:text-gray-500 dark:hover:text-gray-300"
                      >
                        👍 React
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {isTyping && (
            <div className="flex gap-2 items-center text-sm text-gray-500">
              <Avatar user={mock.users.find((u) => u.id === 2)!} size="sm" />
              <span className="px-3 py-2 bg-gray-100 rounded-2xl rounded-bl-md dark:bg-gray-800">
                <span className="inline-flex gap-1">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce dark:bg-gray-500" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s] dark:bg-gray-500" />
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s] dark:bg-gray-500" />
                </span>
              </span>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700/60 bg-white dark:bg-gray-900">
          <div className="flex gap-2">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Message… use @ProjectAlpha or @Maria"
              className="flex-1 px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!draft.trim()}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Group modal */}
      {showGroupModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowGroupModal(false)}
        >
          <div
            className="bg-white rounded-xl p-4 max-w-sm w-full border border-gray-200 shadow-xl dark:bg-gray-800 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Create Group</h4>
            <ul className="space-y-2 mb-4">
              {mock.users
                .filter((u) => u.id !== mock.currentUser.id)
                .map((user) => (
                  <li key={user.id}>
                    <label className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700/50">
                      <input
                        type="checkbox"
                        checked={groupSelection.includes(user.id)}
                        onChange={() => toggleGroupMember(user.id)}
                      />
                      <Avatar user={user} size="sm" />
                      <span className="text-sm">{user.name}</span>
                    </label>
                  </li>
                ))}
            </ul>
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowGroupModal(false)}
                className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateGroup}
                disabled={groupSelection.length < 1}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white text-sm font-medium"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 shadow-lg dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100">
          {toast}
        </div>
      )}
    </div>
  );
};

export default MessagingWorkspaceDemo;
