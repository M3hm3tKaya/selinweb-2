import { Z_START, Z_RANGE } from '../engine/z-manager.js'
import { getZSpacing } from '../engine/z-manager.js'
import { CARD_WORLD_SIZE } from '../engine/projection.js'

// Desktop: 50, Tablet(5): 38, Mobile(4): 26
const RING_COUNTS = [2, 6, 8, 10, 12, 12]
const MAX_RADIUS = window.innerWidth < 768 ? 434 : 650
const MIN_DIST = CARD_WORLD_SIZE * 2.2

export function getSlotCount(maxRings) {
  const n = maxRings || RING_COUNTS.length
  let total = 0
  for (let i = 0; i < n; i++) total += RING_COUNTS[i]
  return total
}

// Reusable position object — no GC pressure
const _pos = { x: 0, y: 0 }

function randomDiskPosition() {
  const angle = Math.random() * Math.PI * 2
  const radius = Math.sqrt(Math.random()) * MAX_RADIUS
  _pos.x = Math.cos(angle) * radius
  _pos.y = Math.sin(angle) * radius
  return _pos
}

// Pre-compute a pool of valid positions at init
const POOL_SIZE = 200
const positionPool = []

function buildPositionPool() {
  for (let i = 0; i < POOL_SIZE; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = Math.sqrt(Math.random()) * MAX_RADIUS
    positionPool.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    })
  }
}
buildPositionPool()

// Fast wrap position — just pick from pool, no collision check
let poolIndex = 0
export function getSpacedPosition() {
  poolIndex = (poolIndex + 1) % POOL_SIZE
  return positionPool[poolIndex]
}

export function getRandomPosition() {
  return randomDiskPosition()
}

export function createCards(slotCount) {
  const zSpacing = getZSpacing(slotCount)
  const cards = []
  const minDistSq = MIN_DIST * MIN_DIST

  for (let i = 0; i < slotCount; i++) {
    const jitter = (Math.random() - 0.5) * zSpacing * 0.4
    const clampedZ = Math.max(Z_START, Math.min(Z_START + Z_RANGE - 1, Z_START + i * zSpacing + jitter))

    // Initial placement uses collision check (only at init, not per-frame)
    let pos
    const zThreshold = zSpacing * 3
    for (let attempt = 0; attempt < 20; attempt++) {
      randomDiskPosition()
      let valid = true
      for (let j = 0; j < cards.length; j++) {
        if (Math.abs(cards[j].z - clampedZ) > zThreshold) continue
        const dx = _pos.x - cards[j].x
        const dy = _pos.y - cards[j].y
        if (dx * dx + dy * dy < minDistSq) {
          valid = false
          break
        }
      }
      if (valid) {
        pos = { x: _pos.x, y: _pos.y }
        break
      }
    }
    if (!pos) pos = { x: _pos.x, y: _pos.y }

    cards.push({
      x: pos.x,
      y: pos.y,
      z: clampedZ,
      slotIdx: i,
      type: 'empty',
      media: null,
    })
  }

  return cards
}
