import gsap from 'gsap'
import { setPanelOpen } from '../engine/card-engine.js'
import { setSpeedMultiplier } from '../engine/speed-controller.js'
import { project } from '../engine/projection.js'

const SPOTIFY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>'

const COVER_META = {
  'cover-01': { title: 'Moonlight (feat. Selin)', year: '2019', type: 'Single', spotifyId: '0XiVCH3MDWKTg4Ly4olVhz', preview: 'https://p.scdn.co/mp3-preview/593ce7c0bcaa47939130e8bd93f963d57593e50f' },
  'cover-03': { title: 'Fall For You', year: '2021', type: 'Single', spotifyId: '2EkX5zm8UCjqbacr4tflfw', preview: 'https://p.scdn.co/mp3-preview/90e553cdff3f162aaaf5e851b456301ebeb8c925' },
  'cover-04': { title: 'BURN WITH YOU (Kijo Remix)', year: '2025', type: 'Single', spotifyId: '3W8mAmdDUA9jHe3RxXxiol', preview: 'https://p.scdn.co/mp3-preview/5a8e5855bd7570b4c0cef0d9fe84e77f66141e7f' },
  'cover-07': { title: 'KARANLIĞIM SENDİN', year: '2025', type: 'Single', spotifyId: '3qgb2kYzagVp7awHY3vvbr', preview: 'https://p.scdn.co/mp3-preview/cf4320fe478d43a6a2d5e98e306198487821bbdb' },
  'cover-08': { title: 'cool', year: '2022', type: 'Single', spotifyId: '4JqtD9ezEPr4pe9rtWqL8f', preview: 'https://p.scdn.co/mp3-preview/f38af75cf1c99a0eab2f5c8890d90f554b1b53c2' },

  'cover-12': { title: 'It\'s Just a Feeling', year: '2019', type: 'Single', spotifyId: '6ZRt2TU99AxlkDWwa5paZv', preview: 'https://p.scdn.co/mp3-preview/d1b78c0108deee1177016a7facf906430d200e29' },
  'cover-13': { title: 'FARKINDA DEĞİLDİN (Sped Up)', year: '2023', type: 'Single', spotifyId: '502J4yyMf4qTwFshWjUwox', preview: 'https://p.scdn.co/mp3-preview/5e605d81ddffdc707ff6828845e3f0e648ee8813' },
  'cover-15': { title: 'U Gave Me Nothing', year: '2022', type: 'Single', spotifyId: '1sQKGjOvLmEFP3AWYFbo63', preview: 'https://p.scdn.co/mp3-preview/4b6ed3ac520a3f1b427df6e4c91efbc6f8afbdf6' },
  'cover-16': { title: 'LIGHTS OFF', year: '2023', type: 'Single', spotifyId: '3g8v8OPkVvNelPPUgdvTUh', preview: 'https://p.scdn.co/mp3-preview/d258f8cff8a8716e1ad1294df934e31a1459d97f' },
  'cover-17': { title: 'Bu Gece (BKE Remix)', year: '2024', type: 'Single', spotifyId: '6tfhfGAucrBP1iOvdkBUN8', preview: 'https://p.scdn.co/mp3-preview/2d1e50be9ca2b22ef4cd10dcac609f88fbd877f4' },
  'cover-19': { title: 'Tuz (Sertab Erener & Selin)', year: '2026', type: 'Single', spotifyId: '56XsrlnUH5aA3TKK0cTkq3', preview: 'https://p.scdn.co/mp3-preview/3f42576c79cbca23a54da9662a9cbf8105157e11' },
  'cover-20': { title: 'Give And Take', year: '2022', type: 'Single', spotifyId: '6ob0WQW2XZDlKps3ObT14Q', preview: 'https://p.scdn.co/mp3-preview/de79a8e942b65ec0161f4ad77007df4831f3f33a' },
  'cover-21': { title: 'Nereye Kadar', year: '2024', type: 'Single', spotifyId: '0u3u0mGeWYU0h8tWin4ZCa', preview: 'https://p.scdn.co/mp3-preview/a904b96e343064acd08326b7324d22d8bd5d9ccc' },
  'cover-22': { title: 'Asi', year: '2022', type: 'Single', spotifyId: '2JreBBfR668uVO5ZvOeKjT', preview: 'https://p.scdn.co/mp3-preview/2bad470f86a9484969b383ccb992320ae0200e2e' },
  'cover-23': { title: 'Enemies (Roxen & Selin)', year: '2022', type: 'Single', spotifyId: '6tw6TiAhBxjzYVgUrj0ddm', preview: 'https://p.scdn.co/mp3-preview/2d1dc31bd83d8d3d7eaef9b6231c620a87f6a279' },
  'cover-24': { title: 'You & Me (Millbrook & Selin)', year: '2020', type: 'Single', spotifyId: '0fMwDS1m5ZJMA0SLTNoZxs', preview: 'https://p.scdn.co/mp3-preview/0fbb78f2817fadcdcd8dcc7fe12c65b573d88089' },
  'cover-25': { title: 'BAŞKA BİRİ', year: '2026', type: 'Single', spotifyId: '6x5x5TX48gcHaaZQpO3f2q', preview: 'https://p.scdn.co/mp3-preview/c2c9e0678ffbbd3b015b90d00f1301e035202503' },
  'cover-26': { title: 'IMMA LIAR', year: '2023', type: 'Single', spotifyId: '49IX3KVi9QmelCBp9iIUIc', preview: 'https://p.scdn.co/mp3-preview/c925f77fae8f56748c48513a4c172c7630e16e12' },
  'cover-27': { title: 'His', year: '2022', type: 'Single', spotifyId: '6bRwh3cskYWuCfzQzpsqmg', preview: 'https://p.scdn.co/mp3-preview/14c31e8d2d98f3bee5b47c92f9d3d42dbb7f33eb' },
  'cover-28': { title: 'SON DAMLA', year: '2025', type: 'Single', spotifyId: '46Hogr85yq2tbM2Kaet3k9', preview: 'https://p.scdn.co/mp3-preview/9cf35ca6ad214ee2ae4f2d266bc1301660ed0369' },
  'cover-29': { title: 'HUMAN', year: '2024', type: 'Single', spotifyId: '2JRsdMaavScKW5ohfCFOgz', preview: 'https://p.scdn.co/mp3-preview/8fd8c5446552d1d442379b6abefeb1221af484c9' },
  'cover-30': { title: 'Sana', year: '2025', type: 'Single', spotifyId: '1HRq9gouGsn78384HYBKsN', preview: 'https://p.scdn.co/mp3-preview/1b487d29caebeee8ca68936b218024cc9af1791d' },
  'cover-31': { title: 'LIGHTS OFF', year: '2023', type: 'Single', spotifyId: '3g8v8OPkVvNelPPUgdvTUh', preview: 'https://p.scdn.co/mp3-preview/d258f8cff8a8716e1ad1294df934e31a1459d97f' },
  'cover-32': { title: 'Olabilirdik', year: '2023', type: 'Single', spotifyId: '62rfXEbU2o06c21kYvu4jN', preview: 'https://p.scdn.co/mp3-preview/f4801337cf991cb1a8c84358abc84cec9c921f32' },
  'cover-33': { title: 'CAN YOU UNDERSTAND ME?', year: '2024', type: 'Single', spotifyId: '05L8jDAOFRNcnRRAQLctLw', preview: 'https://p.scdn.co/mp3-preview/00b877f792bae81b10c57ee97352f0512fb4e272' },
  'cover-34': { title: 'UMUDUM YORULDU', year: '2023', type: 'Single', spotifyId: '4SCHVnagxaqrUdMTWlpIfS', preview: 'https://p.scdn.co/mp3-preview/ad85ba9832c216c0d18ebb2b4ca1b04b2ba50020' },
  'cover-35': { title: 'Heart in Two', year: '2020', type: 'Single', spotifyId: '5VHwDtW9Mpgp0qbnqrYcSw', preview: 'https://p.scdn.co/mp3-preview/6750291eeb9dc50e4234dbf59423e5c791b995e0' },
  'cover-36': { title: 'ŞIP', year: '2024', type: 'Single', spotifyId: '6f1Aj9Qf85b0Za8SRJCmbK', preview: 'https://p.scdn.co/mp3-preview/9c410f13aba7724074552423a5112694f6e0628e' },
  'cover-37': { title: 'NE SENLE NE SENSİZ', year: '2024', type: 'Single', spotifyId: '5bqI4hBdL3OOW0wMtjA9Fn', preview: 'https://p.scdn.co/mp3-preview/0ac3585714f293a08482e45405910ff121560029' },
  'cover-38': { title: 'SENİ GÖRDÜĞÜM AN', year: '2024', type: 'Single', spotifyId: '5hyYCEaC704WXeb4saAim4', preview: 'https://p.scdn.co/mp3-preview/de90c5f81766af0bf1aa6d80fef79a5ac38c7c2c' },
  'cover-39': { title: 'Love Bites', year: '2020', type: 'Single', spotifyId: '0mFHgcStQNDPzzUD1QgusC', preview: 'https://p.scdn.co/mp3-preview/658120ec4e2802d3f5523f2d84b699d22ba935b6' },
  'cover-40': { title: 'BURN WITH YOU', year: '2025', type: 'Single', spotifyId: '6zCTWOe7N8vCbKB9ZA6KsM', preview: 'https://p.scdn.co/mp3-preview/33ce84d0ec33f7caa6f4818459ffbfe44a79a6ee' },
  'cover-41': { title: 'İyileşiyorum (SAYGI1)', year: '2024', type: 'Single', spotifyId: '6VP4OTYyQOaJpMQnBxRqZ7', preview: 'https://p.scdn.co/mp3-preview/9cdea41ff7005be8b08ac07e661a914795cf7378' },
  'cover-42': { title: 'All Night (Millbrook & Selin)', year: '2020', type: 'Single', spotifyId: '52D9Bn7QZXnsDZhKgpyHyt', preview: 'https://p.scdn.co/mp3-preview/794a4008b6aa4d097aedfa9c544097f54835ea97' },
  'cover-43': { title: 'Everything We Had', year: '2020', type: 'Single', spotifyId: '0Z2JcqJRdmzm30ejTcIQsu', preview: 'https://p.scdn.co/mp3-preview/484d94981c219cc7d4d170fe71415dc6c1cd3011' },
  'cover-44': { title: 'Gidip Gel', year: '2021', type: 'Single', spotifyId: '4t4pXUYp810CyDS7STqmO2', preview: 'https://p.scdn.co/mp3-preview/23efaf318280c3c9edd98ede538f091278476916' },
  'cover-45': { title: 'FARKINDA DEĞİLDİN', year: '2023', type: 'Single', spotifyId: '0hpyV1jNlhTMgyyFhD38FW', preview: 'https://p.scdn.co/mp3-preview/0d5ab697e0e20eeeefc7cc33333e11d95b932ede' },
  'cover-46': { title: 'Yalancı Bahar', year: '2023', type: 'Single', spotifyId: '1uUqPjsPhymf3TkWfbrMzR', preview: 'https://p.scdn.co/mp3-preview/1aee33040483ffa756e35ccd70fb24aad78d9785' },
  'cover-48': { title: 'Dönmem Ben Sana', year: '2022', type: 'Single', spotifyId: '3GvdvQ3FXwJyFKsgm6qTSv', preview: 'https://p.scdn.co/mp3-preview/7ef6844c7e8da9826e9a8b1b9c63bdbeb63c300a' },
  'cover-49': { title: 'LOVERS HURRICANE (Sped Up)', year: '2023', type: 'Single', spotifyId: '5VRUELtImAcnEItxEjIgpF', preview: 'https://p.scdn.co/mp3-preview/4ca7206a2e7c47fcffbdf8a9ed1aec356233b0b4' },
  'cover-50': { title: 'LOVERS HURRICANE', year: '2023', type: 'Single', spotifyId: '04awPGvtHtmPtLaqAVpbLA', preview: 'https://p.scdn.co/mp3-preview/0b856ef6c44abb1da25b9683fce536d3816161bd' },
  'cover-51': { title: 'In Control', year: '2020', type: 'Single', spotifyId: '4WNcduiCmDNfmTEz7JvmLv', preview: 'https://p.scdn.co/mp3-preview/1d53b96abb564f9ba08427c3c5361dd8fbe72f7d' },
  'cover-52': { title: 'Sonuna Kadar', year: '2023', type: 'Single', spotifyId: '5YHCDgFcVb7DHyrcgBAvW6', preview: 'https://p.scdn.co/mp3-preview/e88fa0aa72f614e85f628b9781498a1f44a67844' },
  'cover-53': { title: 'Son Defa', year: '2024', type: 'Single', spotifyId: '1UT4sN4ELZA5EOCtmUVgnn', preview: 'https://p.scdn.co/mp3-preview/2159a25bee7d87c19f28188ed22f0c4896e05e45' },
  'cover-54': { title: 'Bu Gece', year: '2023', type: 'Single', spotifyId: '0kyGY7bztpRgb26xQbFW1b', preview: 'https://p.scdn.co/mp3-preview/f90616edcae963b3bbe5bd59f790fa30b8061c79' },
  'cover-55': { title: 'Palavra', year: '2023', type: 'Single', spotifyId: '2CZ0M0TiyfdL5d9PkMIMqE', preview: 'https://p.scdn.co/mp3-preview/6ac1c9b3cceabcce09e49d0214bee658db34a3dc' },
  'cover-56': { title: 'Crash & Burn', year: '2020', type: 'Single', spotifyId: '44xDBQQtyiT1KiTrZO5mDa', preview: 'https://p.scdn.co/mp3-preview/afb9e59b2b7c5e866789d7e7a051d35c74eca726' },
}

