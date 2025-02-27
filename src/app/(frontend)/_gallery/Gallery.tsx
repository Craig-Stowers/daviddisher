'use client'

import Image from 'next/image'
import Link from 'next/link'
import styles from './Gallery.module.css'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
// Define type for image items
import type { StaticImageData } from 'next/image'
import { useAlbum } from '../AlbumProvider'

export default function Gallery({ gallerySlug }: { gallerySlug: string }) {
  const { images, pendingImage } = useAlbum()
  const router = useRouter()

  console.log('album with pending', pendingImage)

  useEffect(() => {
    if (pendingImage !== null) {
      // Navigate to intercepted route to load the viewer
      console.log('redirect now to', `/album/${gallerySlug}/image/${pendingImage}`)
      //router.replace(`/album/${gallerySlug}/image/${pendingImage}`)
      //router.push(`/album/${gallerySlug}/image/${pendingImage}`, { shallow: true })
    }
  }, [pendingImage, router, gallerySlug])

  // const { setAlbum } = useAlbum()

  // useEffect(() => {
  //   setAlbum({ slug: gallerySlug, images, index: 0 })
  // }, [gallerySlug, images, setAlbum])

  return (
    <div>
      <div className={styles.gallery} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images?.map((item, i) => {
          // If item is a string, it's an ID, so we can't use it directly
          if (typeof item === 'string') {
            return <p key={item}>Loading image...</p> // Handle missing data gracefully
          }

          // Ensure src is always a valid string
          const src: StaticImageData | string = item.url || '/fallback.jpg'
          // const width = item.width ?? 100 // Default width if missing
          // const height = item.height ?? 100 // Default height if missing
          const alt = item.alt || 'Default image'

          return (
            <div
              className={styles.cardContainer}
              key={item.id}
              // onMouseEnter={() => router.prefetch(`/album/${gallerySlug}/image/${i}`)}
            >
              <div className={styles.card}>
                <Link className="card" href={`/album/${gallerySlug}/image/${i}`} passHref>
                  <Image
                    src={src}
                    // width={width}
                    // height={height}
                    // width={180}
                    // height={180}
                    layout="fill"
                    objectFit="cover"
                    alt={alt}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,..." // Optional placeholder
                    quality={50}
                    // loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                </Link>
              </div>
              <div className={styles.cardText}>
                <p>{alt}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
