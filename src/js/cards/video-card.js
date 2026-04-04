const MAX_ACTIVE_VIDEOS = 5
const isMobile = () => window.innerWidth < 768

let clipSources = []
let videoElements = [] // { card, videoEl }

export function setClipSources(sources) {
  clipSources = sources
}

function getRandomClipSrc() {
  if (clipSources.length === 0) return null
  return clipSources[Math.floor(Math.random() * clipSources.length)]
}

function createHiddenVideo(src) {
  const video = document.createElement('video')
  video.src = src
  video.muted = true
  video.autoplay = true
  video.loop = true
  video.playsInline = true
  video.preload = 'auto'
  // Hidden — not in DOM flow, but still decodes frames
  video.style.position = 'fixed'
  video.style.top = '-9999px'
  video.style.left = '-9999px'
  video.style.width = '1px'
  video.style.height = '1px'
  video.style.opacity = '0'
  video.style.pointerEvents = 'none'
  document.body.appendChild(video)
  video.play().catch(() => {})
  return video
}

export function initVideoCards(cards, videoSlotIndices) {
  if (isMobile() || clipSources.length === 0) return

  for (const idx of videoSlotIndices) {
    const card = cards[idx]
    if (!card) continue

    const src = getRandomClipSrc()
    if (!src) continue

    const videoEl = createHiddenVideo(src)
    card.type = 'video'
    card.videoEl = videoEl
    card.media = null
    videoElements.push({ card, videoEl })
  }
}

export function reassignVideo(card) {
  if (isMobile() || clipSources.length === 0) return

  const entry = videoElements.find(v => v.card === card)
  if (!entry) return

  const src = getRandomClipSrc()
  if (src) {
    entry.videoEl.src = src
    entry.videoEl.load()
    entry.videoEl.play().catch(() => {})
  }
}

export function getVideoSlotIndices(totalSlots) {
  const outerStart = Math.max(10, totalSlots - 15)
  const candidates = []
  for (let i = outerStart; i < totalSlots; i++) {
    candidates.push(i)
  }

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[candidates[i], candidates[j]] = [candidates[j], candidates[i]]
  }

  return candidates.slice(0, MAX_ACTIVE_VIDEOS)
}
