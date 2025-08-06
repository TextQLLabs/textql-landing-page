import React, { useRef, useEffect } from 'react';
import { useOntologyScene } from './hooks/useOntologyScene';
import { useRotationControls } from './hooks/useRotationControls';
import { useAnimationLoop } from './hooks/useAnimationLoop';
import { isWebGLAvailable } from '../../../utils/webgl';
import type { OntologyConfig } from './types';

interface OntologyPolyhedronProps {
  config?: OntologyConfig;
}

export function OntologyPolyhedron({ config }: OntologyPolyhedronProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useOntologyScene(containerRef, config, isWebGLAvailable());
  const {
    rotationSpeedRef,
    isDraggingRef,
    zoomLevelRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  } = useRotationControls();

  useAnimationLoop(sceneRef, rotationSpeedRef, isDraggingRef, zoomLevelRef);

  // Event handlers - only attach if interactive
  const onMouseDown = (event: React.MouseEvent) => {
    if (config?.interactive === false) return;
    if (containerRef.current) {
      handleMouseDown(event.nativeEvent, containerRef.current);
    }
  };

  const onMouseMove = (event: React.MouseEvent) => {
    if (config?.interactive === false) return;
    if (containerRef.current) {
      handleMouseMove(event.nativeEvent, containerRef.current);
    }
  };

  // Note: Wheel/scroll events removed to allow normal page scrolling
  // Only mouse drag panning is supported

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 ${config?.interactive !== false ? 'cursor-grab active:cursor-grabbing' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
}