import { project, _result as _projResult } from './projection.js'
import { wrapZ, calcOpacity, Z_START, Z_END, Z_RANGE } from './z-manager.js'
import { getSpeed, addScrollDelta } from './speed-controller.js'
import { getSlotCount, createCards, getSpacedPosition } from '../cards/card-pool.js'
import { reassignImage } from '../cards/image-card.js'
import { reassignVideo } from '../cards/video-card.js'

let canvas, ctx
let W, H, CX, CY
let dpr
let cards = []
let running = false
let cardFill = '#161616'
let cardBorder = 'rgba(255, 255, 255, 0.07)'
let reducedMotion = false
let currentRingCount = 6
let panelOpen = false
let lastFrameTime = 0
let frameCount = 0
function zSortDesc(a, b) { return b.z - a.z }
let onCanvasClick = null
let mouseOffsetX = 0
let mouseOffsetY = 0
let mouseTargetX = 0
let mouseTargetY = 0
const PARALLAX_STRENGTH = 35
const PARALLAX_LERP = 0.04 // smooth follow speed

function getRingCount() {
  const w = window.innerWidth
  if (w < 768) return 4
  if (w < 1200) return 5
  return 6
}

function setup() {
  canvas = document.getElementById('c')
  ctx = canvas.getContext('2d')
  // Cap DPR on Safari to reduce paint work (Retina = 4x pixels)
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  dpr = isSafari ? Math.min(window.devicePixelRatio || 1, 1.5) : (window.devicePixelRatio || 1)

  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  resize()
  window.addEventListener('resize', resize)

  readPaletteColors()

  currentRingCount = getRingCount()
  const slotCount = getSlotCount(currentRingCount)
  cards = createCards(slotCount)

  if (!reducedMotion) {
    bindInput()
  }
}

function resize() {
  W = window.innerWidth
  H = window.innerHeight
  CX = W / 2
  CY = H / 2

  canvas.width = W * dpr
  canvas.height = H * dpr
  canvas.style.width = W + 'px'
  canvas.style.height = H + 'px'
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.zIndex = '1'

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function readPaletteColors() {
  const style = getComputedStyle(document.documentElement)
  cardFill = style.getPropertyValue('--card-fill').trim() || '#161616'
  cardBorder = style.getPropertyValue('--card-border').trim() || 'rgba(255, 255, 255, 0.07)'
}

function bindInput() {
  window.addEventListener('wheel', (e) => {
    if (panelOpen) return
    e.preventDefault()
    addScrollDelta(e.deltaY * 0.03)
  }, { passive: false })

  let touchY = 0
  window.addEventListener('touchstart', (e) => {
    touchY = e.touches[0].clientY
  }, { passive: true })

  window.addEventListener('touchmove', (e) => {
    if (panelOpen) return
    const delta = touchY - e.touches[0].clientY
    touchY = e.touches[0].clientY
    addScrollDelta(delta * 0.06)
  }, { passive: true })

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault()
      if (running) {
        stop()
      } else {
        start()
      }
    }
  })

  canvas.addEventListener('click', (e) => {
    if (panelOpen || !onCanvasClick) return
    onCanvasClick(e.clientX, e.clientY)
  })

  window.addEventListener('mousemove', (e) => {
    const nx = (e.clientX / W - 0.5) * 2
    const ny = (e.clientY / H - 0.5) * 2
    mouseTargetX = nx * PARALLAX_STRENGTH
    mouseTargetY = ny * PARALLAX_STRENGTH
  })
}

function onCardWrap(card) {
  // Intro card becomes a normal card after first pass
  if (card.isIntro) {
    card.isIntro = false
  }

  if (card.type === 'image') {
    reassignImage(card)
  } else if (card.type === 'video') {
    reassignVideo(card)
  }

  const pos = getSpacedPosition(cards, card.z)
  card.x = pos.x
  card.y = pos.y
}

