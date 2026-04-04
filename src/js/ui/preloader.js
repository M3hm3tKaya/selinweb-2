export function hidePreloader() {
  const preloader = document.getElementById('preloader')
  preloader.classList.add('is-hidden')

  // Remove from DOM after transition
  preloader.addEventListener('transitionend', () => {
    preloader.remove()
  }, { once: true })
}

export function updateProgress(progress) {
  const fill = document.getElementById('preloaderFill')
  if (fill) {
    fill.style.width = (progress * 100) + '%'
  }
}
