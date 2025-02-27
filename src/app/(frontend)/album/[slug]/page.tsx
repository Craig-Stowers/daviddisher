import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'

import Gallery from '../../_gallery/Gallery'

export const revalidate = 120 //

type Args = {
  params: Promise<{
    slug?: string
  }>
}

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })

//   const albums = await payload.find({
//     collection: 'albums',
//     depth: 1,
//   })

//   return albums.docs.map((album) => ({
//     params: {
//       slug: album.slug,
//     },
//   }))
// }

export default async function AlbumPage({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise

  // const pendingImageNumber = pendingImage ? parseInt(pendingImage) : null

  // const album = (await queryAlbumBySlug({ slug })) || null

  // if (!album) return notFound()

  // if (!album) return notFound(); // Show 404 if album isn't found

  return (
    <div>
      {/* <h1>{album.name}</h1> */}

      <Gallery
        gallerySlug={slug}

        // images={(album.images ?? []).filter((item): item is Media => typeof item !== 'string')}
      />

      {/* {album.images?.map((item) => {
        // If item is a string, it's an ID, so we can't use it directly
        if (typeof item === 'string') {
          return <p key={item}>Loading image...</p> // Handle missing data gracefully
        }

        // Ensure src is always a valid string
        const src: StaticImageData | string = item.url || '/fallback.jpg'
        const width = item.width ?? 100 // Default width if missing
        const height = item.height ?? 100 // Default height if missing
        const alt = item.alt || 'Default image'

        return (
          <Image
            key={item.id}
            src={src}
            width={width}
            height={height}
            alt={alt}
            placeholder="blur"
            blurDataURL="data:image/png;base64,..." // Optional placeholder
            quality={100}
            loading="lazy"
          />
        )
      })} */}
    </div>
  )
}
