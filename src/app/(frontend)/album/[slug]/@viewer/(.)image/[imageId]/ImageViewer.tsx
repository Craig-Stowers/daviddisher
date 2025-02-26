'use client'

import { useAlbum } from '@/app/(frontend)/AlbumProvider'
import Link from 'next/link'
import Image from 'next/image'

const ImageViewer = ({ index, slug }) => {
  const { images } = useAlbum()

  const nextIndex = index + 1 < images.length ? index + 1 : 0
  const prevIndex = index - 1 >= 0 ? index - 1 : images.length - 1

  const imageSrc = images[index].url
  const alt = images[index].alt

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 3,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          padding: '40px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',

            position: 'relative',
          }}
        >
          <Image
            src={imageSrc}
            layout="fill"
            objectFit="contain"
            alt={alt}
            quality={80}
            style={{ opacity: 0.8 }}
            // loading="lazy"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '50%', right: '50%' }}>
        <Link href={`/album/${slug}`} scroll={false}>
          <button>CLOSE</button>
        </Link>
        <Link href={`/album/${slug}/image/${prevIndex}`} scroll={false}>
          <button>PREV</button>
        </Link>
        <Link href={`/album/${slug}/image/${nextIndex}`} scroll={false}>
          <button>NEXT</button>
        </Link>
      </div>

      <h4>
        VIEW HERE {index}, {imageSrc}
      </h4>
    </div>
  )
}

export default ImageViewer
