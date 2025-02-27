'use client'
import Image from 'next/image'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'
import { RiArrowLeftSLine } from 'react-icons/ri'
import { RiArrowRightSLine } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'

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
        setShowImage(true)
      }, 340)

      return () => {
        clearTimeout(timer)
      }
    }
    if (selectedIndex !== currentImageIndex) {
      setShowImage(false)
      timer = setTimeout(() => {
        setCurrentImageIndex(selectedIndex)
        setShowImage(true)
      }, 340)

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

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        color: '#dfdfdf',
        transition: 'opacity 0.25s',
        backgroundColor: 'rgba(0,0,0,0.88)',
        pointerEvents: showViewer ? 'all' : 'none',
        opacity: showViewer ? 1 : 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'calc(100% - 80px)',
          height: 'calc(100% - 80px)',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 20px)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'relative',
              height: '100%',

              opacity: showImage ? 1 : 0,
              transition: 'opacity 0.25s',
            }}
          >
            <Image src={src} layout="fill" objectFit="contain" alt={alt} />
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translate(0%, -50%)',
              left: 0,

              fontSize: '3.5rem',
            }}
          >
            <Link href={`/album/${album.slug}/image/${prevIndex}`}>
              <RiArrowLeftSLine />
            </Link>
          </div>
          <div
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translate(0%, -50%)',
              right: 0,

              fontSize: '3.5rem',
            }}
          >
            <Link href={`/album/${album.slug}/image/${nextIndex}`}>
              <RiArrowRightSLine />
            </Link>
          </div>
        </div>
        <div style={{ position: 'absolute', top: 0, right: 0, fontSize: '2.5rem' }}>
          <Link
            href={`/album/${album.slug}`}
            onClick={() => {
              setShowImage(false)
              setSelectedIndex(null)
            }}
          >
            <IoCloseSharp />
          </Link>
        </div>

        <div
          style={{
            height: '50px',

            fontSize: 14,
            fontWeight: 400,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <p style={{ margin: 0, padding: 0, lineHeight: 20 }}>{alt}</p>
        </div>
      </div>
    </div>
  )
}