let detailEl = null
let activeCard = null
let audioEl = null
let isOpen = false
let isAnimating = false

export function initCardDetail() {
  detailEl = document.createElement('div')
  detailEl.className = 'card-detail'
  detailEl.innerHTML = `
    <div class="card-detail__backdrop"></div>
    <div class="card-detail__card">
      <div class="card-detail__media"></div>
      <div class="card-detail__info">
        <h3 class="card-detail__title"></h3>
        <p class="card-detail__meta"></p>
        <div class="card-detail__links"></div>
      </div>
    </div>
  `
  document.body.appendChild(detailEl)

  // Reusable audio element
  audioEl = new Audio()
  audioEl.volume = 0.7

  detailEl.querySelector('.card-detail__backdrop').addEventListener('click', closeDetail)

  window.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && isOpen) {
      closeDetail()
    }
  })
}

export function hitTestCards(clientX, clientY, cards) {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2

  const sorted = [...cards].sort((a, b) => a.z - b.z)

  for (const card of sorted) {
    if (card.type === 'image' && !card.media) continue
    if (card.type === 'video' && !card.videoEl) continue

    const p = project(card.x, card.y, card.z, cx, cy)
    const renderSize = card.isIntro ? p.size * 1.4 : p.size
    const half = renderSize / 2
    const left = p.sx - half
    const top = p.sy - half

    if (renderSize < 30) continue

    if (clientX >= left && clientX <= left + renderSize &&
        clientY >= top && clientY <= top + renderSize) {
      return { card, left, top, size: renderSize }
    }
  }

  return null
}

