const FOV = 400
const FOV_SPREAD = 1040 // 2.6x FOV for position — wider vanishing area
const CARD_WORLD_SIZE = 260

export function project(x, y, z, cx, cy) {
  const sizeScale = FOV / z
  const posScale = FOV_SPREAD / z
  return {
    sx: cx + x * posScale,
    sy: cy + y * posScale,
    size: CARD_WORLD_SIZE * sizeScale,
  }
}

export { FOV, CARD_WORLD_SIZE }
