import { CollectionConfig, PayloadRequest, PayloadHandler, getPayload } from 'payload'
import configPromise from '@payload-config'

const generateAlbumsByYear = async () => {
  console.log('🔄 Fetching artworks and grouping by year...')
  const payload = await getPayload({ config: configPromise })

  try {
    // Fetch all artworks
    const { docs: artworks } = await payload.find({
      collection: 'artwork',
      limit: 0, // Fetch all artworks
    })

    if (!artworks.length) {
      console.log('❌ No artworks found.')
      return
    }

    // Group artworks by release year
    const artworksByYear: Record<string, string[]> = {} // { year: [artworkId1, artworkId2] }

    artworks.forEach((artwork) => {
      if (artwork.releaseDate) {
        const year = new Date(artwork.releaseDate).getFullYear().toString()
        if (!artworksByYear[year]) artworksByYear[year] = []
        artworksByYear[year].push(artwork.id)
      }
    })

    console.log('✅ Grouped artworks by year:', artworksByYear)

    // Create albums for each year
    for (const [year, artworkIds] of Object.entries(artworksByYear)) {
      console.log(`🔍 Checking for existing album: Album ${year}`)

      // Check if an album for this year already exists
      const existingAlbum = await payload.find({
        collection: 'albums',
        where: { name: { equals: `Album ${year}` } },
        limit: 1,
      })

      if (existingAlbum.totalDocs > 0) {
        // ✅ Fix: Use totalDocs instead of total
        console.log(`⚠️ Album ${year} already exists. Skipping.`)
        continue
      }

      console.log(`✅ Creating new album for year: ${year}`)

      // Create new album
      await payload.create({
        collection: 'albums',
        data: {
          name: `Album ${year}`,
          slug: `album-${year}`,
          order: 0, // Default order
          images: artworkIds, // Assign artworks to album
        },
      })

      console.log(`🎉 Album ${year} created successfully.`)
    }

    console.log('✅ All albums generated successfully.')
  } catch (error) {
    console.error('⚠️ Error generating albums:', error)
  }
}

export const Albums: CollectionConfig = {
  slug: 'albums',
  // admin: {
  //   defaultColumns: ['name'],
  // },

  admin: {
    components: {
      beforeList: ['./collections/components/CreateAlbumByYearButton'], // Inject button above the album list
    },
  },
  endpoints: [
    {
      path: '/generate-by-year',
      method: 'post',
      handler: async (req: PayloadRequest) => {
        if (req.user) {
          console.log(`Authenticated user: ${req.user.email}`)

          generateAlbumsByYear()

          return new Response(JSON.stringify({ message: 'Authenticated request received.' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          })
        } else {
          console.log('Unauthenticated request.')
          return new Response(JSON.stringify({ message: 'Not authenticated.' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true, // Adds an index to the field
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Ensures unique URLs
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0, // Default value of 0
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'artwork',
      required: false, // Optional cover image
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'artwork',
      hasMany: true, // Multiple images per album
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^a-z0-9-]/g, '') // Remove special characters
            .trim()
        }
      },
    ],
  },
}
