// Actual cover numbers (1-56, no 47)
const COVER_NUMBERS = [
  1,3,4,7,8,12,13,15,16,17,19,20,
  21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
  41,42,43,44,45,46,48,49,50,51,52,53,54,55,56
]
const COVER_COUNT = COVER_NUMBERS.length // 50
const imageCache = {}
const loadedKeys = []

export async function preloadImages(onProgress) {
  const entries = COVER_NUMBERS.map(n => {
    const num = String(n).padStart(2, '0')
    return { key: `cover-${num}`, path: `/covers/cover-${num}.jpg` }
  })

  let loaded = 0
  const total = entries.length

  const promises = entries.map(({ key, path }) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        imageCache[key] = img
        loadedKeys.push(key)
        loaded++
        if (onProgress) onProgress(loaded / total)
        resolve()
      }
      img.onerror = () => {
        // Skip failed loads, don't add to cache
        loaded++
        if (onProgress) onProgress(loaded / total)
        resolve()
      }
      img.src = path
    })
  })

  await Promise.all(promises)
  return imageCache
}

export function getImage(key) {
  return imageCache[key] || null
}

export function getLoadedKeys() {
  return loadedKeys
}

export { COVER_COUNT }
