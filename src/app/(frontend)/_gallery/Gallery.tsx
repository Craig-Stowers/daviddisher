'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Gallery.module.css'
import { useAlbum } from '../AlbumProvider'

export default function Gallery({ gallerySlug }: { gallerySlug: string }) {
  const { images, pendingImage } = useAlbum()
  const thumbRefs = useRef<(HTMLAnchorElement | null)[]>([]) // Store refs for Links

  console.log('album with pending', pendingImage)

  useEffect(() => {
    if (pendingImage !== null) {
      // Find the matching <Link> in the DOM and trigger a click
      const linkToClick = thumbRefs.current[pendingImage] // Assuming `pendingImage` is an index
      if (linkToClick) {
        linkToClick.click() // Simulate user clicking the link
      }
    }
  }, [pendingImage])

  return (
    <div>
      <div className={styles.gallery} style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images?.map((item, i) => {
          if (typeof item === 'string') {
            return <p key={item}>Loading image...</p>
          }

          const src = item.url || '/fallback.jpg'
          const alt = item.alt || 'Default image'

          return (
            <div className={styles.cardContainer} key={item.id}>
              <div className={styles.card}>
                <Link
                  href={`/album/${gallerySlug}/image/${i}`}
                  passHref
                  ref={(el) => (thumbRefs.current[i] = el)} // Store the Link ref
                >
                  <Image
                    src={src}
                    layout="fill"
                    objectFit="cover"
                    alt={alt}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,..." // Optional placeholder
                    quality={50}
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