export function openDetail(card, fromLeft, fromTop, fromSize) {
  if (isAnimating || isOpen) return

  isAnimating = true
  activeCard = card
  isOpen = true

  const meta = COVER_META[card.mediaKey] || {
    title: card.mediaKey || 'Unknown',
    year: '',
    type: 'Single',
    spotifyId: null,
    preview: null,
  }

  // Set content
  const mediaEl = detailEl.querySelector('.card-detail__media')

  if (card.type === 'video' && card.videoEl) {
    // Video card: show the video with sound
    const detailVideo = document.createElement('video')
    detailVideo.src = card.videoEl.src
    detailVideo.autoplay = true
    detailVideo.loop = true
    detailVideo.playsInline = true
    detailVideo.muted = false
    detailVideo.className = 'card-detail__video'
    mediaEl.innerHTML = ''
    mediaEl.appendChild(detailVideo)
    detailVideo.play().catch(() => {})

    detailEl.querySelector('.card-detail__title').textContent = 'Live Performance'
    detailEl.querySelector('.card-detail__meta').textContent = 'SELIN'
    detailEl.querySelector('.card-detail__links').innerHTML = ''
  } else {
    // Image card: show cover + play preview
    mediaEl.innerHTML = `<img src="/covers/${card.mediaKey}.jpg" alt="${meta.title}" />`

    detailEl.querySelector('.card-detail__title').textContent = meta.title
    detailEl.querySelector('.card-detail__meta').textContent =
      [meta.year, meta.type].filter(Boolean).join(' · ')

    const linksEl = detailEl.querySelector('.card-detail__links')
    if (meta.spotifyId) {
      linksEl.innerHTML = `
        <a class="card-detail__link" href="https://open.spotify.com/track/${meta.spotifyId}" target="_blank" aria-label="Spotify'da aç">${SPOTIFY_ICON}<span>Spotify'da aç</span></a>
      `
    } else {
      linksEl.innerHTML = ''
    }

    if (meta.preview) {
      audioEl.src = meta.preview
      audioEl.play().catch(() => {})
    }
  }

  // Slow void
  setPanelOpen(true)
  setSpeedMultiplier(0.15)
  document.getElementById('c').classList.add('is-blurred')

  // Show
  detailEl.classList.add('is-open')

  const cardEl = detailEl.querySelector('.card-detail__card')
  const infoEl = detailEl.querySelector('.card-detail__info')
  const backdrop = detailEl.querySelector('.card-detail__backdrop')

  const targetSize = Math.min(320, window.innerWidth * 0.4)
  const targetLeft = (window.innerWidth - targetSize) / 2
  const isVideo = card.type === 'video'
  const targetTop = isVideo
    ? (window.innerHeight - targetSize) / 2 - (window.innerHeight * 0.15)
    : (window.innerHeight - targetSize) / 2 - 60

  gsap.set(infoEl, { opacity: 0, y: 20 })

  gsap.fromTo(cardEl, {
    left: fromLeft,
    top: fromTop,
    width: fromSize,
    height: fromSize,
    opacity: 0.7,
  }, {
    left: targetLeft,
    top: targetTop,
    width: targetSize,
    height: 'auto',
    opacity: 1,
    duration: 0.55,
    ease: 'power3.out',
  })

  gsap.fromTo(backdrop, { opacity: 0 }, {
    opacity: 1,
    duration: 0.4,
    ease: 'power2.out',
  })

  gsap.to(infoEl, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    delay: 0.3,
    ease: 'power2.out',
    onComplete: () => {
      isAnimating = false
    },
  })

  window.dispatchEvent(new CustomEvent('panel:open', { detail: { name: 'card-detail' } }))
}

