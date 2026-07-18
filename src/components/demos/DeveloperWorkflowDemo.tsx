import React, { useState, useMemo } from 'react';
import { developerWorkflowMock } from '../../data/demos/developer-workflow.mock';
import type { WorkflowTask } from '../../types/demo';

type QueueTab = 'priority' | 'due_today' | 'blocked' | 'waiting';
type DetailTab = 'checklist' | 'discussion';

const QUEUE_TABS: { id: QueueTab; label: string }[] = [
  { id: 'priority', label: 'Priority' },
  { id: 'due_today', label: 'Due Today' },
  { id: 'blocked', label: 'Blocked' },
  { id: 'waiting', label: 'Waiting' },
];

function PriorityTag({ priority }: { priority: WorkflowTask['priority'] }) {
  if (priority === 'high') {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30">
        High
      </span>
    );
  }
  if (priority === 'medium') {
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
        Medium
      </span>
    );
  }
  return (
    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30">
      Low
    </span>
  );
}

function StatusTag({ status }: { status: WorkflowTask['status'] }) {
  const styles: Record<WorkflowTask['status'], string> = {
    pending: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-500/30',
    in_progress: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30',
    submitted: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-500/30',
    complete: 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-500/20 dark:text-gray-400 dark:border-gray-500/30',
  };
  const labels: Record<WorkflowTask['status'], string> = {
    pending: 'Pending',
    in_progress: 'In Progress',
    submitted: 'Submitted',
    complete: 'Complete',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

const DeveloperWorkflowDemo: React.FC = () => {
  const mock = developerWorkflowMock;
  const [tasks, setTasks] = useState<WorkflowTask[]>(mock.tasks);
  const [activeClientId, setActiveClientId] = useState(mock.clients[0].id);
  const [activeTaskId, setActiveTaskId] = useState(
    mock.tasks.find((t) => t.clientId === mock.clients[0].id)!.id
  );
  const [queueTab, setQueueTab] = useState<QueueTab>('priority');
  const [detailTab, setDetailTab] = useState<DetailTab>('checklist');
  const [discussionDraft, setDiscussionDraft] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const activeTask = tasks.find((t) => t.id === activeTaskId)!;
  const activeClient = mock.clients.find((c) => c.id === activeClientId)!;

  const clientTasks = useMemo(
    () => tasks.filter((t) => t.clientId === activeClientId),
    [tasks, activeClientId]
  );

  const queueCounts = useMemo(
    () => ({
      priority: clientTasks.filter((t) => t.queueTab === 'priority').length,
      due_today: clientTasks.filter((t) => t.queueTab === 'due_today').length,
      blocked: clientTasks.filter((t) => t.queueTab === 'blocked').length,
      waiting: clientTasks.filter((t) => t.queueTab === 'waiting').length,
    }),
    [clientTasks]
  );

  const filteredTasks = clientTasks.filter((t) => t.queueTab === queueTab);

  const getClientTaskCount = (clientId: string) =>
    tasks.filter((t) => t.clientId === clientId).length;

  const selectClient = (clientId: string) => {
    setActiveClientId(clientId);
    const firstTask = tasks.find((t) => t.clientId === clientId);
    if (firstTask) {
      setActiveTaskId(firstTask.id);
      setQueueTab(firstTask.queueTab);
    }
    setDetailTab('checklist');
  };

  const doneCount = activeTask.doneWhen.filter((d) => d.done).length;
  const doneTotal = activeTask.doneWhen.length;

  const toggleDoneWhen = (itemId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId
          ? {
              ...t,
              doneWhen: t.doneWhen.map((d) => (d.id === itemId ? { ...d, done: !d.done } : d)),
            }
          : t
      )
    );
  };

  const openTask = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId && t.status === 'pending'
          ? { ...t, status: 'in_progress' as const }
          : t
      )
    );
    setDetailTab('checklist');
    setToast('Task opened');
    setTimeout(() => setToast(null), 2500);
  };

  const postDiscussion = () => {
    const text = discussionDraft.trim();
    if (!text) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTaskId
          ? {
              ...t,
              unreadDiscussion: 0,
              discussion: [
                ...t.discussion,
                { id: `d-${Date.now()}`, author: mock.developer.name, content: text, time: 'Just now' },
              ],
            }
          : t
      )
    );
    setDiscussionDraft('');
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-gray-50 text-gray-800 dark:bg-[#0b0f14] dark:text-gray-200">
      {/* Compact chrome: fills the frame without mid-card crops */}
      <div className="shrink-0 border-b border-gray-200/80 px-4 py-3 dark:border-gray-800/80">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">Developer Overview</h2>
            <p className="mt-0.5 text-xs text-gray-500">
              Active: <span className="text-emerald-600 dark:text-emerald-400">{activeClient.name}</span>
              <span className="mx-1.5 text-gray-300 dark:text-gray-700">·</span>
              {mock.overview.scope}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
            <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.clients}</strong> clients</span>
            <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.openTasks}</strong> open</span>
            <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.blocked}</strong> blocked</span>
            <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.tickets}</strong> tickets</span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-3 overflow-y-auto overscroll-contain p-3 lg:overflow-hidden">
        {/* Left: clients + queue */}
        <div className="flex min-h-[320px] flex-col gap-3 overflow-hidden lg:min-h-0">
          <div className="shrink-0 rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800/80 dark:bg-[#0f1419]">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Clients</h3>
            <div className="flex gap-2 overflow-x-auto overscroll-contain pb-0.5">
              {mock.clients.map((client) => (
                <button
                  key={client.id}
                  type="button"
                  onClick={() => selectClient(client.id)}
                  className={`min-w-[9.5rem] flex-1 text-left rounded-lg border p-2.5 transition-colors ${
                    activeClientId === client.id
                      ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/5'
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-800/60 dark:bg-[#0b0f14] dark:hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-medium text-gray-900 dark:text-white">{client.name}</span>
                    <span className="shrink-0 text-[10px] text-emerald-600 dark:text-emerald-400">{client.status}</span>
                  </div>
                  <p className="mt-1 text-[10px] text-gray-500">
                    {getClientTaskCount(client.id)} tasks · {client.blocked} blocked
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="min-h-0 flex-1 flex flex-col rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800/80 dark:bg-[#0f1419]">
            <div className="shrink-0 mb-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Priority Task Queue</h3>
              <p className="text-xs text-gray-500">{activeClient.name}</p>
            </div>
            <div className="shrink-0 mb-2 flex flex-wrap gap-1">
              {QUEUE_TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setQueueTab(tab.id)}
                  className={`rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                    queueTab === tab.id
                      ? 'border border-emerald-200 bg-emerald-100 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400'
                      : 'border border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.label} ({queueCounts[tab.id]})
                </button>
              ))}
            </div>
            <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain">
              {filteredTasks.length === 0 ? (
                <li className="py-6 text-center text-sm text-gray-500">No tasks in this queue</li>
              ) : (
                filteredTasks.map((task) => (
                  <li key={task.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTaskId(task.id);
                        setDetailTab('checklist');
                      }}
                      className={`w-full rounded-lg border p-3 text-left transition-colors ${
                        activeTaskId === task.id
                          ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-800/60 dark:bg-[#0b0f14] dark:hover:border-gray-700'
                      }`}
                    >
                      <p className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <PriorityTag priority={task.priority} />
                        <StatusTag status={task.status} />
                        {task.unreadDiscussion > 0 && (
                          <span className="rounded border border-blue-200 bg-blue-100 px-2 py-0.5 text-[10px] text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400">
                            {task.unreadDiscussion} unread
                          </span>
                        )}
                      </div>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        {/* Right: task detail */}
        <div className="flex min-h-[360px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-3 lg:min-h-0 dark:border-gray-800/80 dark:bg-[#0f1419]">
          <div className="shrink-0">
            <div className="mb-2 flex flex-wrap gap-2">
              {activeTask.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-gray-200 bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                >
                  {tag}
                </span>
              ))}
              <PriorityTag priority={activeTask.priority} />
              <StatusTag status={activeTask.status} />
            </div>

            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{activeTask.title}</h3>

            {activeTask.clientContext && (
              <p className="mt-2 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">{activeTask.clientContext}</p>
            )}

            <div className="mt-3">
              <button
                type="button"
                onClick={openTask}
                className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
              >
                Open task
              </button>
            </div>

            <div className="mt-3 flex gap-1 border-b border-gray-200 dark:border-gray-800/80">
              <button
                type="button"
                onClick={() => setDetailTab('checklist')}
                className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  detailTab === 'checklist'
                    ? 'border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Checklist {doneCount}/{doneTotal}
              </button>
              <button
                type="button"
                onClick={() => setDetailTab('discussion')}
                className={`border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
                  detailTab === 'discussion'
                    ? 'border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Discussion
                {activeTask.unreadDiscussion > 0 && (
                  <span className="ml-1.5 rounded bg-blue-100 px-1.5 py-0.5 text-[10px] text-blue-700 dark:bg-blue-500/30 dark:text-blue-400">
                    {activeTask.unreadDiscussion}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pt-3">
            {detailTab === 'checklist' && (
              <ul className="space-y-1.5">
                {activeTask.doneWhen.map((item) => (
                  <li key={item.id}>
                    <label className="flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800/30">
                      <input
                        type="checkbox"
                        checked={item.done}
                        onChange={() => toggleDoneWhen(item.id)}
                        className="mt-0.5 rounded border-gray-300 bg-white text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-emerald-500"
                      />
                      <span className={`text-sm ${item.done ? 'text-gray-400 line-through dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                        {item.title}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            )}

            {detailTab === 'discussion' && (
              <div className="flex h-full min-h-0 flex-col">
                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto overscroll-contain">
                  {activeTask.discussion.length === 0 ? (
                    <p className="text-sm text-gray-500">No discussion yet.</p>
                  ) : (
                    activeTask.discussion.map((msg) => (
                      <div key={msg.id} className="rounded-lg border border-gray-200 bg-gray-50 p-2.5 dark:border-gray-800/60 dark:bg-[#0b0f14]">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{msg.author}</span>
                          <span className="text-[10px] text-gray-400 dark:text-gray-600">{msg.time}</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{msg.content}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className="shrink-0 mt-2 flex gap-2">
                  <input
                    type="text"
                    value={discussionDraft}
                    onChange={(e) => setDiscussionDraft(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && postDiscussion()}
                    placeholder="Post an update…"
                    className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-gray-800 dark:bg-[#0b0f14] dark:text-gray-200 dark:placeholder-gray-600"
                  />
                  <button
                    type="button"
                    onClick={postDiscussion}
                    disabled={!discussionDraft.trim()}
                    className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500 disabled:opacity-40"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
          {toast}
        </div>
      )}
    </div>
  );
};

export default DeveloperWorkflowDemo;
