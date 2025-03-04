import { useRef, useCallback } from 'react';
import * as THREE from 'three';

export function useRotationControls() {
  const rotationSpeedRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const zoomLevelRef = useRef(5); // Initial camera distance
  const MIN_ZOOM = 2;  // Minimum zoom level (closest)
  const MAX_ZOOM = 10; // Maximum zoom level (farthest)
  const ZOOM_SPEED = 0.001; // Adjust this to control zoom sensitivity

  const handleMouseDown = useCallback((event: MouseEvent, container: HTMLElement) => {
    isDraggingRef.current = true;
    const rect = container.getBoundingClientRect();
    previousMouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  }, []);

  const handleMouseMove = useCallback((event: MouseEvent, container: HTMLElement) => {
    if (!isDraggingRef.current) return;

    const rect = container.getBoundingClientRect();
    const currentMouse = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };

    const deltaX = currentMouse.x - previousMouseRef.current.x;
    const deltaY = currentMouse.y - previousMouseRef.current.y;

    rotationSpeedRef.current = {
      x: deltaY * 0.005,
      y: deltaX * 0.005
    };

    previousMouseRef.current = currentMouse;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleWheel = useCallback((event: WheelEvent) => {
    event.preventDefault();
    
    // Update zoom level based on wheel delta
    const zoomDelta = event.deltaY * ZOOM_SPEED;
    zoomLevelRef.current = THREE.MathUtils.clamp(
      zoomLevelRef.current + zoomDelta,
      MIN_ZOOM,
      MAX_ZOOM
    );
  }, []);

  return {
    rotationSpeedRef,
    isDraggingRef,
    zoomLevelRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleWheel
  };
}