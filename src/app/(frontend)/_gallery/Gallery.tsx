import Image from 'next/image'

// Define type for image items
import type { StaticImageData } from 'next/image'

interface ImageItem {
  id: string
  url?: string
  width?: number
  height?: number
  alt?: string
}

export default async function Gallery({ images }: { images: ImageItem[] }) {
  return (
    <div>
      {images?.map((item) => {
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
      })}
    </div>
  )
}
