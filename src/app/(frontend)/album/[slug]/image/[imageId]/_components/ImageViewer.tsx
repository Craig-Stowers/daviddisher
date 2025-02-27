'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'

export default function ImageViewer({ image }) {
  const [oldUrl, setOldUrl] = useState(null)

  return (
    <div style={{ color: 'black' }}>
      <p>ImageViewer - {image.url}</p>
      <Image src={image.url} layout="fill" objectFit="contain" alt={image.alt} />
    </div>
  )
}