function drawCard(card, left, top, size, opacity) {
  const tooSmall = size < 8
  const tooClose = card.z < 20

  if (tooSmall || tooClose) {
    ctx.globalAlpha = opacity
    ctx.fillStyle = cardFill
    ctx.fillRect(left, top, size, size)
    return
  }

  // Draw image or video frame onto Canvas
  if (card.type === 'video' && card.videoEl) {
    ctx.globalAlpha = opacity
    try {
      const vw = card.videoEl.videoWidth
      const vh = card.videoEl.videoHeight
      if (vw && vh) {
        const cropSize = Math.min(vw, vh)
        const sx = (vw - cropSize) / 2
        const sy = (vh - cropSize) / 2
        ctx.drawImage(card.videoEl, sx, sy, cropSize, cropSize, left, top, size, size)
      } else {
        ctx.fillStyle = cardFill
        ctx.fillRect(left, top, size, size)
      }
    } catch {
      ctx.fillStyle = cardFill
      ctx.fillRect(left, top, size, size)
    }
  } else if (card.type === 'image' && card.media) {
    ctx.globalAlpha = opacity
    ctx.drawImage(card.media, left, top, size, size)
  } else {
    ctx.globalAlpha = opacity
    ctx.fillStyle = cardFill
    ctx.fillRect(left, top, size, size)
  }

  // Border
  ctx.globalAlpha = opacity * 0.15
  ctx.strokeStyle = cardBorder
  ctx.lineWidth = 0.7
  ctx.strokeRect(left + 0.5, top + 0.5, size - 1, size - 1)
}

function drawStatic() {
  ctx.clearRect(0, 0, W, H)
  cards.sort(zSortDesc)

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const opacity = calcOpacity(card.z)
    if (opacity <= 0) continue

    project(card.x, card.y, card.z, CX + mouseOffsetX, CY + mouseOffsetY)
    const half = _projResult.size / 2
    const left = _projResult.sx - half
    const top = _projResult.sy - half

    if (left + _projResult.size < 0 || left > W || top + _projResult.size < 0 || top > H) continue
    if (_projResult.size < 3) continue

    drawCard(card, left, top, _projResult.size, opacity)
  }

  ctx.globalAlpha = 1
}

function draw(timestamp) {
  if (!running) return

  // Delta-time: normalize to 60fps so speed is consistent across all refresh rates
  if (!lastFrameTime) lastFrameTime = timestamp
  const dt = Math.min((timestamp - lastFrameTime) / 16.667, 3) // cap at 3x to avoid jumps
  lastFrameTime = timestamp

  ctx.clearRect(0, 0, W, H)

  // Smooth lerp toward mouse target
  mouseOffsetX += (mouseTargetX - mouseOffsetX) * PARALLAX_LERP
  mouseOffsetY += (mouseTargetY - mouseOffsetY) * PARALLAX_LERP

  const speed = getSpeed() * dt

  for (let i = 0; i < cards.length; i++) {
    const prevZ = cards[i].z
    cards[i].z += speed
    const newZ = wrapZ(cards[i].z)

    const wrapped = (speed > 0 && newZ < prevZ) || (speed < 0 && newZ > prevZ)
    if (wrapped) {
      onCardWrap(cards[i])
    }

    cards[i].z = newZ
  }

  cards.sort(zSortDesc)

  let psx, psy, psize, renderSize, half, left, top, opacity, depthFactor, shiftX, shiftY

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    opacity = calcOpacity(card.z)

    if (opacity <= 0) continue

    depthFactor = 1.0 - (card.z / Z_END) * 0.7
    shiftX = mouseOffsetX * depthFactor
    shiftY = mouseOffsetY * depthFactor

    project(card.x, card.y, card.z, CX + shiftX, CY + shiftY)
    psx = _projResult.sx
    psy = _projResult.sy
    psize = _projResult.size

    renderSize = card.isIntro ? psize * 1.4 : psize
    half = renderSize * 0.5
    left = psx - half
    top = psy - half

    if (left + renderSize < 0 || left > W || top + renderSize < 0 || top > H) continue
    if (renderSize < 2) continue

    drawCard(card, left, top, renderSize, opacity)
  }

  ctx.globalAlpha = 1
  frameCount++

  requestAnimationFrame(draw)
}

export function start() {
  if (reducedMotion) {
    drawStatic()
    return
  }
  running = true
  lastFrameTime = 0
  requestAnimationFrame(draw)
}

export function stop() {
  running = false
}

export function updatePalette() {
  readPaletteColors()
  if (reducedMotion) drawStatic()
}

export function getCards() {
  return cards
}

export function setPanelOpen(open) {
  panelOpen = open
}

export function setCanvasClickHandler(fn) {
  onCanvasClick = fn
}

export function isReducedMotion() {
  return reducedMotion
}

export { setup }
