import { Z_START, Z_RANGE } from '../engine/z-manager.js'
import { getZSpacing } from '../engine/z-manager.js'
import { CARD_WORLD_SIZE } from '../engine/projection.js'

// Desktop: 50, Tablet(5): 38, Mobile(4): 26
const RING_COUNTS = [2, 6, 8, 10, 12, 12]
const MAX_RADIUS = 650
const MIN_DIST = CARD_WORLD_SIZE * 2.2 // ~440 world units = 1 card gap

export function getSlotCount(maxRings) {
  const n = maxRings || RING_COUNTS.length
  let total = 0
  for (let i = 0; i < n; i++) total += RING_COUNTS[i]
  return total
}

function randomDiskPosition() {
  const angle = Math.random() * Math.PI * 2
  const radius = Math.sqrt(Math.random()) * MAX_RADIUS
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  }
}

// Find a position that doesn't overlap with Z-neighbors
export function getSpacedPosition(cards, targetZ) {
  const zThreshold = getZSpacing(cards.length) * 3
  const neighbors = []

  for (let i = 0; i < cards.length; i++) {
    if (Math.abs(cards[i].z - targetZ) < zThreshold) {
      neighbors.push(cards[i])
    }
  }

  for (let attempt = 0; attempt < 30; attempt++) {
    const pos = randomDiskPosition()
    let valid = true

    for (let i = 0; i < neighbors.length; i++) {
      const dx = pos.x - neighbors[i].x
      const dy = pos.y - neighbors[i].y
      if (dx * dx + dy * dy < MIN_DIST * MIN_DIST) {
        valid = false
        break
      }
    }

    if (valid) return pos
  }

  return randomDiskPosition()
}

// Simple random position (no collision check) — used as fallback
export function getRandomPosition() {
  return randomDiskPosition()
}

export function createCards(slotCount) {
  const zSpacing = getZSpacing(slotCount)
  const cards = []

  for (let i = 0; i < slotCount; i++) {
    const jitter = (Math.random() - 0.5) * zSpacing * 0.4
    const z = Z_START + i * zSpacing + jitter
    const clampedZ = Math.max(Z_START, Math.min(Z_START + Z_RANGE - 1, z))

    // Place with spacing check against already-placed cards
    const pos = getSpacedPosition(cards, clampedZ)

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
