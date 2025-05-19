import { useEffect, useRef } from 'react';
import { Text } from '../../ui';

const COLORS = {
  primary: '#0f8a7a', // User bubble color
  secondary: '#0D4A42', // Assistant bubble color
  accent: '#B8D8D0', // Text color
  background: '#0D4A42' // Assistant bubble background
};

interface Node {
  x: number;
  y: number;
  width: number;
  height: number;
  placed?: boolean;
  distanceToMouse?: number;
}

interface MousePosition {
  x: number;
  y: number;
}

function checkOverlap(node: Node, nodes: Node[]): boolean {
  const padding = 20; // Minimum space between nodes
  return nodes.some(other => {
    if (!other.placed) return false;
    return !(
      node.x + node.width + padding < other.x ||
      node.x > other.x + other.width + padding ||
      node.y + node.height + padding < other.y ||
      node.y > other.y + other.height + padding
    );
  });
}

function findValidPosition(node: Node, canvas: HTMLCanvasElement, nodes: Node[]): void {
  const maxAttempts = 100;
  let attempts = 0;
  const dpr = window.devicePixelRatio;
  
  while (attempts < maxAttempts) {
    // Use logical (CSS) pixels for positioning
    node.x = Math.random() * (canvas.offsetWidth - node.width - 40);
    node.y = Math.random() * (canvas.offsetHeight - node.height - 40);
    
    if (!checkOverlap(node, nodes)) {
      node.placed = true;
      return;
    }
    attempts++;
  }
  // If no valid position found, place it anyway
  node.placed = true;
}

function calculateDistance(node: Node, mousePos: MousePosition): number {
  const nodeCenter = {
    x: node.x + node.width / 2,
    y: node.y + node.height / 2
  };
  
  return Math.sqrt(
    Math.pow(nodeCenter.x - mousePos.x, 2) + 
    Math.pow(nodeCenter.y - mousePos.y, 2)
  );
}

function drawNode(ctx: CanvasRenderingContext2D, node: Node, mousePos: MousePosition | null) {
  // Randomly choose between user and assistant bubble colors
  const isUserNode = node.width > 50; // Deterministic choice based on node size
  ctx.fillStyle = COLORS.background;
  
  // Calculate proximity effect
  const proximityThreshold = 100;
  const distance = mousePos ? calculateDistance(node, mousePos) : proximityThreshold + 1;
  const proximity = Math.max(0, 1 - distance / proximityThreshold);
  
  // Create gradient for the border
  const gradient = ctx.createLinearGradient(
    node.x, node.y,
    node.x + node.width, node.y + node.height
  );
  const borderColor = isUserNode ? COLORS.primary : COLORS.secondary;
  
  // Adjust opacity based on mouse proximity
  const baseOpacity = 0.5;
  const maxOpacity = 1;
  const opacity = baseOpacity + (maxOpacity - baseOpacity) * proximity;
  
  gradient.addColorStop(0, `${borderColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
  gradient.addColorStop(0.5, borderColor);
  gradient.addColorStop(1, `${borderColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
  
  // Draw node with gradient border
  ctx.beginPath();
  ctx.rect(node.x, node.y, node.width, node.height);
  ctx.fill();
  
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 2 + (proximity * 1);
  ctx.stroke();
}

function drawConnection(
  ctx: CanvasRenderingContext2D,
  start: Node,
  end: Node,
  isDirectLine = true
) {
  ctx.strokeStyle = COLORS.accent + '30';
  ctx.lineWidth = 1;
  
  ctx.beginPath();
  ctx.moveTo(start.x + start.width / 2, start.y + start.height / 2);
  
  ctx.lineTo(end.x + end.width / 2, end.y + end.height / 2);
  ctx.stroke();
}

export function EnterpriseStats() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef<MousePosition | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Array<[number, number]>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Store the device pixel ratio
    const dpr = window.devicePixelRatio;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial canvas size
    function updateCanvasSize() {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr); // Scale all future drawing operations
    }
    
    updateCanvasSize();

    // Create abstract nodes
    nodesRef.current = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * (canvas.offsetWidth - 60),
      y: Math.random() * (canvas.offsetHeight - 30),
      width: 40 + Math.random() * 20,
      height: 20,
      placed: false
    }));

    // Place nodes without overlap
    nodesRef.current.forEach(node => {
      findValidPosition(node, canvas, nodesRef.current);
    });

    // Generate static connections
    connectionsRef.current = nodesRef.current.map((_, i) => {
      const connections: [number, number][] = [];
      const numConnections = 1 + Math.floor(Math.random() * 2);
      
      for (let j = 0; j < numConnections; j++) {
        let targetIndex;
        do {
          targetIndex = Math.floor(Math.random() * nodesRef.current.length);
        } while (targetIndex === i);
        
        connections.push([i, targetIndex]);
      }
      return connections;
    }).flat();
    const render = () => {
      if (!canvas || !ctx) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw connections first
      connectionsRef.current.forEach(([sourceIndex, targetIndex]) => {
        drawConnection(
          ctx,
          nodesRef.current[sourceIndex],
          nodesRef.current[targetIndex]
        );
      });

      // Draw nodes
      nodesRef.current.forEach(node => drawNode(ctx, node, mousePos.current));

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      mousePos.current = null;
    };

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full bg-black/20"
        style={{ opacity: 0.8, cursor: 'pointer' }}
      />
    </div>
  );
}