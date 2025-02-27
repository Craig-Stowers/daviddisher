'use client'

import Image from 'next/image'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'

import { useEffect, useState } from 'react'

export default function ImageViewer({}) {
  const [oldUrl, setOldUrl] = useState(null)

  const { images, selectedIndex } = useAlbum()

  const src = images[selectedIndex].url || '/fallback.jpg'
  const alt = images[selectedIndex].alt || 'Default image'

  useEffect(() => {
    if (!images || !images[selectedIndex]) return
    console.log('ImageViewer - useEffect', selectedIndex, oldUrl)
    setOldUrl(images[selectedIndex].url)
  }, [selectedIndex, images, oldUrl])

  return (
    <div style={{ color: 'black' }}>
      <Image src={src} layout="fill" objectFit="contain" alt={alt} />
    </div>
  )
}
