import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import Node from './Node';
import Connection from './Connection';
import { MindMapData, NodeData } from '../../types/mindMap';

interface MindMapProps {
  data: MindMapData;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const [nodes, setNodes] = useState(data.nodes);
  const [connections] = useState(data.connections);
  const [isAnimating, setIsAnimating] = useState(true);
  
  const nodesMap = new Map<string, NodeData>();
  nodes.forEach(node => nodesMap.set(node.id, node));
  
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { tension: 280, friction: 60 },
  });
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full h-full relative overflow-hidden">      
      <animated.div 
        className="w-full h-full"
        style={{ ...fadeIn }}
      >
        <div className="w-full h-full relative">
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <g>
              {connections.map((connection) => (
                <Connection 
                  key={`${connection.source}-${connection.target}`}
                  connection={connection}
                  nodesMap={nodesMap}
                  isAnimating={isAnimating}
                />
              ))}
            </g>
          </svg>
          
          <div className="absolute inset-0">
            {nodes.map(node => (
              <Node
                key={node.id}
                node={node}
                isInteractive={false}
              />
            ))}
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default MindMap;
