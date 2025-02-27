'use client'
import Image from 'next/image'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ImageViewer({}) {
  // const { images, selectedIndex } = useAlbum()
  // const [showIndex, setShowIndex] = useState(selectedIndex)
  // const [oldIndex, setOldIndex] = useState(() => {
  //   console.log('SET STATE')
  //   return selectedIndex
  // })
  // const [switchImage, setSwitchImage] = useState(false)

  const [currentImageIndex, setCurrentImageIndex] = useState(null)
  const [showImage, setShowImage] = useState(false)

  const { selectedIndex, setSelectedIndex, album } = useAlbum()

  useEffect(() => {
    let timer
    if (currentImageIndex == null && selectedIndex != null) {
      setCurrentImageIndex(selectedIndex)
      timer = setTimeout(() => {
        console.log('SHOW IT!')
        setShowImage(true)
      }, 260)

      return () => {
        clearTimeout(timer)
      }
    }
    if (selectedIndex !== currentImageIndex) {
      setShowImage(false)
      timer = setTimeout(() => {
        setCurrentImageIndex(selectedIndex)
        setShowImage(true)
      }, 260)

      return () => {
        clearTimeout(timer)
      }
      // setCurrentImageIndex(selectedIndex)
    }

    setShowImage(true)
  }, [selectedIndex, album, currentImageIndex])

  useEffect(() => {
    console.log('IMAGE VIEWER album changed', album)
  }, [album])

  const alt =
    currentImageIndex !== null
      ? album?.images[currentImageIndex].alt || 'Default image'
      : 'Default image'
  const src =
    currentImageIndex !== null
      ? album?.images[currentImageIndex].url || '/fallback.jpg'
      : '/fallback.jpg'

  const nextIndex = selectedIndex < album.images.length - 1 ? selectedIndex + 1 : 0
  const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : album.images.length - 1

  const showViewer = selectedIndex != null

  console.log('currentImageIndex', currentImageIndex, album, showImage)

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        color: 'black',
        transition: 'opacity 0.25s',
        backgroundColor: 'rgba(0,0,0,0.8)',
        pointerEvents: showViewer ? 'all' : 'none',
        opacity: showViewer ? 1 : 0,
      }}
    >
      IMAGE VIEWER HERE: {selectedIndex}
      <div
        style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          opacity: showImage ? 1 : 0,
          transition: 'opacity 0.25s',
        }}
      >
        <Image src={src} layout="fill" objectFit="contain" alt={alt} />
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, color: 'white' }}>
        <Link href={`/album/${album.slug}/image/${prevIndex}`}>PREV IMAGE</Link>
        <Link href={`/album/${album.slug}/image/${nextIndex}`}>NEXT IMAGE</Link>
        <Link
          href={`/album/${album.slug}`}
          onClick={() => {
            setShowImage(false)
            setSelectedIndex(null)
          }}
        >
          CLOSE
        </Link>
      </div>
    </div>
  )
}
