'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'
import Link from 'next/link'
import Image from 'next/image'

const ImageViewer = ({ index, slug }) => {
  const { images } = useAlbum()
  const [fadeIn, setFadeIn] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const router = useRouter()
  const nextIndex = index + 1 < images.length ? index + 1 : 0
  const prevIndex = index - 1 >= 0 ? index - 1 : images.length - 1

  const imageSrc = images[index].url
  const alt = images[index].alt

  useEffect(() => {
    if (!loaded) return
    // setTimeout(() => {
    setFadeIn(true)
    // }, 10)
  }, [loaded])

  useEffect(() => {
    if (nextIndex) router.prefetch(`/album/currentAlbum/image/${nextIndex}`)
    if (prevIndex) router.prefetch(`/album/currentAlbum/image/${prevIndex}`)
  }, [index])

  const nextImage = () => {
    setFadeIn(false)

    setTimeout(() => {
      router.push(`/album/${slug}/image/${nextIndex}`)
    }, 300)
    //router.push(`/album/${slug}/image/${nextIndex}`)
  }

  const previousImage = () => {
    setFadeIn(false)

    setTimeout(() => {
      router.push(`/album/${slug}/image/${prevIndex}`)
    }, 300)
    //router.push(`/album/${slug}/image/${nextIndex}`)
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.89)',
        zIndex: 3,
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          padding: '40px 100px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            transition: 'opacity 0.4s',
            width: '100%',
            height: 'calc(100% - 90px)',
            opacity: fadeIn ? 1 : 0,

            position: 'relative',
          }}
        >
          <Image
            src={imageSrc}
            layout="fill"
            objectFit="contain"
            alt={alt}
            quality={90}
            onLoad={() => {
              setLoaded(true)
            }}
            // loading="lazy"
            // sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        </div>
      </div>

      <div style={{ position: 'absolute', top: '90%', right: '50%' }}>
        <Link href={`/album/${slug}`} scroll={false}>
          <button>CLOSE</button>
        </Link>
        <button onClick={previousImage}>PREV</button>
        {/* <Link href={`/album/${slug}/image/${nextIndex}`} scroll={false}> */}
        <button onClick={nextImage}>NEXT</button>
        {/* </Link> */}
      </div>
    </div>
  )
}

export default ImageViewer
