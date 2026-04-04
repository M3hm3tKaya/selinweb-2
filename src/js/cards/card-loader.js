import { setClipSources, initVideoCards, getVideoSlotIndices } from './video-card.js'

export async function loadClips() {
  const sources = []

  // clip-01 to clip-50 (2-digit) + clip-051 to clip-125 (3-digit)
  const names = []
  for (let i = 1; i <= 50; i++) {
    names.push(`clip-${String(i).padStart(2, '0')}`)
  }
  for (let i = 51; i <= 119; i++) {
    names.push(`clip-${String(i).padStart(3, '0')}`)
  }

  // Check all in parallel
  const checks = names.map(name => {
    const path = `/src/assets/clips/${name}.mp4`
    return fetch(path, { method: 'HEAD' })
      .then(res => res.ok ? path : null)
      .catch(() => null)
  })

  const results = await Promise.all(checks)
  for (const path of results) {
    if (path) sources.push(path)
  }

  setClipSources(sources)
  return sources
}

export function setupVideoCards(cards) {
  const indices = getVideoSlotIndices(cards.length)
  initVideoCards(cards, indices)
}
