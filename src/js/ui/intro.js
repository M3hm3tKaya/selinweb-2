import gsap from 'gsap'

let introEl = null
let hasTriggered = false

export function initIntro(onComplete) {
  introEl = document.getElementById('intro')
  if (!introEl) return

  const onFirstInteraction = () => {
    if (hasTriggered) return
    hasTriggered = true

    window.removeEventListener('wheel', onFirstInteraction)
    window.removeEventListener('touchstart', onFirstInteraction)
    window.removeEventListener('click', onFirstInteraction)

    animateOut(onComplete)
  }

  // Trigger on first scroll, touch, or click
  window.addEventListener('wheel', onFirstInteraction, { passive: true })
  window.addEventListener('touchstart', onFirstInteraction, { passive: true })
  window.addEventListener('click', onFirstInteraction)

  // Auto-trigger after 6 seconds if no interaction
  setTimeout(() => onFirstInteraction(), 6000)
}

function animateOut(onComplete) {
  const tl = gsap.timeline({
    onComplete: () => {
      introEl.remove()
      if (onComplete) onComplete()
    },
  })

  // Card flies into the void: shrinks toward center + fades
  tl.to(introEl, {
    scale: 0.03,
    opacity: 0,
    duration: 2,
    ease: 'power2.in',
  })
}
