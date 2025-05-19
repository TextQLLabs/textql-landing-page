export interface NodeData {
  id: string;
  label: string;
  type?: 'central' | 'primary' | 'secondary';
  x?: number;
  y?: number;
}

export interface ConnectionData {
  source: string;
  target: string;
}

export interface MindMapData {
  nodes: NodeData[];
  connections: ConnectionData[];
}