'use client'

import Link from 'next/link'

export default function ImageNavigation({ images, slug, imageId }) {
  const currentIndex = parseInt(imageId)
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1 // Wrap around
  const nextIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0 // Wrap around
  return (
    <div className="image-navigation" style={{ color: 'black', pointerEvents: 'all' }}>
      <h2>
        NAV FOR {slug} \ {imageId}
      </h2>
      <button id="prev">
        <Link href={`artwork/album/${slug}/image/${prevIndex}`} scroll={false}>
          PREV
        </Link>
      </button>
      <button id="next">
        <Link href={`artwork/album/${slug}/image/${nextIndex}`} scroll={false}>
          NEXT
        </Link>
      </button>

      <button>
        <Link href={`artwork/album/${slug}`} scroll={false}>
          BACK TO ALBUM
        </Link>
      </button>
    </div>
  )
}
