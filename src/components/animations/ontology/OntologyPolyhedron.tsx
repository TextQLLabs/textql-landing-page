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
    handleMouseUp,
    handleWheel
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

  // Prevent wheel event from propagating and handle zoom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || config?.interactive === false) return;

    const wheelHandler = (event: WheelEvent) => {
      event.preventDefault();
      handleWheel(event);
    };

    container.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      container.removeEventListener('wheel', wheelHandler);
    };
  }, [config?.interactive]);

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