import React from 'react';
import MindMap from '../../components/MindMap';
import { MindMapData } from '../../types/mindMap';

interface IntegrationMindMapProps {
  data: MindMapData;
  height?: string;
}

const IntegrationMindMap: React.FC<IntegrationMindMapProps> = ({ data, height = '500px' }) => {
  return (
    <div className="w-full relative bg-black/30 rounded-lg overflow-hidden" style={{ height }}>
      <div className="w-full h-full flex items-center justify-center">
        <div style={{ width: '1000px', height: '600px', position: 'relative' }}>
          <MindMap data={data} />
        </div>
      </div>
    </div>
  );
};

export default IntegrationMindMap;