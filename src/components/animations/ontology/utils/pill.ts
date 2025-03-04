import * as THREE from 'three';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type { BusinessObject } from '../types';

export function createPillSprite(businessObject: BusinessObject): THREE.Sprite {
  const canvas = document.createElement('canvas');
  // Canvas size reduced to 60% while maintaining resolution
  const width = 307;  // 512 * 0.6
  const height = 77;  // 128 * 0.6
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d')!;

  context.clearRect(0, 0, width, height);

  // Draw the pill shape as a rounded rectangle
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

  // Enhanced gradient fill with better opacity
  const gradient = context.createLinearGradient(0, 0, width, 0);
  gradient.addColorStop(0, `${businessObject.color}44`);
  gradient.addColorStop(1, `${businessObject.color}88`);
  context.fillStyle = gradient;
  context.fill();

  // Thicker border for better visibility
  context.strokeStyle = businessObject.color;
  context.lineWidth = 2.4; // 4 * 0.6
  context.stroke();

  // Render the icon using the provided React component
  const IconComponent = businessObject.icon;
  const iconSvg = ReactDOMServer.renderToString(
    React.createElement(IconComponent, {
      width: 29,  // 48 * 0.6
      height: 29, // 48 * 0.6
      color: businessObject.color,
      strokeWidth: 2,
    })
  );

  const iconImg = new Image();
  iconImg.src = 'data:image/svg+xml;base64,' + btoa(iconSvg);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  // Draw icon and text once loaded
  iconImg.onload = () => {
    context.drawImage(iconImg, 14, 24, 29, 29); // Scaled positions and sizes
    context.fillStyle = businessObject.color;
    context.font = 'bold 22px system-ui, -apple-system, sans-serif'; // 36 * 0.6
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(businessObject.name, 58, height / 2); // Scaled position

    texture.needsUpdate = true;
  };

  const sprite = new THREE.Sprite(material);
  return sprite;
}