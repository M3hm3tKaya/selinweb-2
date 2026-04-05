const DEFAULT_SPEED = 1.2
const MOBILE_BOOST = window.innerWidth < 768 ? 1.68 : 1.0
let scrollVelocity = 0
let speedMultiplier = 1.0

export function getSpeed() {
  scrollVelocity *= 0.90
  if (Math.abs(scrollVelocity) < 0.05) scrollVelocity = 0
  return (DEFAULT_SPEED + scrollVelocity) * speedMultiplier * MOBILE_BOOST
}

export function addScrollDelta(delta) {
  scrollVelocity = Math.max(-15, Math.min(20, scrollVelocity + delta * MOBILE_BOOST))
}

export function setSpeedMultiplier(m) {
  speedMultiplier = m
}
