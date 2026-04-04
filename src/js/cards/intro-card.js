import { Z_START } from '../engine/z-manager.js'

export async function addIntroCard(cards) {
  const img = new Image()

  await new Promise((resolve) => {
    img.onload = resolve
    img.onerror = resolve
    img.src = '/src/assets/covers/cover-25.jpg'
  })

  // Insert at front of array with lowest Z — fills the screen
  const introCard = {
    x: 0,
    y: 0,
    z: 25,
    slotIdx: -1,
    type: 'image',
    media: img,
    mediaKey: 'cover-25',
    isIntro: true,
  }

  cards.unshift(introCard)
}
