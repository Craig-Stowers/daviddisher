'use client'
import Image from 'next/image'
import { useAlbum } from '@/app/(frontend)/artwork/album/[slug]/AlbumProvider'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './ImageViewer.module.css'

export default function ImageViewer({}) {
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
      return () => clearTimeout(timer)
    }
    if (selectedIndex !== currentImageIndex) {
      setShowImage(false)
      timer = setTimeout(() => {
        setCurrentImageIndex(selectedIndex)
        setShowImage(true)
      }, 340)
      return () => clearTimeout(timer)
    }
    setShowImage(true)
  }, [selectedIndex, album, currentImageIndex])

  useEffect(() => {}, [album])

  const alt =
    currentImageIndex !== null
      ? album?.images[currentImageIndex].alt || 'Default image'
      : 'Default image'
  const src = currentImageIndex !== null ? album?.images[currentImageIndex].url || null : null
  const nextIndex = selectedIndex < album.images.length - 1 ? selectedIndex + 1 : 0
  const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : album.images.length - 1
  const showViewer = selectedIndex != null

  const title =
    currentImageIndex !== null ? album?.images[currentImageIndex].title || 'Untitled' : 'Untitled'

  const subtitle =
    currentImageIndex !== null ? album?.images[currentImageIndex].subtitle || null : null

  console.log('image in focus', album?.images[currentImageIndex])

  return (
    <div
      className={`${styles.viewerContainer} ${showViewer ? styles.viewerVisible : styles.viewerHidden}`}
    >
      <div className={styles.viewerContent}>
        <div className={styles.imageWrapper}>
          <div className={`${styles.imageContainer} ${showImage ? styles.visible : styles.hidden}`}>
            {src && <Image src={src} layout="fill" objectFit="contain" alt={alt} />}
          </div>
          <div className={styles.prevButton}>
            <Link href={`/artwork/album/${album.slug}/image/${prevIndex}`}>
              <RiArrowLeftSLine />
            </Link>
          </div>
          <div className={styles.nextButton}>
            <Link href={`/artwork/album/${album.slug}/image/${nextIndex}`}>
              <RiArrowRightSLine />
            </Link>
          </div>
        </div>
        <div className={styles.closeButton}>
          <Link
            href={`/artwork/album/${album.slug}`}
            onClick={() => {
              setShowImage(false)
              setSelectedIndex(null)
            }}
          >
            <IoCloseSharp />
          </Link>
        </div>
        <div className={styles.caption}>
          <p className={styles.title}>{title}</p>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </div>
  )
}
