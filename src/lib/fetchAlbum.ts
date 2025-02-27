import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getAlbumData = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'albums',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2, // Ensures full media objects are returned instead of just IDs
  })

  return result.docs?.[0] || null
})

export const getAllAlbums = cache(async () => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'albums',
    limit: 0,
    depth: 1,

    // fields: ['id', 'name', 'slug', 'coverImage'],
  })

  //console.log('QUERY GET ALBUM RESULT', result)

  return result.docs
})
