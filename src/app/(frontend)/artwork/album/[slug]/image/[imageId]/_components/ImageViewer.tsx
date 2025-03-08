'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAlbum } from '@/app/(frontend)/artwork/album/[slug]/AlbumProvider'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { IoCloseSharp } from 'react-icons/io5'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from './ImageViewer.module.css'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function ImageViewer({}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(null)
  const [showImage, setShowImage] = useState(false)
  const { selectedIndex, setSelectedIndex, album } = useAlbum()
  const [phase, setPhase] = useState('enter')
  const [nextImageReady, setNextImageReady] = useState(false)
  const router = useRouter()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    let timer

    if (currentImageIndex == null && selectedIndex != null) {
      setCurrentImageIndex(selectedIndex)
      timer = setTimeout(() => {
        setShowImage(true)
      }, 300)
      return () => clearTimeout(timer)
    }
    if (selectedIndex !== currentImageIndex) {
      setNextImageReady(false)
      setShowImage(false)
      setPhase('exit')
      timer = setTimeout(() => {
        setPhase('enter')
        setCurrentImageIndex(selectedIndex)
        if (nextImageReady) {
          setShowImage(true)
          //setShowLoader(false)
        }
      }, 300)

      return () => {
        clearTimeout(timer)
      }
    }
    //setShowImage(true)
  }, [selectedIndex, album, currentImageIndex, nextImageReady])

  useEffect(() => {
    setShowLoader(false)
  }, [selectedIndex])

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setShowLoader(true)
    }, 300)
    return () => clearTimeout(loaderTimer)
  }, [currentImageIndex])
  useEffect(() => {
    const nextIndex = selectedIndex < album.images.length - 1 ? selectedIndex + 1 : 0
    const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : album.images.length - 1
    router.prefetch(`/artwork/album/${album.slug}/image/${prevIndex}`)
    router.prefetch(`/artwork/album/${album.slug}/image/${nextIndex}`)

    const img = new window.Image()
    const nextSrc = album.images[nextIndex].url
    img.src = nextSrc

    const img2 = new window.Image()
    const prevSrc = album.images[prevIndex].url
    img2.src = prevSrc
  }, [album.images.length, selectedIndex, album.slug])

  const alt =
    currentImageIndex !== null
      ? album?.images[currentImageIndex].alt || 'Default image'
      : 'Default image'
  const src = currentImageIndex !== null ? album?.images[currentImageIndex].url || null : null
  const nextIndex = selectedIndex < album.images.length - 1 ? selectedIndex + 1 : 0
  const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : album.images.length - 1
  const showViewer = selectedIndex != null

  const title =
    currentImageIndex !== null ? album?.images[selectedIndex]?.title || 'Untitled' : 'Untitled'

  const subtitle =
    currentImageIndex !== null ? album?.images[selectedIndex]?.subtitle || null : null

  // console.log('image in focus', album?.images[currentImageIndex])

  return (
    <div
      className={`${styles.viewerContainer} ${showViewer ? styles.viewerVisible : styles.viewerHidden}`}
    >
      <div className={styles.viewerContent}>
        <div className={styles.imageWrapper}>
          {showLoader && (
            <div className={styles.loadSpinner}>
              <AiOutlineLoading3Quarters />
            </div>
          )}

          <div className={`${styles.imageContainer} ${showImage ? styles.visible : styles.hidden}`}>
            {src && (
              <Image
                src={src}
                layout="fill"
                objectFit="contain"
                alt={alt}
                onLoad={() => {
                  if (currentImageIndex === selectedIndex) {
                    //setShowLoader(false)
                  }
                  console.log('loaded with phase', phase)
                  setNextImageReady(true)
                  if (phase === 'enter') {
                    setShowImage(true)
                  }
                }}
              />
            )}
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
