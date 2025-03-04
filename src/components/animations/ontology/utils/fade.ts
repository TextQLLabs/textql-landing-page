import * as THREE from 'three';

export interface FadeConfig {
  minOpacity?: number;
  maxOpacity?: number;
  fadeSpeed?: number;
  /**
   * The threshold defines the range over which the fade occurs.
   * It is measured in the same units as the dot product between
   * the sprite’s offset (from the polyhedron center) and the camera direction.
   */
  threshold?: number;
}

const DEFAULT_CONFIG: Required<FadeConfig> = {
  minOpacity: 0,
  maxOpacity: 1,
  fadeSpeed: 0.15,
  threshold: 0.5  // Adjust this to control the fade range.
};

export function calculateSpriteOpacity(
  sprite: THREE.Sprite,
  camera: THREE.PerspectiveCamera,
  group: THREE.Group,
  config: FadeConfig = {}
): number {
  const { minOpacity, maxOpacity, threshold } = { ...DEFAULT_CONFIG, ...config };

  // Get the camera's viewing direction (normalized)
  const cameraDirection = new THREE.Vector3();
  camera.getWorldDirection(cameraDirection);

  // Get the sprite's world position
  const spriteWorldPos = new THREE.Vector3();
  sprite.getWorldPosition(spriteWorldPos);

  // Get the polyhedron (group) center; assuming the polyhedron is centered on the group
  const groupCenter = new THREE.Vector3();
  group.getWorldPosition(groupCenter);

  // Compute the vector from the polyhedron center to the sprite
  const spriteOffset = spriteWorldPos.clone().sub(groupCenter);

  // Calculate the dot product between the sprite offset and the camera direction.
  // If this dot is negative, the sprite is in front of the polyhedron (i.e. visible).
  // If positive, the sprite is behind the polyhedron.
  const d = spriteOffset.dot(cameraDirection);

  // Apply a smooth transition:
  // - When d is very negative (sprite well in front), smoothstep returns 0,
  //   and our inversion makes t = 1 (full visibility).
  // - When d is very positive (sprite behind), smoothstep returns 1,
  //   and t = 0 (fully faded out).
  const t = 1 - THREE.MathUtils.smoothstep(d, -threshold, threshold);
  const tSmooth = Math.pow(t, 1.5);

  return THREE.MathUtils.lerp(minOpacity, maxOpacity, tSmooth);
}

export function updateSpritesOpacity(
  sprites: THREE.Sprite[],
  camera: THREE.PerspectiveCamera,
  group: THREE.Group,
  config?: FadeConfig
) {
  const { fadeSpeed } = { ...DEFAULT_CONFIG, ...config };

  sprites.forEach(sprite => {
    const targetOpacity = calculateSpriteOpacity(sprite, camera, group, config);
    const currentOpacity = (sprite.material as THREE.SpriteMaterial).opacity;
    
    // If the difference is small, snap to the target to avoid jitter.
    const delta = targetOpacity - currentOpacity;
    if (Math.abs(delta) < 0.01) {
      (sprite.material as THREE.SpriteMaterial).opacity = targetOpacity;
    } else {
      const newOpacity = THREE.MathUtils.lerp(currentOpacity, targetOpacity, fadeSpeed);
      (sprite.material as THREE.SpriteMaterial).opacity = newOpacity;
    }
  });
}
