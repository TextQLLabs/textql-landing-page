import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';

class Particle {
  pos!: THREE.Vector3;
  speed!: number;
  offset!: number;
  initialY!: number;
  initialZ!: number;

  constructor() {
    this.reset();
  }
  
  reset() {
    this.pos = new THREE.Vector3(
      -1200,
      THREE.MathUtils.randFloatSpread(800),
      THREE.MathUtils.randFloatSpread(800)
    );
    this.speed = THREE.MathUtils.randFloat(4, 6);
    this.offset = Math.random() * Math.PI * 2;
    this.initialY = this.pos.y;
    this.initialZ = this.pos.z;
  }
  
  update() {
    this.pos.x += this.speed;
    const normalizedX = (this.pos.x + 1200) / 2400;
    const curve = Math.pow(Math.sin(normalizedX * Math.PI), 2);
    const radius = 400 * (1 - curve) * (0.8 + 0.2 * (0.5 - Math.cos(normalizedX * Math.PI * 2) / 2));
    const currentDistance = new THREE.Vector2(this.pos.y, this.pos.z).length();
    
    if (currentDistance > 0) {
      this.pos.y += (this.initialY / currentDistance * radius - this.pos.y) * 0.05;
      this.pos.z += (this.initialZ / currentDistance * radius - this.pos.z) * 0.05;
    }
    
    const angle = this.pos.x * 0.005 + this.offset;
    const spiral = curve * 2;
    this.pos.y += Math.sin(angle) * spiral + THREE.MathUtils.randFloatSpread(1);
    this.pos.z += Math.cos(angle) * spiral + THREE.MathUtils.randFloatSpread(1);
    
    if (this.pos.x > 1200) this.reset();
  }
}

interface FunnelFlowProps {
  color?: string;
  particleCount?: number;
  opacity?: number;
  className?: string;
}

export function FunnelFlow({ 
  color = '#B8D8D0',
  particleCount = 2000,
  opacity = 0.8,
  className = ''
}: FunnelFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isWebGLAvailable()) return;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        geometry: THREE.BufferGeometry,
        positions: Float32Array,
        particles: Particle[] = [],
        clock: THREE.Clock;

    // Track initial dimensions to avoid unnecessary resizes
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let resizeTimeout: number;
    
    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        2000
      );
      camera.position.set(0, 0, -1200);
      camera.lookAt(0, 0, 0);
      
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      
      geometry = new THREE.BufferGeometry();
      positions = new Float32Array(particleCount * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({
        color: new THREE.Color(color),
        size: 4,
        transparent: true,
        opacity
      })));
      
      for (let i = 0; i < particleCount; i++) {
        const p = new Particle();
        p.pos.x = THREE.MathUtils.randFloat(-1200, 1200);
        particles.push(p);
      }

      clock = new THREE.Clock();
    };

    const onWindowResize = () => {
      if (!camera || !renderer) return;
      
      // Clear any pending resize timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      
      // Debounce resize events and only resize for significant changes
      resizeTimeout = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        
        // Only resize if width changed significantly or height changed by more than typical mobile address bar (>100px)
        const widthChange = Math.abs(newWidth - lastWidth);
        const heightChange = Math.abs(newHeight - lastHeight);
        
        if (widthChange > 50 || heightChange > 100) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight);
          
          lastWidth = newWidth;
          lastHeight = newHeight;
        }
      }, 150); // 150ms debounce
    };

    const animate = () => {
      requestAnimationFrame(animate);
      particles.forEach((p, i) => {
        p.update();
        positions[i * 3] = p.pos.x;
        positions[i * 3 + 1] = p.pos.y;
        positions[i * 3 + 2] = p.pos.z;
      });
      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    init();
    animate();
    window.addEventListener('resize', onWindowResize);

    return () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      window.removeEventListener('resize', onWindowResize);
      renderer?.dispose();
      geometry?.dispose();
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [color, particleCount, opacity]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 -z-10 ${className}`}
    />
  );
}