export function closeDetail() {
  if (isAnimating || !isOpen) return

  isAnimating = true

  // Stop detail video if exists
  const detailVideo = detailEl.querySelector('.card-detail__video')
  if (detailVideo) {
    detailVideo.pause()
    detailVideo.src = ''
  }

  // Fade out audio
  const fadeAudio = () => {
    if (audioEl.volume > 0.05) {
      audioEl.volume -= 0.05
      requestAnimationFrame(fadeAudio)
    } else {
      audioEl.pause()
      audioEl.volume = 0.7
      audioEl.src = ''
    }
  }
  fadeAudio()

  const cardEl = detailEl.querySelector('.card-detail__card')
  const backdrop = detailEl.querySelector('.card-detail__backdrop')

  gsap.to(cardEl, {
    opacity: 0,
    scale: 0.85,
    duration: 0.35,
    ease: 'power2.in',
  })

  gsap.to(backdrop, {
    opacity: 0,
    duration: 0.3,
    delay: 0.05,
    onComplete: () => {
      detailEl.classList.remove('is-open')

      setPanelOpen(false)
      setSpeedMultiplier(1.0)
      document.getElementById('c').classList.remove('is-blurred')

      gsap.set(cardEl, { clearProps: 'all' })

      activeCard = null
      isOpen = false
      isAnimating = false

      window.dispatchEvent(new CustomEvent('panel:close'))
    },
  })
}

export function isDetailOpen() {
  return isOpen
}
