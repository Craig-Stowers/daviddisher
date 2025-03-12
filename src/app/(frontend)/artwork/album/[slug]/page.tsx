import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 120 //

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const albums = await payload.find({
    collection: 'albums',
    depth: 1,
    limit: 0,
  })

  const staticParams = albums.docs.map((album) => ({
    params: {
      slug: album.slug,
    },
  }))
  console.log('staticParams', staticParams)
  return staticParams
}

export default async function AlbumPage() {
  return null
}
