'use client'

// import Image from 'next/image'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'

import { useEffect, useState } from 'react'

export default function ImageViewer({}) {
  const [oldUrl, setOldUrl] = useState(null)

  const { images, selectedIndex } = useAlbum()

  useEffect(() => {
    if (!images || !images[selectedIndex]) return
    console.log('ImageViewer - useEffect', selectedIndex, oldUrl)
    setOldUrl(images[selectedIndex].url)
  }, [selectedIndex, images, oldUrl])

  return (
    <div style={{ color: 'black' }}>
      <p>ImageViewer - {selectedIndex}</p>
      {/* <Image src={image.url} layout="fill" objectFit="contain" alt={image.alt} /> */}
    </div>
  )
}
