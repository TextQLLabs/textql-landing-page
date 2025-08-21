import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';

interface WaveBackgroundProps {
  theme?: 'light' | 'dark';
  scale?: number; // Scale factor for the wave size (stretches the patterns)
  coverage?: number; // Coverage factor (more area but same pattern size)
}

export function WaveBackground({ theme = 'dark', scale = 1, coverage = 1 }: WaveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isWebGLAvailable()) return;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        plane: THREE.Points,
        geometry: THREE.PlaneGeometry,
        clock: THREE.Clock;

    // Track initial dimensions to avoid unnecessary resizes
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;
    let resizeTimeout: number;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(theme === 'light' ? 0xF7F7F7 : 0x000000);
      
      camera = new THREE.PerspectiveCamera(
        35,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 20, 70);
      camera.lookAt(0, 0, 0);
      
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // Prevent canvas from creating extra space
      renderer.domElement.style.display = 'block';
      renderer.domElement.style.verticalAlign = 'top';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      
      containerRef.current?.appendChild(renderer.domElement);
      
      clock = new THREE.Clock();
      
      // Coverage increases the plane size and segments proportionally
      // This gives more wave area without stretching the patterns
      const basePlaneWidth = 120;
      const basePlaneHeight = 80;
      const baseWidthSegments = 150;
      const baseHeightSegments = 100;
      
      const planeWidth = basePlaneWidth * coverage * scale;
      const planeHeight = basePlaneHeight * coverage * scale;
      const widthSegments = Math.floor(baseWidthSegments * coverage);
      const heightSegments = Math.floor(baseHeightSegments * coverage);
      
      geometry = new THREE.PlaneGeometry(
        planeWidth,
        planeHeight,
        widthSegments,
        heightSegments
      );
      
      geometry.rotateX(-Math.PI / 3);
      
      const material = new THREE.PointsMaterial({
        color: theme === 'light' ? 0x2A3B35 : 0xB8D8D0,
        size: 0.15,
        transparent: true,
        opacity: 0.6,
        fog: true
      });
      
      plane = new THREE.Points(geometry, material);
      scene.add(plane);
      
      scene.fog = new THREE.Fog(theme === 'light' ? 0xF7F7F7 : 0x000000, 50, 120);
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
      if (!geometry || !renderer || !scene || !camera) return;
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 0.5;
      const positions = geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        
        positions[i + 1] = 
          1.0 * Math.sin(time * 0.25 + z * 0.2) +
          0.8 * Math.sin(x * 0.3 + time * 0.35) +
          0.4 * Math.sin(z * 0.5 + x * 0.5 + time * 0.5) +
          1.2 * Math.sin(time * 0.1) +
          0.5 * Math.cos(x * 0.2 + z * 0.2 + time * 0.15);
      }
      
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
  }, [theme, scale, coverage]); // Added coverage to dependency array

  return <div ref={containerRef} style={{ 
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  }} />;
}