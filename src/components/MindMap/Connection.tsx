import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { NodeData, ConnectionData } from '../../types/mindMap';

interface ConnectionProps {
  connection: ConnectionData;
  nodesMap: Map<string, NodeData>;
  isAnimating: boolean;
}

const Connection: React.FC<ConnectionProps> = ({ connection, nodesMap, isAnimating }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  
  const source = nodesMap.get(connection.source);
  const target = nodesMap.get(connection.target);
  
  if (!source || !target) return null;
  
  const sourceX = source.x || 0;
  const sourceY = source.y || 0;
  const targetX = target.x || 0;
  const targetY = target.y || 0;
  
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  
  const curveX = sourceX < targetX ? 50 : -50;
  
  const path = `M${sourceX},${sourceY} C${midX + curveX},${sourceY} ${midX - curveX},${targetY} ${targetX},${targetY}`;
  
  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [path]);

  // Always flow from right to left
  const flowDirection = -1;
  
  const springProps = useSpring({
    from: { strokeDashoffset: isAnimating ? pathLength : 0 },
    to: { strokeDashoffset: 0 },
    config: { tension: 120, friction: 14 },
    delay: isAnimating ? 300 : 0,
  });

  // Animated data flow effect
  const flowProps = useSpring({
    from: { dashOffset: pathLength },
    to: { dashOffset: 0 },
    config: { duration: 3000 },
    loop: true,
    reset: true,
  });

  return (
    <g>
      {/* Base connection line */}
      <animated.path
        ref={pathRef}
        d={path}
        fill="none"
        stroke="#4A665C"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={springProps.strokeDashoffset}
        style={{
          filter: 'drop-shadow(0 1px 1px rgba(42, 59, 53, 0.1))',
          opacity: 0.3
        }}
      />
      
      {/* Animated flow effect */}
      <animated.path
        d={path}
        fill="none"
        stroke="#2A3B35"
        strokeWidth={2}
        strokeLinecap="round"
        strokeDasharray={`${pathLength * 0.1} ${pathLength * 0.9}`}
        style={{
          strokeDashoffset: flowProps.dashOffset,
          filter: 'drop-shadow(0 1px 1px rgba(42, 59, 53, 0.1))',
        }}
      />
    </g>
  );
};

export default Connection;