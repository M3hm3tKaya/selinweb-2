const FOV = 400
const IS_MOBILE = window.innerWidth < 768
const FOV_SPREAD = IS_MOBILE ? 550 : 1040
const CARD_WORLD_SIZE = IS_MOBILE ? 300 : 260

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
