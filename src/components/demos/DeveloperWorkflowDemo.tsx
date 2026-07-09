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
    <div className="min-h-[640px] bg-gray-50 text-gray-800 dark:bg-[#0b0f14] dark:text-gray-200">
      <div className="overflow-auto p-4 space-y-4">
          {/* Overview header */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Developer Overview</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Manage client priorities, tasks, discussions, and tickets.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-gray-500">
              <span>SCOPE: <span className="text-gray-700 dark:text-gray-300">{mock.overview.scope}</span></span>
              <span>{mock.overview.visibleClients} visible clients</span>
              <span>Active: <span className="text-emerald-600 dark:text-emerald-400">{activeClient.name}</span></span>
              <span>Permissions: {mock.overview.permissions.join(', ')}</span>
            </div>
          </div>

          {/* Recent activity */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800/80 dark:bg-[#0f1419]">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.clients}</strong> clients</span>
                <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.openTasks}</strong> open tasks</span>
                <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.blocked}</strong> blocked</span>
                <span><strong className="text-gray-700 dark:text-gray-300">{mock.stats.tickets}</strong> tickets</span>
              </div>
            </div>
            <ul className="space-y-2">
              {mock.recentActivity.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{item.text}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0 dark:text-gray-600">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Two-column workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Clients */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800/80 dark:bg-[#0f1419]">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Clients</h3>
                <div className="space-y-2">
                  {mock.clients.map((client) => (
                    <button
                      key={client.id}
                      type="button"
                      onClick={() => selectClient(client.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        activeClientId === client.id
                          ? 'border-emerald-500/40 bg-emerald-50 dark:bg-emerald-500/5'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-800/60 dark:bg-[#0b0f14] dark:hover:border-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{client.name}</span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400">{client.status}</span>
                      </div>
                      <div className="flex gap-3 mt-1.5 text-xs text-gray-500">
                        <span>{getClientTaskCount(client.id)} tasks</span>
                        <span>{client.blocked} blocked</span>
                        <span>{client.tickets} tickets</span>
                        <span className="ml-auto">{client.updated}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority queue */}
              <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800/80 dark:bg-[#0f1419]">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Priority Task Queue</h3>
                <p className="text-xs text-gray-500 mb-3">{activeClient.name}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {QUEUE_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setQueueTab(tab.id)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                        queueTab === tab.id
                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                          : 'text-gray-500 hover:text-gray-700 border border-transparent dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label} ({queueCounts[tab.id]})
                    </button>
                  ))}
                </div>
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredTasks.length === 0 ? (
                    <li className="text-sm text-gray-500 py-4 text-center">No tasks in this queue</li>
                  ) : (
                    filteredTasks.map((task) => (
                      <li key={task.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTaskId(task.id);
                            setDetailTab('checklist');
                          }}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            activeTaskId === task.id
                              ? 'border-emerald-500/50 bg-emerald-50 dark:bg-emerald-500/10'
                              : 'border-gray-200 bg-gray-50 hover:border-gray-300 dark:border-gray-800/60 dark:bg-[#0b0f14] dark:hover:border-gray-700'
                          }`}
                        >
                          <p className="text-sm font-medium text-gray-900 line-clamp-2 dark:text-white">{task.title}</p>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <PriorityTag priority={task.priority} />
                            <StatusTag status={task.status} />
                            {task.unreadDiscussion > 0 && (
                              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-500/30">
                                {task.unreadDiscussion} unread
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-400 mt-1.5 dark:text-gray-600">
                            {task.doneWhen.filter((d) => d.done).length}/{task.doneWhen.length} done
                          </p>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

            {/* Right column: task detail */}
            <div className="rounded-xl border border-gray-200 bg-white p-4 flex flex-col min-h-[420px] dark:border-gray-800/80 dark:bg-[#0f1419]">
              <div className="flex flex-wrap gap-2 mb-2">
                {activeTask.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700"
                  >
                    {tag}
                  </span>
                ))}
                <PriorityTag priority={activeTask.priority} />
                <StatusTag status={activeTask.status} />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{activeTask.title}</h3>

              {activeTask.clientContext && (
                <div className="mt-3 p-3 rounded-lg bg-gray-50 border border-gray-200 dark:bg-[#0b0f14] dark:border-gray-800/60">
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1 dark:text-gray-600">Client Context</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activeTask.clientContext}</p>
                </div>
              )}

              <div className="mt-4">
                <button
                  type="button"
                  onClick={openTask}
                  className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
                >
                  Open task
                </button>
              </div>

              {/* Detail tabs */}
              <div className="flex gap-1 mt-5 border-b border-gray-200 dark:border-gray-800/80">
                <button
                  type="button"
                  onClick={() => setDetailTab('checklist')}
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
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
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
                    detailTab === 'discussion'
                      ? 'border-emerald-600 text-emerald-700 dark:border-emerald-500 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Discussion
                  {activeTask.unreadDiscussion > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-blue-100 text-blue-700 dark:bg-blue-500/30 dark:text-blue-400">
                      {activeTask.unreadDiscussion} unread
                    </span>
                  )}
                </button>
              </div>

              <div className="flex-1 mt-4 overflow-auto">
                {detailTab === 'checklist' && (
                  <ul className="space-y-2">
                    {activeTask.doneWhen.map((item) => (
                      <li key={item.id}>
                        <label className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-800/30">
                          <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleDoneWhen(item.id)}
                            className="mt-0.5 rounded border-gray-300 bg-white text-emerald-600 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-800 dark:text-emerald-500 dark:focus:ring-emerald-500"
                          />
                          <span className={`text-sm ${item.done ? 'text-gray-400 line-through dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {item.title}
                          </span>
                        </label>
                      </li>
                    ))}
                    <p className="text-xs text-gray-400 mt-2 pl-2 dark:text-gray-600">
                      {doneCount}/{doneTotal} complete
                    </p>
                  </ul>
                )}

                {detailTab === 'discussion' && (
                  <div className="space-y-3">
                    {activeTask.discussion.length === 0 ? (
                      <p className="text-sm text-gray-500">No discussion yet.</p>
                    ) : (
                      activeTask.discussion.map((msg) => (
                        <div key={msg.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200 dark:bg-[#0b0f14] dark:border-gray-800/60">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{msg.author}</span>
                            <span className="text-[10px] text-gray-400 dark:text-gray-600">{msg.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{msg.content}</p>
                        </div>
                      ))
                    )}
                    <div className="flex gap-2 pt-2">
                      <input
                        type="text"
                        value={discussionDraft}
                        onChange={(e) => setDiscussionDraft(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && postDiscussion()}
                        placeholder="Post an update…"
                        className="flex-1 px-3 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:bg-[#0b0f14] dark:border-gray-800 dark:text-gray-200 dark:placeholder-gray-600"
                      />
                      <button
                        type="button"
                        onClick={postDiscussion}
                        disabled={!discussionDraft.trim()}
                        className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-sm font-medium"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer sections */}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 dark:border-gray-800/80">
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1 dark:text-gray-600">Artifacts</p>
                  <p className="text-xs text-gray-500">No artifacts linked yet.</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-gray-400 mb-1 dark:text-gray-600">Linked Entities & Changes</p>
                  <p className="text-xs text-gray-500">No linked changes yet.</p>
                </div>
                <button type="button" className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                  + Add private note
                </button>
              </div>
            </div>
          </div>
        </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm text-gray-800 shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200">
          {toast}
        </div>
      )}
    </div>
  );
};

export default DeveloperWorkflowDemo;
