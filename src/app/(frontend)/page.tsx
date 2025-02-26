import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import configPromise from '@payload-config'

import type { StaticImageData } from 'next/image'

export default async function HomePage() {
  //const headers = await getHeaders()
  const payloadConfig = await config
  //const payload = await getPayload({ config: payloadConfig })
  const payload = await getPayload({ config: configPromise })

  // const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  // Fetch media
  const media = await payload.find({
    collection: 'media',
    depth: 1,
    limit: 3,
    overrideAccess: false,
  })

  // Define type for media items
  interface MediaItem {
    id: string
    url?: string | null
    width?: number | null
    height?: number | null
    alt?: string | null
  }

  return (
    <div className="home">
      <div className="content">
        <h2>TESTING ALL MEDIA</h2>

        {media.docs.map((item: MediaItem) => {
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
    </div>
  )
}

export const revalidate = 120 // Cache the page for 60 seconds before refreshing
