import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { AlbumProvider } from '../../AlbumProvider'

const queryAlbumBySlug = cache(async ({ slug }: { slug: string }) => {
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

export default async function AlbumLayout(props: {
  children: React.ReactNode
  viewer: React.ReactNode
  params: Promise<{ slug?: string }>
}) {
  const { slug = 'home' } = await props.params
  // console.log('album layout with params', slug)
  // const router = useRouter();
  // const isViewingImage = pathname.split("/").length > 3;
  // Detect if in `[imageSlug]` route

  const album = (await queryAlbumBySlug({ slug })) || null

  console.log('album', album.images)

  return (
    <AlbumProvider album={{ images: album.images, slug: slug }}>
      <div className="relative">
        {props.children}
        {props.viewer}
      </div>
    </AlbumProvider>
  )
}
