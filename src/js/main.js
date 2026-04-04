import '../css/main.css'
import { setup, start, getCards, setCanvasClickHandler } from './engine/card-engine.js'
import { preloadImages } from './utils/media-loader.js'
import { assignImages } from './cards/image-card.js'
import { loadClips, setupVideoCards } from './cards/card-loader.js'
import { initOverlay } from './ui/overlay-ui.js'
import { initPaletteSwitcher } from './ui/palette-switcher.js'
import { hidePreloader, updateProgress } from './ui/preloader.js'
import { initPanels } from './ui/panels.js'
import { initNavigation } from './ui/navigation.js'
import { initCardDetail, hitTestCards, openDetail, isDetailOpen } from './ui/card-detail.js'
import { addIntroCard } from './cards/intro-card.js'

async function init() {
  setup()
  initPaletteSwitcher()

  const [, clips] = await Promise.all([
    preloadImages(updateProgress),
    loadClips(),
  ])

  const cards = getCards()
  assignImages(cards)

  if (clips.length > 0) {
    setupVideoCards(cards)
  }

  // Add intro card — starts at camera, covers screen
  await addIntroCard(cards)

  hidePreloader()
  setTimeout(() => {
    start()
    initOverlay()
    initPanels()
    initNavigation()
    initCardDetail()

    setCanvasClickHandler((clientX, clientY) => {
      if (isDetailOpen()) return
      const hit = hitTestCards(clientX, clientY, cards)
      if (hit) {
        openDetail(hit.card, hit.left, hit.top, hit.size)
      }
    })
  }, 400)
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init)
} else {
  init()
}
