import { setClipSources, initVideoCards, getVideoSlotIndices } from './video-card.js'

// Static clip list — no HEAD requests needed
const CLIP_PATHS = []
for (let i = 1; i <= 50; i++) {
  CLIP_PATHS.push(`/clips/clip-${String(i).padStart(2, '0')}.mp4`)
}
for (let i = 51; i <= 119; i++) {
  CLIP_PATHS.push(`/clips/clip-${String(i).padStart(3, '0')}.mp4`)
}

export async function loadClips() {
  setClipSources(CLIP_PATHS)
  return CLIP_PATHS
}

export function setupVideoCards(cards) {
  const indices = getVideoSlotIndices(cards.length)
  initVideoCards(cards, indices)
}
