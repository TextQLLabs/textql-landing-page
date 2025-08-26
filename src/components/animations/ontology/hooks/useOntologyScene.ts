import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createDottedLineGeometry } from '../utils/geometry';
import { createSprites } from '../utils/sprites';
import type { OntologyConfig } from '../types';

export function useOntologyScene(
  containerRef: React.RefObject<HTMLDivElement>,
  config?: OntologyConfig,
  webGLAvailable: boolean = true
) {
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mainGroup: THREE.Group;
    sprites: THREE.Sprite[];
    clock: THREE.Clock;
  }>();

  useEffect(() => {
    if (!containerRef.current || !webGLAvailable) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Camera setup with wider field of view
    const camera = new THREE.PerspectiveCamera(
      50, // Increased FOV for wider view
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 12); // Moved camera further back
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit to 2x for performance
    containerRef.current.appendChild(renderer.domElement);

    const clock = new THREE.Clock();

    // Main group setup - Adjusted scale
    const mainGroup = new THREE.Group();
    mainGroup.scale.multiplyScalar(1.4); // Reduced from 1.8 to 1.4 to prevent overflow
    mainGroup.position.y = 0; // Centered vertically
    scene.add(mainGroup);

    // Geometry setup
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const edgesGeometry = createDottedLineGeometry(geometry);

    // Updated line material with thicker lines and higher opacity
    const edges = new THREE.LineSegments(
      edgesGeometry,
      new THREE.LineDashedMaterial({
        color: 0xb8d8d0,
        transparent: true,
        opacity: config?.opacity?.lines?.default ?? 0.4,
        linewidth: 5,
        scale: 2,
        dashSize: 0.1,
        gapSize: 0.05,
        depthTest: false,
        depthWrite: false,
      })
    );

    // Add a glow effect
    const glowMaterial = new THREE.LineDashedMaterial({
      color: 0xb8d8d0,
      transparent: true,
      opacity: 0.2,
      linewidth: 3,
      scale: 2,
      dashSize: 0.1,
      gapSize: 0.05,
      depthTest: false,
      depthWrite: false,
    });

    const glowEdges = new THREE.LineSegments(edgesGeometry.clone(), glowMaterial);
    glowEdges.scale.multiplyScalar(1.02);
    mainGroup.add(glowEdges);
    mainGroup.add(edges);

    // Create sprites
    const sprites = createSprites(geometry, mainGroup);

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      mainGroup,
      sprites,
      clock
    };

    // Window resize handler
    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const { camera, renderer } = sceneRef.current;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Maintain pixel ratio on resize
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (renderer) {
        renderer.dispose();
        geometry.dispose();
        edgesGeometry.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      }
    };
  }, [config, webGLAvailable]);

  return sceneRef;
}