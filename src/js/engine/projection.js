const FOV = 400
const IS_MOBILE = window.innerWidth < 768
const FOV_SPREAD = IS_MOBILE ? 681 : 1040
const CARD_WORLD_SIZE = IS_MOBILE ? 300 : 260

// Reusable result object — avoids GC pressure from creating objects every frame
const _result = { sx: 0, sy: 0, size: 0 }

export function project(x, y, z, cx, cy) {
  const sizeScale = FOV / z
  const posScale = FOV_SPREAD / z
  _result.sx = cx + x * posScale
  _result.sy = cy + y * posScale
  _result.size = CARD_WORLD_SIZE * sizeScale
  return _result
}

export { FOV, CARD_WORLD_SIZE, _result }
