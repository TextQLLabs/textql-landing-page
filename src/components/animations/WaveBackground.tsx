import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isWebGLAvailable } from '../../utils/webgl';

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !isWebGLAvailable()) return;

    let scene: THREE.Scene,
        camera: THREE.PerspectiveCamera,
        renderer: THREE.WebGLRenderer,
        plane: THREE.Points,
        geometry: THREE.PlaneGeometry,
        clock: THREE.Clock;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      
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
      containerRef.current?.appendChild(renderer.domElement);
      
      clock = new THREE.Clock();
      
      const planeWidth = 120;
      const planeHeight = 80;
      const widthSegments = 150;
      const heightSegments = 100;
      
      geometry = new THREE.PlaneGeometry(
        planeWidth,
        planeHeight,
        widthSegments,
        heightSegments
      );
      
      geometry.rotateX(-Math.PI / 3);
      
      const material = new THREE.PointsMaterial({
        color: 0xB8D8D0,
        size: 0.12,
        transparent: true,
        opacity: 0.6,
        fog: true
      });
      
      plane = new THREE.Points(geometry, material);
      scene.add(plane);
      
      scene.fog = new THREE.Fog(0x000000, 50, 120);
    };

    const onWindowResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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
      window.removeEventListener('resize', onWindowResize);
      renderer?.dispose();
      geometry?.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute top-0 left-0 w-full h-full -z-10" />;
}