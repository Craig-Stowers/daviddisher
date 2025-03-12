const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function preloadImages(imageUrls) {
  await Promise.all(
    imageUrls.map((url) => {
      // Ensure the URL is absolute
      const absoluteUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
      // console.log('prefetch image', absoluteUrl)
      return fetch(absoluteUrl, {
        cache: 'force-cache',
        next: { revalidate: 86400 }, // Cache for 24 hours
      })
    }),
  )
}
