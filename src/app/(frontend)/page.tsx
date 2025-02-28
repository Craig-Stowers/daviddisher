import Image from 'next/image'

import React from 'react'

import './styles.css'

import { getGlobals } from '@/lib/getData'

//import type { StaticImageData } from 'next/image'

export default async function HomePage() {
  const siteSettings = await getGlobals('site-settings')

  // Define type for media items
  interface MediaItem {
    id: string
    url?: string | null
    width?: number | null
    height?: number | null
    alt?: string | null
  }

  const frontPageArt = siteSettings.frontPageArt

  return (
    <div className="home">
      <div className="content">
        <Image
          src={frontPageArt.url}
          width={frontPageArt.width}
          height={frontPageArt.height}
          alt={frontPageArt.alt}
          quality={100}
          loading="lazy"
        />
        {/* {media.docs.map((item: MediaItem) => {
          // Ensure src is always a valid string
          // const src: StaticImageData | string = item.url || '/fallback.jpg'
          const src: StaticImageData | string = item.url || null
          const width = item.width ?? 100 // Default width if missing
          const height = item.height ?? 100 // Default height if missing
          const alt = item.alt || 'Default image'

          console.log('load Home Image src', src)

          return (
            src && (
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
          )
        })} */}
      </div>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 60 seconds before refreshing
