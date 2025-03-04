import * as THREE from 'three';
import { businessObjects } from '../data';
import { createPillSprite } from '../utils/pill';

export function createSprites(geometry: THREE.BufferGeometry, group: THREE.Group): THREE.Sprite[] {
  const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
  const uniqueVertices = new Set<string>();
  const vertices: THREE.Vector3[] = [];

  // Collect unique vertices
  for (let i = 0; i < positionAttr.count; i++) {
    const x = positionAttr.getX(i);
    const y = positionAttr.getY(i);
    const z = positionAttr.getZ(i);
    const key = `${x.toFixed(6)},${y.toFixed(6)},${z.toFixed(6)}`;

    if (!uniqueVertices.has(key)) {
      uniqueVertices.add(key);
      vertices.push(new THREE.Vector3(x, y, z));
    }
  }

  const sprites: THREE.Sprite[] = [];
  for (let i = 0; i < vertices.length && i < businessObjects.length; i++) {
    const businessObject = businessObjects[i];
    const sprite = createPillSprite(businessObject);
    
    // Position sprite at vertex position with a small offset
    const normalizedPos = vertices[i].clone().normalize().multiplyScalar(1.1);
    sprite.position.copy(normalizedPos);
    
    // Center the sprite on its position point
    sprite.center.set(0.5, 0.5);
    
    // Scale reduced to 60% of previous size while maintaining aspect ratio
    sprite.scale.set(0.36, 0.09, 1);
    
    group.add(sprite);
    sprites.push(sprite);
  }

  return sprites;
}