# Tech Context

## Stack
- Vite 5+ (build tool, terser minification)
- Vanilla JS ES2022+ (ES Modules, no framework)
- HTML5 Canvas 2D API (card rendering)
- HTML5 Video API (video overlays)
- GSAP 3.12+ (UI animations)
- Lenis (scroll delta capture — installed but scroll handled via wheel/touch events directly)
- PostCSS + Autoprefixer + cssnano

## Fonts
- Cormorant Garamond (Light) — titles, via Google Fonts CDN
- Outfit (Variable, weights 200-400) — body/UI, via Google Fonts CDN

## Color Palettes
### Palette A — "Warm Void" (default)
- bg: #050505, card-fill: #161616, accent: #C4A77D

### Palette B — "Cold Void"
- bg: #060608, card-fill: #141418, accent: #8090C0

### Palette C — "Mono Void"
- bg: #080808, card-fill: #1a1a1a, accent: #ffffff

## Performance
- 60fps target
- Single requestAnimationFrame loop
- Off-screen culling, size-based skip
- devicePixelRatio scaling for crisp Canvas
- Max 5 active DOM videos
- Responsive ring reduction reduces card count on smaller screens

## Build Output
- JS: 78.30 KB (30.62 KB gzipped)
- CSS: 4.23 KB (1.63 KB gzipped)

## Accessibility
- prefers-reduced-motion: static render
- Keyboard: space/enter pause/play
- Canvas: aria-label + role="img"
- Palette buttons: aria-label

## File Structure
- src/js/engine/ — core render loop, projection, Z management, speed
- src/js/cards/ — card pool, image cards, video cards, media loading
- src/js/ui/ — overlay, palette switcher, preloader
- src/js/utils/ — math helpers, media loader
- src/css/ — modular CSS with 3-palette system
