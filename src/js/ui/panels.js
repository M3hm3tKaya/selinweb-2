import gsap from 'gsap'
import { setPanelOpen } from '../engine/card-engine.js'
import { setSpeedMultiplier } from '../engine/speed-controller.js'
import { getBioContent, getBioGalleryHTML, getMusicContent, getLiveContent, getContactContent, getMusicFeaturedHTML, MUSIC_DATA } from './panel-content.js'
import { play as audioPlay, stop as audioStop, fadeOutAndStop, getCurrentSource } from './audio-manager.js'

let backdrop, panel, panelContent
let currentPanel = null
let isAnimating = false
let musicFeaturedEl = null
let bioGalleryEl = null
let currentTrackIndex = -1
let isFeaturedPlaying = false

const BASKA_BIRI_PREVIEW = 'https://p.scdn.co/mp3-preview/c2c9e0678ffbbd3b015b90d00f1301e035202503'

const CONTENT_MAP = {
  bio: getBioContent,
  music: getMusicContent,
  live: getLiveContent,
  contact: getContactContent,
}

export function initPanels() {
  backdrop = document.createElement('div')
  backdrop.className = 'panel-backdrop'
  document.body.appendChild(backdrop)

  panel = document.createElement('div')
  panel.className = 'panel'
  panel.innerHTML = `
    <div class="panel__header">
      <button class="panel__close" aria-label="Close panel">close</button>
    </div>
    <div class="panel__content"></div>
  `
  document.body.appendChild(panel)

  panelContent = panel.querySelector('.panel__content')

  backdrop.addEventListener('click', closePanel)
  panel.querySelector('.panel__close').addEventListener('click', closePanel)

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && currentPanel) {
      closePanel()
    }
  })
}

// --- Music Player Logic ---

function playFeatured() {
  audioPlay(BASKA_BIRI_PREVIEW, 'music-featured')
  currentTrackIndex = -1
  isFeaturedPlaying = true
  updateFeaturedBtn(true)
  clearListActive()
}

function pauseFeatured() {
  audioStop()
  isFeaturedPlaying = false
  updateFeaturedBtn(false)
}

function playTrack(index) {
  const track = MUSIC_DATA[index]
  if (!track || !track.preview) return

  audioPlay(track.preview, 'music-list')
  currentTrackIndex = index
  isFeaturedPlaying = false
  updateFeaturedBtn(false)
  updateListActive(index)
}

function stopTrack() {
  currentTrackIndex = -1
  clearListActive()
  playFeatured()
}

function updateFeaturedBtn(playing) {
  const btn = document.getElementById('featuredPlayPause')
  if (!btn) return
  btn.classList.toggle('is-playing', playing)
}

function updateListActive(index) {
  const items = panelContent.querySelectorAll('.panel-music__item')
  items.forEach((item, i) => {
    const btn = item.querySelector('.panel-music__play-btn')
    if (i === index) {
      item.classList.add('is-playing')
      if (btn) btn.classList.add('is-playing')
    } else {
      item.classList.remove('is-playing')
      if (btn) btn.classList.remove('is-playing')
    }
  })
}

function clearListActive() {
  const items = panelContent.querySelectorAll('.panel-music__item')
  items.forEach(item => {
    item.classList.remove('is-playing')
    const btn = item.querySelector('.panel-music__play-btn')
    if (btn) btn.classList.remove('is-playing')
  })
}

// --- Bio Gallery ---

function showBioGallery() {
  if (bioGalleryEl) return

  bioGalleryEl = document.createElement('div')
  bioGalleryEl.innerHTML = getBioGalleryHTML()
  bioGalleryEl = bioGalleryEl.firstElementChild
  document.body.appendChild(bioGalleryEl)

  gsap.fromTo(bioGalleryEl, { opacity: 0 }, {
    opacity: 1,
    duration: 0.6,
    delay: 0.2,
    ease: 'power2.out',
  })
}

function hideBioGallery() {
  if (!bioGalleryEl) return

  gsap.to(bioGalleryEl, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      if (bioGalleryEl) {
        bioGalleryEl.remove()
        bioGalleryEl = null
      }
    },
  })
}

// --- Music Events ---

