import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';

export function WaveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isWebGLAvailable()) return;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        grid: THREE.Points,
        clock: THREE.Clock;

    const init = () => {
      scene = new THREE.Scene();
      
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 5, 10);
      camera.lookAt(0, 0, 0);
      
      renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        alpha: true
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      
      clock = new THREE.Clock();

      // Create grid
      const geometry = new THREE.PlaneGeometry(30, 30, 50, 50);
      geometry.rotateX(-Math.PI / 3);

      const material = new THREE.PointsMaterial({
        color: 0xB8D8D0,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        fog: true
      });

      grid = new THREE.Points(geometry, material);
      scene.add(grid);

      scene.fog = new THREE.Fog(0x000000, 15, 30);
    };

    const onWindowResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const animate = () => {
      if (!grid || !renderer || !scene || !camera) return;
      requestAnimationFrame(animate);

      const time = clock.getElapsedTime() * 0.5;
      const positions = (grid.geometry as THREE.PlaneGeometry).attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const z = positions[i + 2];
        
        positions[i + 1] = 
          0.5 * Math.sin(x * 0.5 + time) +
          0.5 * Math.sin(z * 0.5 + time) +
          0.2 * Math.cos(x * 0.3 + z * 0.2 + time * 0.7);
      }

      grid.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    init();
    animate();
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer?.dispose();
      grid?.geometry.dispose();
      (grid?.material as THREE.Material)?.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 opacity-50"
      style={{ background: 'linear-gradient(to bottom, transparent, #000)' }}
    />
  );
}