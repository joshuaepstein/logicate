export const CACHE_NAME = 'logo-cache'
export const LOGO_DATA_KEY = 'logo-data'
export const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export async function getFromCache(key: string) {
  if (typeof caches === 'undefined') return null
  const cache = await caches.open(CACHE_NAME)
  const response = await cache.match(key)
  if (!response) return null
  const data = await response.json()
  if (Date.now() > data.expiry) {
    await cache.delete(key)
    return null
  }
  return data.value
}

export async function setInCache(key: string, value: string) {
  if (typeof caches === 'undefined') return
  const cache = await caches.open(CACHE_NAME)
  const data = {
    value: value,
    expiry: Date.now() + CACHE_DURATION,
  }
  await cache.put(key, new Response(JSON.stringify(data)))
}

export async function fetchImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url, {})
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

// This function would typically be in a separate file, e.g., 'lib/db.ts'
export async function getLogoUrlFromDB() {
  // Simulating a database call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  //   return 'https://jfstech.uk/COLOUR.png'
  return 'http://localhost:3000/questions_demo.png'
}
