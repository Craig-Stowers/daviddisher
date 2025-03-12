import Image from 'next/image'
import Link from 'next/link'
import styles from './Gallery.module.css'

// Define type for image items
import type { StaticImageData } from 'next/image'

export default function GalleryServer({
  images,
  getUrlFromIndex,
  getTitleFromIndex,
  columns = 4,
  imageWidth = 320,
}) {
  const columnsArrays = Array.from({ length: columns }, () => [])
  const columnHeights = Array.from({ length: columns }, () => 0)

  const imagesCopy = images.map((image, i) => {
    const scale = imageWidth / image.width
    const scaledHeight = image.height * scale
    const scaledWidth = image.width * scale

    return { ...image, scaledWidth, scaledHeight, index: i }
  })
  imagesCopy.forEach((image, i) => {
    const shorestColumn = columnHeights.indexOf(Math.min(...columnHeights))

    columnHeights[shorestColumn] += image.scaledHeight

    columnsArrays[shorestColumn].push(image)
  })

  return (
    <div className={styles.gallery2} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {columnsArrays.map((column, i) => {
        return (
          <div key={i} style={{ flex: 1 }}>
            {column.map((item, i) => {
              // If item is a string, it's an ID, so we can't use it directly
              if (typeof item === 'string') {
                return <p key={i}>Loading image...</p> // Handle missing data gracefully
              }

              // Ensure src is always a valid string
              const src: StaticImageData | string = item.url || null
              // const width = item.width ?? 100 // Default width if missing
              // const height = item.height ?? 100 // Default height if missing
              const alt = item.alt || 'Default image'

              return (
                <div className={styles.galleryItem} key={item.id + `_${i}`}>
                  <div className={styles.galleryItemPadding}>
                    <div
                      className={styles.cardContainerStatic}

                      // style={{ marginBottom: '1rem' }}
                    >
                      <Link href={getUrlFromIndex(item.index)} passHref scroll={false}>
                        <div className={styles.card}>
                          {/* <Link className="card" href={`/album/${gallerySlug}/image/${i}`} passHref> */}

                          <div style={{ position: 'relative', width: '100%' }}>
                            <Image
                              src={src}
                              style={{ width: '100%' }}
                              width={0}
                              height={0}
                              // width={item.scaledWidth}
                              // height={item.scaledHeight}
                              alt={alt}
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,..." // Optional placeholder
                              quality={50}
                              // loading="lazy"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            />
                          </div>
                        </div>
                      </Link>

                      <div className={styles.cardLabel}>
                        <div className={styles.cardLabelText}>{getTitleFromIndex(item.index)}</div>
                      </div>
                      {/* <div className={styles.cardHoverContainer}>
                    <div className={styles.cardText}>{getTitleFromIndex(item.index)}</div>
                  </div> */}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
