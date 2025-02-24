import React, { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const queryAlbumBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'albums',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

interface MediaItem {
  id: string
  url?: string | null
  width?: number | null
  height?: number | null
  alt?: string | null
}

export default async function AlbumPage({ params: paramsPromise }: Args) {
  const { slug = 'home' } = await paramsPromise

  const album: { images?: MediaItem[] } | null = await queryAlbumBySlug({ slug })

  if (!album) return notFound()

  console.log('album', album)
  // if (!album) return notFound(); // Show 404 if album isn't found

  return (
    <div>
      <h1>ALBUM HERE - {slug}</h1>

      {album.images?.map((item: MediaItem) => {
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
      })}
    </div>
  )
}
