import * as THREE from 'three';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { BusinessObject } from './types';

export function createDottedLineGeometry(
  baseGeometry: THREE.BufferGeometry
): THREE.BufferGeometry {
  const edgesGeometry = new THREE.EdgesGeometry(baseGeometry);
  const positions = edgesGeometry.attributes.position.array as Float32Array;
  const vertexCount = positions.length / 3;

  const linePositions: number[] = [];
  const lineDistances: number[] = [];
  let totalDistance = 0;

  for (let i = 0; i < vertexCount; i += 2) {
    const startX = positions[i * 3];
    const startY = positions[i * 3 + 1];
    const startZ = positions[i * 3 + 2];
    const endX = positions[i * 3 + 3];
    const endY = positions[i * 3 + 4];
    const endZ = positions[i * 3 + 5];

    linePositions.push(startX, startY, startZ, endX, endY, endZ);

    const segmentLength = new THREE.Vector3(
      endX - startX,
      endY - startY,
      endZ - startZ
    ).length();

    lineDistances.push(totalDistance, totalDistance + segmentLength);
    totalDistance += segmentLength;
  }

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(linePositions, 3)
  );
  lineGeometry.setAttribute(
    'lineDistance',
    new THREE.Float32BufferAttribute(lineDistances, 1)
  );

  return lineGeometry;
}

export function createPillSprite(businessObject: BusinessObject): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const width = 128;
  const height = 32;
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;

  context.clearRect(0, 0, width, height);

  // Rounded rectangle (pill shape)
  const radius = height / 2;
  context.beginPath();
  context.moveTo(radius, 0);
  context.lineTo(width - radius, 0);
  context.arcTo(width, 0, width, radius, radius);
  context.arcTo(width, height, width - radius, height, radius);
  context.lineTo(radius, height);
  context.arcTo(0, height, 0, radius, radius);
  context.arcTo(0, 0, radius, 0, radius);
  context.closePath();

  // Gradient fill
  const gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, `${businessObject.color}22`);
  gradient.addColorStop(1, `${businessObject.color}44`);
  context.fillStyle = gradient;
  context.fill();

  // Border
  context.strokeStyle = businessObject.color;
  context.lineWidth = 1.5;
  context.stroke();

  // Draw the icon (as an inline SVG -> Image)
  const IconComponent = businessObject.icon;
  const iconSvg = ReactDOMServer.renderToString(
    React.createElement(IconComponent, {
      width: 16,
      height: 16,
      color: businessObject.color,
      strokeWidth: 2,
    })
  );

  const iconImg = new Image();
  iconImg.src = 'data:image/svg+xml;base64,' + btoa(iconSvg);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  // We'll draw text+icon onto the canvas once the SVG icon is loaded
  iconImg.onload = () => {
    context.drawImage(iconImg, 8, 8, 16, 16);
    context.fillStyle = businessObject.color;
    context.font = '600 14px system-ui, -apple-system, sans-serif';
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(businessObject.name, 32, height / 2);

    texture.needsUpdate = true;
  };

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.3, 0.075, 1);

  return sprite;
}