function bindMusicEvents() {
  const coverImg = document.getElementById('featuredCoverImg')
  if (coverImg) {
    coverImg.addEventListener('click', () => playFeatured())
    coverImg.style.cursor = 'pointer'
  }

  const featuredBtn = document.getElementById('featuredPlayPause')
  if (featuredBtn) {
    featuredBtn.addEventListener('click', () => {
      if (isFeaturedPlaying) {
        pauseFeatured()
      } else {
        playFeatured()
      }
    })
  }

  // Use event delegation on panel content for list items
  const listEl = panelContent.querySelector('.panel-music__list')
  if (listEl) {
    listEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.panel-music__play-btn')
      if (!btn) return
      e.preventDefault()
      e.stopPropagation()

      const index = parseInt(btn.dataset.index, 10)
      if (isNaN(index)) return

      if (currentTrackIndex === index) {
        stopTrack()
      } else {
        playTrack(index)
      }
    })
  }
}

// --- Panel Show/Hide ---

function showMusicFeatured() {
  if (musicFeaturedEl) return

  // Stop any existing audio (e.g. from card detail)
  audioStop()

  musicFeaturedEl = document.createElement('div')
  musicFeaturedEl.innerHTML = getMusicFeaturedHTML()
  musicFeaturedEl = musicFeaturedEl.firstElementChild
  document.body.appendChild(musicFeaturedEl)

  gsap.fromTo(musicFeaturedEl, { opacity: 0, y: 30 }, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: 0.2,
    ease: 'power2.out',
  })

  // Autoplay featured
  setTimeout(() => {
    playFeatured()
    bindMusicEvents()
  }, 150)
}

function hideMusicFeatured() {
  if (!musicFeaturedEl) return

  isFeaturedPlaying = false
  currentTrackIndex = -1

  // Always stop audio when leaving music panel
  audioStop()

  gsap.to(musicFeaturedEl, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      if (musicFeaturedEl) {
        musicFeaturedEl.remove()
        musicFeaturedEl = null
      }
    },
  })
}

export function openPanel(name) {
  if (isAnimating) return

  const contentFn = CONTENT_MAP[name]
  if (!contentFn) return

  if (currentPanel === name) {
    closePanel()
    return
  }

  // Stop any playing audio from card detail when opening any panel
  if (getCurrentSource() === 'card-detail') {
    audioStop()
  }

  if (currentPanel === 'music' && name !== 'music') {
    hideMusicFeatured()
  }
  if (currentPanel === 'bio' && name !== 'bio') {
    hideBioGallery()
  }

  if (currentPanel) {
    isAnimating = true
    gsap.to(panelContent, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        panelContent.innerHTML = contentFn()
        gsap.to(panelContent, { opacity: 1, duration: 0.3 })
        currentPanel = name
        if (name === 'music') showMusicFeatured()
        if (name === 'bio') showBioGallery()
        window.dispatchEvent(new CustomEvent('panel:open', { detail: { name } }))
        isAnimating = false
      },
    })
    return
  }

  isAnimating = true
  panelContent.innerHTML = contentFn()
  panelContent.style.opacity = '1'
  currentPanel = name

  setPanelOpen(true)
  setSpeedMultiplier(0.3)

  document.getElementById('c').classList.add('is-blurred')

  backdrop.classList.add('is-visible')
  panel.classList.add('is-open')

  gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power2.out' })
  gsap.fromTo(panel, { x: '100%' }, {
    x: '0%',
    duration: 0.5,
    ease: 'power3.out',
    onComplete: () => {
      isAnimating = false
    },
  })

  if (name === 'music') showMusicFeatured()
  if (name === 'bio') showBioGallery()

  window.dispatchEvent(new CustomEvent('panel:open', { detail: { name } }))
}

export function closePanel() {
  if (!currentPanel || isAnimating) return

  isAnimating = true

  hideMusicFeatured()
  hideBioGallery()

  gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.in' })
  gsap.to(backdrop, {
    opacity: 0,
    duration: 0.3,
    delay: 0.1,
    onComplete: () => {
      backdrop.classList.remove('is-visible')
      panel.classList.remove('is-open')
      panelContent.innerHTML = ''

      setPanelOpen(false)
      setSpeedMultiplier(1.0)
      document.getElementById('c').classList.remove('is-blurred')

      currentPanel = null
      isAnimating = false

      window.dispatchEvent(new CustomEvent('panel:close'))
    },
  })
}

export function getCurrentPanel() {
  return currentPanel
}
