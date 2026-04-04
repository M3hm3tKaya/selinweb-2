import gsap from 'gsap'
import { openPanel } from './panels.js'

export function initNavigation() {
  const nav = document.getElementById('nav')
  if (!nav) return

  const items = nav.querySelectorAll('.nav__item')

  items.forEach(item => {
    item.addEventListener('click', () => {
      const panelName = item.dataset.panel
      openPanel(panelName)
    })
  })

  // Active state management
  window.addEventListener('panel:open', (e) => {
    items.forEach(item => {
      item.classList.toggle('is-active', item.dataset.panel === e.detail.name)
    })
  })

  window.addEventListener('panel:close', () => {
    items.forEach(item => item.classList.remove('is-active'))
  })

  // Entrance animation
  gsap.set(items, { opacity: 0, x: -10 })
  gsap.to(items, {
    opacity: 1,
    x: 0,
    duration: 0.6,
    ease: 'power2.out',
    stagger: 0.1,
    delay: 1.5,
  })
}
