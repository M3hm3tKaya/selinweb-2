const SPOTIFY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>'
const APPLE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>'
const YOUTUBE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'
const INSTAGRAM_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>'

const MUSIC_DATA = [
  { cover: '/covers/cover-25.jpg', title: 'BAŞKA BİRİ', year: '2026', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/c2c9e0678ffbbd3b015b90d00f1301e035202503' },
  { cover: '/covers/cover-19.jpg', title: 'Tuz (feat. Sertab Erener)', year: '2026', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/3f42576c79cbca23a54da9662a9cbf8105157e11' },
  { cover: '/covers/cover-28.jpg', title: 'SON DAMLA', year: '2025', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/9cf35ca6ad214ee2ae4f2d266bc1301660ed0369' },
  { cover: '/covers/cover-30.jpg', title: 'Sana', year: '2025', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/1b487d29caebeee8ca68936b218024cc9af1791d' },
  { cover: '/covers/cover-40.jpg', title: 'BURN WITH YOU', year: '2025', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/33ce84d0ec33f7caa6f4818459ffbfe44a79a6ee' },
  { cover: '/covers/cover-04.jpg', title: 'BURN WITH YOU (Kijo Remix)', year: '2025', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/5a8e5855bd7570b4c0cef0d9fe84e77f66141e7f' },
  { cover: '/covers/cover-07.jpg', title: 'KARANLIĞIM SENDİN', year: '2025', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/cf4320fe478d43a6a2d5e98e306198487821bbdb' },
  { cover: '/covers/cover-41.jpg', title: 'İyileşiyorum (SAYGI1)', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/9cdea41ff7005be8b08ac07e661a914795cf7378' },
  { cover: '/covers/cover-36.jpg', title: 'ŞIP', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/9c410f13aba7724074552423a5112694f6e0628e' },
  { cover: '/covers/cover-38.jpg', title: 'SENİ GÖRDÜĞÜM AN', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/de90c5f81766af0bf1aa6d80fef79a5ac38c7c2c' },
  { cover: '/covers/cover-29.jpg', title: 'HUMAN', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/8fd8c5446552d1d442379b6abefeb1221af484c9' },
  { cover: '/covers/cover-21.jpg', title: 'Nereye Kadar', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/a904b96e343064acd08326b7324d22d8bd5d9ccc' },
  { cover: '/covers/cover-33.jpg', title: 'CAN YOU UNDERSTAND ME?', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/00b877f792bae81b10c57ee97352f0512fb4e272' },
  { cover: '/covers/cover-53.jpg', title: 'Son Defa', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/2159a25bee7d87c19f28188ed22f0c4896e05e45' },
  { cover: '/covers/cover-37.jpg', title: 'NE SENLE NE SENSİZ', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/0ac3585714f293a08482e45405910ff121560029' },
  { cover: '/covers/cover-17.jpg', title: 'Bu Gece (BKE Remix)', year: '2024', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/2d1e50be9ca2b22ef4cd10dcac609f88fbd877f4' },
  { cover: '/covers/cover-45.jpg', title: 'FARKINDA DEĞİLDİN', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/0d5ab697e0e20eeeefc7cc33333e11d95b932ede' },
  { cover: '/covers/cover-13.jpg', title: 'FARKINDA DEĞİLDİN (Sped Up)', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/5e605d81ddffdc707ff6828845e3f0e648ee8813' },
  { cover: '/covers/cover-31.jpg', title: 'LIGHTS OFF', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/d258f8cff8a8716e1ad1294df934e31a1459d97f' },
  { cover: '/covers/cover-26.jpg', title: 'IMMA LIAR', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/c925f77fae8f56748c48513a4c172c7630e16e12' },
  { cover: '/covers/cover-32.jpg', title: 'Olabilirdik', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/f4801337cf991cb1a8c84358abc84cec9c921f32' },
  { cover: '/covers/cover-46.jpg', title: 'Yalancı Bahar', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/1aee33040483ffa756e35ccd70fb24aad78d9785' },
  { cover: '/covers/cover-34.jpg', title: 'UMUDUM YORULDU', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/ad85ba9832c216c0d18ebb2b4ca1b04b2ba50020' },
  { cover: '/covers/cover-50.jpg', title: 'LOVERS HURRICANE', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/0b856ef6c44abb1da25b9683fce536d3816161bd' },
  { cover: '/covers/cover-52.jpg', title: 'Sonuna Kadar', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/e88fa0aa72f614e85f628b9781498a1f44a67844' },
  { cover: '/covers/cover-54.jpg', title: 'Bu Gece', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/f90616edcae963b3bbe5bd59f790fa30b8061c79' },
  { cover: '/covers/cover-55.jpg', title: 'Palavra', year: '2023', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/6ac1c9b3cceabcce09e49d0214bee658db34a3dc' },
  { cover: '/covers/cover-08.jpg', title: 'cool', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/f38af75cf1c99a0eab2f5c8890d90f554b1b53c2' },
  { cover: '/covers/cover-48.jpg', title: 'Dönmem Ben Sana', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/7ef6844c7e8da9826e9a8b1b9c63bdbeb63c300a' },
  { cover: '/covers/cover-22.jpg', title: 'Asi', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/2bad470f86a9484969b383ccb992320ae0200e2e' },
  { cover: '/covers/cover-27.jpg', title: 'His', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/14c31e8d2d98f3bee5b47c92f9d3d42dbb7f33eb' },
  { cover: '/covers/cover-23.jpg', title: 'Enemies (feat. Roxen)', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/2d1dc31bd83d8d3d7eaef9b6231c620a87f6a279' },
  { cover: '/covers/cover-15.jpg', title: 'U Gave Me Nothing', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/4b6ed3ac520a3f1b427df6e4c91efbc6f8afbdf6' },
  { cover: '/covers/cover-20.jpg', title: 'Give And Take', year: '2022', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/de79a8e942b65ec0161f4ad77007df4831f3f33a' },
  { cover: '/covers/cover-03.jpg', title: 'Fall For You', year: '2021', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/90e553cdff3f162aaaf5e851b456301ebeb8c925' },
  { cover: '/covers/cover-44.jpg', title: 'Gidip Gel', year: '2021', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/23efaf318280c3c9edd98ede538f091278476916' },
  { cover: '/covers/cover-24.jpg', title: 'You & Me (feat. Millbrook)', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/0fbb78f2817fadcdcd8dcc7fe12c65b573d88089' },
  { cover: '/covers/cover-42.jpg', title: 'All Night (feat. Millbrook)', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/794a4008b6aa4d097aedfa9c544097f54835ea97' },
  { cover: '/covers/cover-43.jpg', title: 'Everything We Had', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/484d94981c219cc7d4d170fe71415dc6c1cd3011' },
  { cover: '/covers/cover-51.jpg', title: 'In Control', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/1d53b96abb564f9ba08427c3c5361dd8fbe72f7d' },
  { cover: '/covers/cover-39.jpg', title: 'Love Bites', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/658120ec4e2802d3f5523f2d84b699d22ba935b6' },
  { cover: '/covers/cover-56.jpg', title: 'Crash & Burn', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/afb9e59b2b7c5e866789d7e7a051d35c74eca726' },
  { cover: '/covers/cover-35.jpg', title: 'Heart in Two', year: '2020', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/6750291eeb9dc50e4234dbf59423e5c791b995e0' },
  { cover: '/covers/cover-12.jpg', title: 'It\'s Just a Feeling', year: '2019', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/d1b78c0108deee1177016a7facf906430d200e29' },
  { cover: '/covers/cover-01.jpg', title: 'Moonlight (feat. Soul Formula)', year: '2019', type: 'Single', preview: 'https://p.scdn.co/mp3-preview/593ce7c0bcaa47939130e8bd93f963d57593e50f' },
]

export { MUSIC_DATA }

const UPCOMING_SHOWS = [
  { date: '15 May 2026', city: 'Istanbul', venue: 'Zorlu PSM' },
  { date: '22 May 2026', city: 'Ankara', venue: 'MEB Şura Salonu' },
  { date: '05 Haz 2026', city: 'Izmir', venue: 'Ahmed Adnan Saygun' },
  { date: '18 Haz 2026', city: 'Antalya', venue: 'Aspendos Arena' },
]

const PAST_SHOWS = [
  { date: '31 Oca 2026', city: 'Istanbul', venue: 'Bostancı Gösteri Merkezi' },
  { date: '15 Oca 2026', city: 'Ankara', venue: 'Congresium' },
  { date: '01 Ara 2025', city: 'Kocaeli', venue: 'Kültür Merkezi' },
  { date: '15 Kas 2025', city: 'Yalova', venue: 'Yalova AKM' },
  { date: '01 Kas 2025', city: 'Istanbul', venue: 'Zorlu PSM' },
  { date: '14 Haz 2025', city: 'Istanbul', venue: 'Hayal Kahvesi' },
  { date: '30 May 2025', city: 'Akhisar', venue: 'Akhisar AKM' },
]

export function getBioContent() {
  return `
    <div class="panel-bio">
      <img class="panel-bio__portrait" src="/selin-bio.jpg" alt="Selin Geçit" />
      <div>
        <h2 class="panel-bio__name">Selin Geçit</h2>
        <p class="panel-bio__text">
          Selin Geçit, İstanbul doğumlu bir müzisyen ve söz yazarı.
          Müziğe küçük yaşta başlayan Selin, özgün sesi ve duygusal yorumlarıyla
          kısa sürede geniş bir dinleyici kitlesine ulaştı.
        </p>
        <br/>
        <p class="panel-bio__text">
          Pop ve alternatif müziği harmanlayan tarzıyla dikkat çeken sanatçı,
          sahne performanslarıyla da tanınıyor. Türkiye'nin dört bir yanında
          verdiği konserlerle hayranlarıyla buluşmaya devam ediyor.
        </p>
      </div>
    </div>
  `
}

export function getBioGalleryHTML() {
  return `
    <div class="bio-gallery" id="bioGallery">
      <img class="bio-gallery__img bio-gallery__img--1" src="/bio-1.jpg" alt="Selin live" />
      <img class="bio-gallery__img bio-gallery__img--2" src="/bio-2.jpg" alt="Selin portrait" />
      <img class="bio-gallery__img bio-gallery__img--3" src="/bio-3.jpg" alt="Selin portrait" />
    </div>
  `
}

export function getMusicContent() {
  const items = MUSIC_DATA.map((m, i) => `
    <div class="panel-music__item" data-index="${i}">
      <div class="panel-music__cover-wrap">
        <img class="panel-music__cover" src="${m.cover}" alt="${m.title}" />
        <button class="panel-music__play-btn" data-index="${i}" aria-label="Play">
          <svg class="panel-music__play-icon" viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21"/></svg>
          <svg class="panel-music__pause-icon" viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18"/><rect x="15" y="3" width="4" height="18"/></svg>
        </button>
      </div>
      <div class="panel-music__info">
        <div class="panel-music__title">${m.title}</div>
        <div class="panel-music__year">${m.year} · ${m.type}</div>
      </div>
    </div>
  `).join('')

  return `
    <div class="panel-music__section-title">Tüm Şarkılar</div>
    <div class="panel-music__list">${items}</div>
  `
}

export function getMusicFeaturedHTML() {
  return `
    <div class="music-featured" id="musicFeatured">
      <div class="music-featured__badge">Yeni Çıktı</div>
      <div class="music-featured__cover-wrap">
        <img class="music-featured__cover" src="/covers/cover-25.jpg" alt="BAŞKA BİRİ" id="featuredCoverImg" />
      </div>
      <button class="music-featured__playpause" id="featuredPlayPause" aria-label="Play/Pause">
        <svg class="morph-btn" viewBox="0 0 24 24" width="28" height="28">
          <polygon class="morph-play" points="6,3 20,12 6,21" fill="currentColor"/>
          <g class="morph-pause" fill="currentColor">
            <rect x="5" y="3" width="4" height="18"/>
            <rect x="15" y="3" width="4" height="18"/>
          </g>
        </svg>
      </button>
      <h3 class="music-featured__title">BAŞKA BİRİ</h3>
      <p class="music-featured__meta">2026 · Single</p>
      <div class="music-featured__links">
        <a class="panel-music__link" href="https://open.spotify.com/track/6x5x5TX48gcHaaZQpO3f2q" target="_blank" aria-label="Spotify">${SPOTIFY_ICON}<span>Spotify</span></a>
        <a class="panel-music__link" href="#" aria-label="Apple Music">${APPLE_ICON}<span>Apple Music</span></a>
        <a class="panel-music__link" href="#" aria-label="YouTube">${YOUTUBE_ICON}<span>YouTube</span></a>
      </div>
    </div>
  `
}

export function getLiveContent() {
  const upcoming = UPCOMING_SHOWS.map(s => `
    <div class="panel-live__entry">
      <span class="panel-live__date">${s.date}</span>
      <span>${s.city}</span>
      <span class="panel-live__venue">${s.venue}</span>
    </div>
  `).join('')

  const past = PAST_SHOWS.map(s => `
    <div class="panel-live__entry">
      <span class="panel-live__date">${s.date}</span>
      <span>${s.city}</span>
      <span class="panel-live__venue">${s.venue}</span>
    </div>
  `).join('')

  return `
    <div class="panel-live__section-title">Yaklaşan Konserler</div>
    <div class="panel-live__list">${upcoming}</div>
    <div class="panel-live__section-title">Geçmiş Konserler</div>
    <div class="panel-live__list panel-live__past">${past}</div>
  `
}

export function getContactContent() {
  return `
    <div class="panel-contact">
      <div class="panel-contact__section">
        <span class="panel-contact__label">Booking & Management</span>
        <span class="panel-contact__value"><a href="mailto:booking@selingecit.com">booking@selingecit.com</a></span>
      </div>
      <div class="panel-contact__section">
        <span class="panel-contact__label">Press Kit</span>
        <span class="panel-contact__value"><a href="#">Press kit indir (PDF)</a></span>
      </div>
      <div class="panel-contact__section">
        <span class="panel-contact__label">Sosyal Medya</span>
        <div class="panel-contact__socials">
          <a class="panel-contact__social" href="https://instagram.com/selingecit" target="_blank" aria-label="Instagram">${INSTAGRAM_ICON}</a>
          <a class="panel-contact__social" href="https://open.spotify.com/artist/selingecit" target="_blank" aria-label="Spotify">${SPOTIFY_ICON}</a>
          <a class="panel-contact__social" href="https://youtube.com/@selingecit" target="_blank" aria-label="YouTube">${YOUTUBE_ICON}</a>
        </div>
      </div>
    </div>
  `
}
