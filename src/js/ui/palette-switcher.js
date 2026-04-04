import { updatePalette } from '../engine/card-engine.js'

const PALETTES = ['warm', 'cold', 'mono']
const STORAGE_KEY = 'selin-void-palette'

export function initPaletteSwitcher() {
  const container = document.getElementById('paletteSwitcher')

  // Restore saved palette
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved && PALETTES.includes(saved)) {
    document.documentElement.setAttribute('data-palette', saved)
  }

  const current = document.documentElement.getAttribute('data-palette') || 'warm'

  // Create buttons
  for (const palette of PALETTES) {
    const btn = document.createElement('button')
    btn.className = `palette-switcher__btn palette-switcher__btn--${palette}`
    btn.setAttribute('aria-label', `Switch to ${palette} palette`)
    if (palette === current) btn.classList.add('is-active')

    btn.addEventListener('click', () => {
      document.documentElement.setAttribute('data-palette', palette)
      localStorage.setItem(STORAGE_KEY, palette)
      updatePalette()

      container.querySelectorAll('.palette-switcher__btn').forEach(b => {
        b.classList.toggle('is-active', b === btn)
      })
    })

    container.appendChild(btn)
  }
}
