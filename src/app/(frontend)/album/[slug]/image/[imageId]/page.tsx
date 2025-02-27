'use client'

import { useEffect } from 'react'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'
import { useParams } from 'next/navigation'
export default function ImagePage({}) {
  const { setSelectedIndex } = useAlbum()

  const params = useParams() // Get the route parameters

  const imageId = params.imageId
  const imageIdNumber = Number(imageId)

  console.log('front received imageIdNumber', imageIdNumber)

  useEffect(() => {
    setSelectedIndex(imageIdNumber) // Update provider when URL changes
  }, [imageIdNumber, setSelectedIndex])

  return null // This page does nothing visually
}
