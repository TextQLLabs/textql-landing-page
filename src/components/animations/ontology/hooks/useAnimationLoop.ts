import { useEffect } from 'react';
import * as THREE from 'three';
import { updateSpritesOpacity } from '../utils/fade';

export function useAnimationLoop(
  sceneRef: React.MutableRefObject<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    mainGroup: THREE.Group;
    sprites: THREE.Sprite[];
    clock: THREE.Clock;
  } | undefined>,
  rotationSpeedRef: React.MutableRefObject<{ x: number; y: number }>,
  isDraggingRef: React.MutableRefObject<boolean>,
  zoomLevelRef: React.MutableRefObject<number>
) {
  useEffect(() => {
    if (!sceneRef.current) return;

    const rotationAxis = new THREE.Vector3(0.2, 1, 0.1).normalize();
    const dampingFactor = 0.95;
    const baseRotationSpeed = 0.2;

    function animate() {
      if (!sceneRef.current) return;
      const { scene, camera, renderer, mainGroup, sprites, clock } = sceneRef.current;

      requestAnimationFrame(animate);

      // Update camera position based on zoom level
      const targetZ = zoomLevelRef.current;
      camera.position.z += (targetZ - camera.position.z) * 0.1;

      // Handle rotation
      if (isDraggingRef.current) {
        mainGroup.rotation.x += rotationSpeedRef.current.x;
        mainGroup.rotation.y += rotationSpeedRef.current.y;
      } else {
        // Apply damping to user-initiated rotation
        rotationSpeedRef.current.x *= dampingFactor;
        rotationSpeedRef.current.y *= dampingFactor;

        const currentMomentum = Math.abs(rotationSpeedRef.current.x) + Math.abs(rotationSpeedRef.current.y);
        
        if (currentMomentum > 0.0001) {
          mainGroup.rotation.x += rotationSpeedRef.current.x;
          mainGroup.rotation.y += rotationSpeedRef.current.y;
        }

        // Apply base rotation when not dragging
        const defaultRotation = new THREE.Matrix4();
        defaultRotation.makeRotationAxis(
          rotationAxis,
          baseRotationSpeed * clock.getDelta()
        );
        mainGroup.applyMatrix4(defaultRotation);
      }

      // Update sprite opacities with adjusted fade configuration
      updateSpritesOpacity(sprites, camera, mainGroup, {
        minOpacity: 0,
        maxOpacity: 1,
        fadeSpeed: 1,
        threshold: 0.1
      });

      renderer.render(scene, camera);
    }

    animate();
  }, [sceneRef, rotationSpeedRef, isDraggingRef, zoomLevelRef]);
}