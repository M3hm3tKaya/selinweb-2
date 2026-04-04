import gsap from 'gsap'

let overlay, title, tagline
let isVisible = true
let hideTimer = null
let panelIsOpen = false

export function initOverlay() {
  overlay = document.getElementById('overlay')
  title = overlay.querySelector('.overlay__title')
  tagline = overlay.querySelector('.overlay__tagline')

  gsap.set([title, tagline], { opacity: 0, y: 20 })
  gsap.to(title, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    ease: 'power2.out',
    delay: 0.3,
  })
  gsap.to(tagline, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
    delay: 0.7,
  })

  window.addEventListener('wheel', onScrollActivity, { passive: true })
  window.addEventListener('touchmove', onScrollActivity, { passive: true })

  window.addEventListener('panel:open', () => {
    panelIsOpen = true
    clearTimeout(hideTimer)
    gsap.to(overlay, { opacity: 0, duration: 0.4, ease: 'power2.out' })
    isVisible = false
  })

  window.addEventListener('panel:close', () => {
    panelIsOpen = false
  })
}

function onScrollActivity() {
  if (panelIsOpen) return

  if (isVisible) {
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    })
    isVisible = false
  }

  clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    if (panelIsOpen) return
    gsap.to(overlay, {
      opacity: 1,
      duration: 1.2,
      ease: 'power2.out',
    })
    isVisible = true
  }, 2000)
}
