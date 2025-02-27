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

  const { selectedIndex, setSelectedIndex, album } = useAlbum()

  useEffect(() => {
    console.log('IMAGE VIEWER MOUNTED')
    return () => {
      console.log('IMAGE VIEWER UNMOUNTED')
    }
  }, [])

  useEffect(() => {
    console.log('IMAGE VIEWER album changed', album)
  }, [album])

  if (selectedIndex == null) {
    return null
  }

  const src = album.images[selectedIndex].url || '/fallback.jpg'
  const alt = album.images[selectedIndex].alt || 'Default image'

  const nextIndex = selectedIndex < album.images.length - 1 ? selectedIndex + 1 : 0
  const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : album.images.length - 1

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        color: 'black',
        transition: 'opacity 0.5s',
        backgroundColor: 'rgba(255,255,255,0.8)',
        pointerEvents: 'all',
      }}
    >
      IMAGE VIEWER HERE: {selectedIndex}
      <Image src={src} layout="fill" objectFit="contain" alt={alt} />
      <div style={{ position: 'absolute', bottom: 0, left: 0 }}>
        <Link href={`/album/${album.slug}/image/${prevIndex}`}>PREV IMAGE</Link>
        <Link href={`/album/${album.slug}/image/${nextIndex}`}>NEXT IMAGE</Link>
        <Link href={`/album/${album.slug}`} onClick={() => setSelectedIndex(null)}>
          CLOSE
        </Link>
      </div>
    </div>
  )
}
