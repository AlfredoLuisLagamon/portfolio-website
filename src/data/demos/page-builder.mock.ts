import type { PageBuilderMock } from '../../types/demo';

export const pageBuilderMock: PageBuilderMock = {
  microservices: [
    {
      id: 'agent-dashboard',
      name: 'Agent Dashboard',
      pages: [
        { id: 'overview', title: 'Overview' },
        { id: 'call-log', title: 'Call Log' },
      ],
    },
    {
      id: 'reports',
      name: 'Reports',
      pages: [
        { id: 'reports-dashboard', title: 'Reports Dashboard' },
        { id: 'export-history', title: 'Export History' },
      ],
    },
    {
      id: 'client-portal',
      name: 'Client Portal',
      pages: [{ id: 'home', title: 'Home' }],
    },
  ],
  structure: [
    {
      id: 'page-overview',
      label: 'Overview',
      type: 'page',
      children: [
        {
          id: 'w-stats',
          label: 'Stats Row Widget',
          type: 'widget',
          previewRegion: 'stats-row',
          children: [
            { id: 'm-total-calls', label: 'Total Calls Module', type: 'module', previewRegion: 'stats-row' },
            { id: 'm-conversion', label: 'Conversion Rate Module', type: 'module', previewRegion: 'stats-row' },
          ],
        },
        {
          id: 'w-activity',
          label: 'Activity Feed Widget',
          type: 'widget',
          previewRegion: 'activity-feed',
          children: [
            { id: 'm-feed-list', label: 'Feed List Module', type: 'module', previewRegion: 'activity-feed' },
            { id: 'slot-sidebar', label: 'Sidebar Slot', type: 'slot', previewRegion: 'sidebar-slot' },
          ],
        },
      ],
    },
  ],
  widgetCatalog: [
    { id: 'stats_card', label: 'Stats Card Row', description: 'Metric cards with trend indicators' },
    { id: 'data_table', label: 'Data Table', description: 'Sortable results grid with row actions' },
    { id: 'filter_bar', label: 'Filter Bar', description: 'Date, office, and rep scoping controls' },
    { id: 'kanban_board', label: 'Kanban Board', description: 'Stage-based card columns' },
  ],
  moduleCatalog: [
    { id: 'office_text', label: 'Heading or paragraph', slotId: 'slot-sidebar' },
    { id: 'office_button', label: 'Primary button', slotId: 'slot-sidebar' },
    { id: 'office_simple_list', label: 'Simple list', slotId: 'slot-sidebar' },
    { id: 'office_badge', label: 'Status badge', slotId: 'slot-sidebar' },
  ],
};
