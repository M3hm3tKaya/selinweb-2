const Z_START = 4
const Z_END = 4000
const Z_RANGE = Z_END - Z_START

export function wrapZ(z) {
  while (z >= Z_END) z -= Z_RANGE
  while (z < Z_START) z += Z_RANGE
  return z
}

export function getZSpacing(numCards) {
  return Z_RANGE / numCards
}

export function calcOpacity(z) {
  if (z < 25) {
    const t = (z - Z_START) / (25 - Z_START)
    return t * t
  }
  if (z > 3600) {
    return 1 - ((z - 3600) / (Z_END - 3600))
  }
  return 1
}

export { Z_START, Z_END, Z_RANGE }
