import React, { useState } from 'react';
import { pageBuilderMock } from '../../data/demos/page-builder.mock';
import type { PageBuilderNode } from '../../types/demo';

interface ActionLogEntry {
  id: string;
  message: string;
  timestamp: string;
}

function TreeNode({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: PageBuilderNode;
  depth: number;
  selectedId: string | null;
  onSelect: (node: PageBuilderNode) => void;
}) {
  return (
    <>
      <button
        type="button"
        onClick={() => onSelect(node)}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        className={`w-full text-left py-1.5 pr-2 rounded-md text-sm transition-colors ${
          selectedId === node.id
            ? 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200'
            : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-secondary'
        }`}
      >
        <span className="text-[10px] uppercase tracking-wide opacity-60 mr-1">{node.type}</span>
        {node.label}
      </button>
      {node.children?.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </>
  );
}

const PageBuilderDemo: React.FC = () => {
  const mock = pageBuilderMock;
  const [microserviceId, setMicroserviceId] = useState(mock.microservices[0].id);
  const [pageId, setPageId] = useState(mock.microservices[0].pages[0].id);
  const [selectedNode, setSelectedNode] = useState<PageBuilderNode | null>(null);
  const [highlightRegion, setHighlightRegion] = useState<string | null>(null);
  const [structure] = useState(mock.structure);
  const [actionLog, setActionLog] = useState<ActionLogEntry[]>([]);
  const [showAddWidget, setShowAddWidget] = useState(false);
  const [showAddModule, setShowAddModule] = useState(false);

  const microservice = mock.microservices.find((m) => m.id === microserviceId)!;

  const logAction = (message: string) => {
    setActionLog((prev) => [
      {
        id: `${Date.now()}`,
        message,
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev.slice(0, 9),
    ]);
  };

  const handleSelectNode = (node: PageBuilderNode) => {
    setSelectedNode(node);
    setHighlightRegion(node.previewRegion ?? null);
  };

  const handleAddWidget = (widgetId: string) => {
    const widget = mock.widgetCatalog.find((w) => w.id === widgetId);
    if (!widget) return;
    logAction(`Added widget "${widget.label}" to page canvas`);
    setShowAddWidget(false);
  };

  const handleAddModule = (moduleId: string) => {
    const mod = mock.moduleCatalog.find((m) => m.id === moduleId);
    if (!mod) return;
    logAction(`Inserted module "${mod.label}" into sidebar slot`);
    setShowAddModule(false);
  };

  const handleSave = () => {
    logAction('Saved page configuration to database (simulated)');
  };

  const regionClass = (region: string) =>
    highlightRegion === region
      ? 'ring-2 ring-teal-500 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 rounded-lg'
      : '';

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Toolbar */}
      <div className="shrink-0 flex flex-wrap gap-3 items-center px-4 py-3 border-b border-gray-200/60 dark:border-white/10 bg-gray-50/80 dark:bg-gray-800/50">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-secondary">Microservice</span>
          <select
            value={microserviceId}
            onChange={(e) => {
              setMicroserviceId(e.target.value);
              const ms = mock.microservices.find((m) => m.id === e.target.value)!;
              setPageId(ms.pages[0].id);
              logAction(`Switched to microservice "${ms.name}"`);
            }}
            className="px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 text-primary text-sm"
          >
            {mock.microservices.map((ms) => (
              <option key={ms.id} value={ms.id}>{ms.name}</option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-secondary">Page</span>
          <select
            value={pageId}
            onChange={(e) => {
              setPageId(e.target.value);
              const page = microservice.pages.find((p) => p.id === e.target.value);
              logAction(`Opened page "${page?.title}"`);
            }}
            className="px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 text-primary text-sm"
          >
            {microservice.pages.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </label>
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setShowAddWidget(true)}
            className="px-3 py-1 rounded-md bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium"
          >
            + Widget
          </button>
          <button
            type="button"
            onClick={() => setShowAddModule(true)}
            className="px-3 py-1 rounded-md border border-teal-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 text-sm font-medium"
          >
            + Module
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-1 rounded-md bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Save
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row overflow-y-auto overscroll-contain lg:overflow-hidden">
        {/* Structure tree */}
        <aside className="w-full lg:w-52 shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200/60 dark:border-white/10 p-4 lg:h-full lg:overflow-y-auto overscroll-contain">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-secondary mb-3">
            Structure
          </h3>
          {structure.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedNode?.id ?? null}
              onSelect={handleSelectNode}
            />
          ))}
        </aside>

        {/* Canvas */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
          <div className={`grid grid-cols-2 gap-3 ${regionClass('stats-row')}`}>
            <div className="rounded-lg border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-gray-800/50">
              <p className="text-xs text-secondary">Total Calls</p>
              <p className="text-2xl font-bold text-primary mt-1">1,247</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">+12.3%</p>
            </div>
            <div className="rounded-lg border border-gray-200 dark:border-white/10 p-4 bg-white dark:bg-gray-800/50">
              <p className="text-xs text-secondary">Conversion Rate</p>
              <p className="text-2xl font-bold text-primary mt-1">34.2%</p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">+2.1%</p>
            </div>
          </div>

          <div className={`rounded-lg border border-dashed border-gray-300 dark:border-white/20 p-4 min-h-[120px] ${regionClass('activity-feed')}`}>
            <p className="text-xs font-medium text-secondary mb-2">Activity Feed</p>
            {['New lead assigned', 'Call completed (4m 32s)', 'Follow-up scheduled'].map((item) => (
              <div key={item} className="py-1.5 text-sm text-primary border-b border-gray-100 dark:border-white/5 last:border-0">
                {item}
              </div>
            ))}
          </div>

          <div className={`rounded-lg border border-dashed border-teal-400/40 p-3 min-h-[80px] ${regionClass('sidebar-slot')}`}>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">Sidebar Slot: drop module here</p>
            {selectedNode?.type === 'module' && (
              <p className="text-sm text-primary mt-2">{selectedNode.label}</p>
            )}
          </div>
        </div>

        {/* Inspector + action log */}
        <aside className="w-full lg:w-56 shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200/60 dark:border-white/10 p-4 lg:h-full lg:overflow-y-auto overscroll-contain">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-secondary mb-3">
            Inspector
          </h3>
          {selectedNode ? (
            <div className="text-sm space-y-2 mb-4">
              <p><span className="text-secondary">Type:</span> {selectedNode.type}</p>
              <p><span className="text-secondary">Label:</span> {selectedNode.label}</p>
              {selectedNode.previewRegion && (
                <p><span className="text-secondary">Region:</span> {selectedNode.previewRegion}</p>
              )}
            </div>
          ) : (
            <p className="text-sm text-secondary mb-4">Select a node in the structure tree.</p>
          )}

          <h3 className="text-xs font-semibold uppercase tracking-wide text-secondary mb-2">
            Action Log
          </h3>
          <ul className="space-y-1.5">
            {actionLog.length === 0 ? (
              <li className="text-xs text-secondary">No actions yet.</li>
            ) : (
              actionLog.map((entry) => (
                <li key={entry.id} className="text-xs text-secondary">
                  <span className="text-teal-600 dark:text-teal-400">{entry.timestamp}</span>
                  {': '}{entry.message}
                </li>
              ))
            )}
          </ul>
        </aside>
      </div>

      {/* Add widget modal */}
      {showAddWidget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowAddWidget(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-semibold text-primary mb-3">Add Widget</h4>
            <ul className="space-y-2">
              {mock.widgetCatalog.map((w) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => handleAddWidget(w.id)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                  >
                    <p className="text-sm font-medium text-primary">{w.label}</p>
                    <p className="text-xs text-secondary">{w.description}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Add module modal */}
      {showAddModule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" onClick={() => setShowAddModule(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 max-w-sm w-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h4 className="font-semibold text-primary mb-3">Add Module to Slot</h4>
            <ul className="space-y-2">
              {mock.moduleCatalog.map((m) => (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => handleAddModule(m.id)}
                    className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-white/10 hover:bg-teal-50 dark:hover:bg-teal-900/20"
                  >
                    <p className="text-sm font-medium text-primary">{m.label}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageBuilderDemo;
