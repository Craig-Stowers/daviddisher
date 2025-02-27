import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { AlbumProvider } from '../../AlbumProvider'
import GalleryServer from '../../_gallery/GalleryServer'

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

  const album = (await queryAlbumBySlug({ slug })) || null

  return (
    <AlbumProvider album={{ images: album.images, slug: slug }}>
      <div className="relative">
        {/* <GalleryServer images={album.images} slug={slug} /> */}
        {props.children}
        {props.viewer}
      </div>
    </AlbumProvider>
  )
}
