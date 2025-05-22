import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { NodeData } from '../../types/mindMap';

interface NodeProps {
  node: NodeData;
  isInteractive?: boolean;
}

const getNodeIcon = (id: string) => {
  if (id === 'central') {
    return <img src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/eb7781db-f2ba-4dfa-0593-56bbceeee500/public" alt="MCP Server" className="w-6 h-6 brightness-[10] contrast-[0.1] opacity-100" />;
  }
  if (id.includes('dashboard')) {
    return <img src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/dc29777c-76a1-4424-8322-b84a4fa24200/public" alt="Tableau" className="w-5 h-5" />;
  }
  return <img src="https://imagedelivery.net/3jS8EJceRTKI24-1Uc_BDg/82cd07cf-998c-4f79-2308-d42a533f3400/public" alt="TextQL" className="w-5 h-5" />;
};

const Node: React.FC<NodeProps> = ({ node, isInteractive = false }) => {
  const nodeSpring = useSpring({
    boxShadow: '0 4px 6px -1px rgba(42, 59, 53, 0.1), 0 2px 4px -2px rgba(42, 59, 53, 0.1)',
    config: { tension: 300, friction: 20 }
  });

  const getNodeStyles = () => {
    switch (node.type) {
      case 'central':
        return 'bg-[#2A3B35] text-[#F7F7F7] border-none px-8 py-4';
      case 'primary':
        return 'bg-[#F0F5F3] text-[#2A3B35] border-[#4A665C]';
      case 'secondary':
        return 'bg-[#F0F5F3] text-[#2A3B35] border-[#4A665C]';
      default:
        return 'bg-[#F0F5F3] text-[#2A3B35] border-[#4A665C]';
    }
  };

  return (
    <animated.div
      className={`absolute rounded-full border p-3 flex items-center gap-3 ${getNodeStyles()}`}
      style={{
        left: node.x,
        top: node.y,
        transform: 'translate(-50%, -50%)',
        boxShadow: nodeSpring.boxShadow,
        pointerEvents: 'none',
        minWidth: node.type === 'central' ? '200px' : '180px',
      }}
    >
      {getNodeIcon(node.id)}
      <span className={`whitespace-nowrap ${node.type === 'central' ? 'font-extralight text-lg' : 'font-light'}`}>
        {node.label}
      </span>
    </animated.div>
  );
};

export default Node;
