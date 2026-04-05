// Single global audio manager — ensures only one audio plays at a time
let audio = null
let currentSource = null // 'card-detail' | 'music-featured' | 'music-list' | null
let onStopCallback = null

function getAudio() {
  if (!audio) {
    audio = new Audio()
    audio.volume = 0.7
  }
  return audio
}

export function play(src, source) {
  const a = getAudio()

  // Stop current if different source
  if (a.src && !a.paused) {
    a.pause()
  }

  a.src = src
  a.volume = 0.7
  a.loop = (source === 'music-featured')
  currentSource = source

  const playPromise = a.play()
  if (playPromise) {
    playPromise.catch(() => {})
  }
}

export function pause() {
  const a = getAudio()
  a.pause()
}

export function stop() {
  const a = getAudio()
  a.pause()
  a.src = ''
  currentSource = null
}

export function fadeOutAndStop(callback) {
  const a = getAudio()
  if (a.paused || !a.src) {
    a.src = ''
    currentSource = null
    if (callback) callback()
    return
  }

  const fade = () => {
    if (a.volume > 0.05) {
      a.volume -= 0.05
      requestAnimationFrame(fade)
    } else {
      a.pause()
      a.volume = 0.7
      a.src = ''
      currentSource = null
      if (callback) callback()
    }
  }
  fade()
}

export function isPlaying() {
  const a = getAudio()
  return !a.paused && !!a.src
}

export function getCurrentSource() {
  return currentSource
}
