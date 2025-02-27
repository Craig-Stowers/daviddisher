import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { AlbumProvider } from '../../AlbumProvider'
import ImageViewer from './image/[imageId]/_components/ImageViewer'

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

export default async function AlbumLayout(props) {
  const newParams = await props.params

  const album = (await queryAlbumBySlug({ slug: newParams.slug })) || null
  //const slug = newParams.slug

  console.log('reload album', album)

  return (
    <div className="relative">
      <GalleryServer images={album.images} gallerySlug={newParams.slug} />

      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
        }}
      >
        {/* {props.children} */}

        <AlbumProvider albumData={album}>
          {props.children}
          <ImageViewer />
        </AlbumProvider>
      </div>
    </div>
  )
}
