export function lerp(a, b, t) {
  return a + (b - a) * t
}

export function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}
