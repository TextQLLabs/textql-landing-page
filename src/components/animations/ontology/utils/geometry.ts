import * as THREE from 'three';

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