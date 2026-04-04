import { getImage, getLoadedKeys } from '../utils/media-loader.js'

let shuffled = []
let shuffleIndex = 0
let lastAssignedKey = null

function buildShuffledKeys() {
  const keys = getLoadedKeys()
  shuffled = [...keys]

  // Fisher-Yates shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }

  // If the first key of new shuffle matches the last assigned, swap it further in
  if (shuffled.length > 1 && shuffled[0] === lastAssignedKey) {
    const swapIdx = 1 + Math.floor(Math.random() * (shuffled.length - 1))
    ;[shuffled[0], shuffled[swapIdx]] = [shuffled[swapIdx], shuffled[0]]
  }

  shuffleIndex = 0
}

function getNextCoverKey() {
  if (shuffled.length === 0 || shuffleIndex >= shuffled.length) {
    buildShuffledKeys()
  }
  const key = shuffled[shuffleIndex]
  shuffleIndex++
  lastAssignedKey = key
  return key
}

export function assignImages(cards) {
  buildShuffledKeys()
  for (const card of cards) {
    const key = getNextCoverKey()
    card.type = 'image'
    card.mediaKey = key
    card.media = getImage(key)
  }
}

export function reassignImage(card) {
  let key = getNextCoverKey()

  // Prevent same cover appearing consecutively on this card
  if (key === card.mediaKey && shuffled.length > 1) {
    key = getNextCoverKey()
  }

  card.mediaKey = key
  card.media = getImage(key)
}
