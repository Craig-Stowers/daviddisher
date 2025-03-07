import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function generateAlbumsByYear() {
  console.log('Generating albums by year...')
  const payload = await getPayload({ config: configPromise })
  try {
    const artworks = await payload.find({
      collection: 'artwork',
      limit: 0, // Fetch all
    })

    if (!artworks || artworks.docs.length === 0) {
      console.log('No artworks found.')
      return
    }

    const artworksByYear: Record<string, string[]> = {}
    artworks.docs.forEach((artwork) => {
      if (artwork.releaseDate) {
        const year = new Date(artwork.releaseDate).getFullYear()
        if (!artworksByYear[year]) artworksByYear[year] = []
        artworksByYear[year].push(artwork.id)
      }
    })

    for (const [year, artworkIds] of Object.entries(artworksByYear)) {
      const existingAlbum = await payload.find({
        collection: 'albums',
        where: { name: { equals: `Album ${year}` } },
        limit: 1,
      })

      console.log('existingAlbum', existingAlbum)

      // if (existingAlbum.total > 0) {
      //   console.log(`Album ${year} already exists. Skipping.`)
      //   continue
      // }

      await payload.create({
        collection: 'albums',
        data: {
          name: `Album ${year}`,
          slug: `album-${year}`,
          order: 0,
          images: artworkIds,
        },
      })
    }

    console.log('Albums generated successfully.')
  } catch (error) {
    console.error('Error generating albums:', error)
  }
}

export default generateAlbumsByYear
