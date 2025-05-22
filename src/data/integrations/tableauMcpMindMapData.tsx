import { MindMapData } from '../../types/mindMap';

export const tableauMcpMindMapData: MindMapData = {
  nodes: [
    { id: 'central', label: 'snowflake-mcp', type: 'central', x: 500, y: 300 },
    
    // Agent Nodes (Left Side)
    { id: 'weekly-update', label: 'Transaction Anomaly Agent', type: 'secondary', x: 200, y: 150 },
    { id: 'data-science', label: 'Customer Behavior Insights Agent', type: 'secondary', x: 200, y: 300 },
    { id: 'claude', label: 'Stockout Prevention Agent', type: 'secondary', x: 200, y: 450 },
    
    // Snowflake Schemas (Right Side)
    { id: 'dashboard1', label: 'ANALYTICS.SALES.TRANSACTIONS', type: 'primary', x: 800, y: 150 },
    { id: 'dashboard2', label: 'RAW_DATA.WEB_EVENTS', type: 'primary', x: 800, y: 300 },
    { id: 'dashboard3', label: 'RETAIL.INVENTORY.STOCK_LEVELS', type: 'primary', x: 800, y: 450 },
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