import Image from 'next/image'
import Link from 'next/link'
import styles from './GalleryGrid.module.css'

// Define type for image items
import type { StaticImageData } from 'next/image'

export default function GalleryGrid({
  images,
  getUrlFromIndex,
  getTitleFromIndex,
  scroll = true,
  imageWidth,
  imageHeight,
}) {
  return (
    <div className={styles.gallery} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {images?.map((item, i) => {
        // If item is a string, it's an ID, so we can't use it directly
        if (typeof item === 'string') {
          return <p key={i}>Loading image...</p> // Handle missing data gracefully
        }

        // Ensure src is always a valid string
        const src: StaticImageData | string = item.url || null
        // const width = item.width ?? 100 // Default width if missing
        // const height = item.height ?? 100 // Default height if missing
        const alt = item.alt || 'Default image'

        const containerStyle = {
          ...(imageWidth ? { width: imageWidth } : {}),
          ...(imageHeight ? { height: imageHeight } : {}),
        }

        return (
          <div
            className={`${styles.cardContainer} ${styles.gridCardContainer}`}
            key={item.id + `_${i}`}
            style={containerStyle}
          >
            <Link href={getUrlFromIndex(i)} passHref scroll={scroll}>
              <div className={styles.card}>
                {/* <Link className="card" href={`/album/${gallerySlug}/image/${i}`} passHref> */}

                <Image
                  src={src}
                  fill
                  style={{ objectFit: 'cover' }}
                  // width={width}
                  // height={height}
                  alt={alt}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,..." // Optional placeholder
                  quality={50}
                  // loading="lazy"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
            </Link>
            <div className={styles.cardHoverContainer}>
              <div className={styles.cardText}>{getTitleFromIndex(i)}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
