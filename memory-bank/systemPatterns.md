# System Patterns

## Core Mechanic — Reverse Starfield
- Each card has `(worldX, worldY, z)` position
- Projected to 2D: `screenPos = center + (worldXY * FOV / Z)` where FOV=400
- As Z increases, card shrinks and approaches center
- Z range: Z_START(4) → Z_END(2500)
- `wrapZ()`: modular wrap when Z exits range — no gaps
- All cards move at the same speed
- Wrap-around triggers media reassignment (new random image/video)

## Slot System (X/Y Overlap Prevention)
- Ring-based: center (1 slot) + 5 rings (4, 5, 6, 7, 8 slots)
- Each ring at different radius, slots evenly distributed by angle
- Inter-ring angle offset prevents radial alignment
- Responsive: desktop=6 rings (31), tablet=5 (23), mobile=4 (18)

## Z Spacing
- `Z_RANGE / NUM_CARDS` = equal spacing
- wrapZ preserves spacing in both directions

## Speed System
- `currentSpeed = DEFAULT_SPEED(1.2) + scrollVelocity`
- scrollVelocity decays at 0.90 per frame
- Clamped: -15 to +20

## Media Cards
- Album covers: Canvas `drawImage()`, 50 covers with placeholder fallback
- Video clips: DOM `<video>` overlay, max 5 active, mobile disabled
- Shuffle system prevents repeated images

## Z-Index Layers
1. Canvas (z-index: 1)
2. Video Layer (z-index: 10)
3. Vignette (z-index: 50)
4. Grain (z-index: 60)
5. UI Overlay (z-index: 80)
6. Palette Switcher (z-index: 90)
7. Preloader (z-index: 100)

## UI Patterns
- Overlay fades out on scroll, returns after 2s idle
- Palette persisted in localStorage
- Preloader shows progress bar during image preload
- GSAP for UI animations only (not card motion)
