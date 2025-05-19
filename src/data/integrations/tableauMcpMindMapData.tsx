import { MindMapData } from '../../types/mindMap';

export const tableauMcpMindMapData: MindMapData = {
  nodes: [
    { id: 'central', label: 'tableau-mcp', type: 'central', x: 500, y: 300 },
    
    // Agent Nodes (Left Side)
    { id: 'weekly-update', label: 'Churn Prediction Agent', type: 'secondary', x: 200, y: 150 },
    { id: 'data-science', label: 'Customer News Update Agent', type: 'secondary', x: 200, y: 300 },
    { id: 'claude', label: 'Margin Alert Agent', type: 'secondary', x: 200, y: 450 },
    
    // Tableau Dashboards (Right Side)
    { id: 'dashboard1', label: 'Sales Analytics', type: 'primary', x: 800, y: 150 },
    { id: 'dashboard2', label: 'Customer Insights', type: 'primary', x: 800, y: 300 },
    { id: 'dashboard3', label: 'Operations KPIs', type: 'primary', x: 800, y: 450 },
  ],
  connections: [
    { source: 'central', target: 'weekly-update' },
    { source: 'central', target: 'data-science' },
    { source: 'central', target: 'claude' },
    { source: 'central', target: 'dashboard1' },
    { source: 'central', target: 'dashboard2' },
    { source: 'central', target: 'dashboard3' },
  ]
};