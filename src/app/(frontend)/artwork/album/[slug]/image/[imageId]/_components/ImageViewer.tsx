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

export default function ImageViewer({ isPreRender }) {
  const { selectedIndex, setSelectedIndex, album } = useAlbum()

  const [showLoader, setShowLoader] = useState([])

  // useEffect(() => {
  //   const nextIndex = selectedIndex < album.images.length - 1 ? selectedIndex + 1 : 0
  //   const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : album.images.length - 1
  //   router.prefetch(`/artwork/album/${album.slug}/image/${prevIndex}`)
  //   router.prefetch(`/artwork/album/${album.slug}/image/${nextIndex}`)
  //prefetching liek above might only render the basic page and not image due to all the event listeners. Future update to instantly render a opacity 0 image could be the solution.

  //this method of prefetching not working because Next delivers optimsed versions and not always the raw image src.
  // const img = new window.Image()
  // const nextSrc = album.images[nextIndex].url
  // img.src = nextSrc

  // const img2 = new window.Image()
  // const prevSrc = album.images[prevIndex].url
  // img2.src = prevSrc
  // }, [album.images.length, selectedIndex, album.slug])

  const images = album?.images

  // if (images.length === 2) {
  //   images = [...images, ...images]
  // }

  const nextIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0
  const prevIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1

  const title = selectedIndex !== null ? images[selectedIndex]?.title || 'Untitled' : 'Untitled'

  const subtitle = selectedIndex !== null ? images[selectedIndex]?.subtitle || null : null

  const handleImageLoaded = (index) => {
    setShowLoader((prev) => {
      const showLoaderCopy = [...prev]
      showLoaderCopy[index] = true
      return showLoaderCopy
    })
  }

  return (
    <div
      className={`${styles.viewerContainer} ${selectedIndex !== null ? styles.viewerVisible : styles.viewerHidden}`}
    >
      <div className={styles.viewerContent}>
        <div className={styles.imageWrapper}>
          {selectedIndex !== null &&
            images &&
            images.map((image, i) => {
              const n = images.length
              const directDist = Math.abs(i - selectedIndex)
              const wrappedDist = n - directDist
              const circularDist = Math.min(directDist, wrappedDist)

              // If circularDist <= 2, it's within range to the left or right
              const isInRange = circularDist <= 2
              const alt = images[i].alt || 'Default image'

              let leftPercent = 50
              let scale = 1

              if (i === prevIndex) {
                leftPercent = 30
                scale = 0.7
              }

              if (i === nextIndex) {
                leftPercent = 70
                scale = 0.7
              }

              return (
                <div
                  className={`${styles.imageContainer}`}
                  style={{
                    opacity: i === selectedIndex ? 1 : 0,
                    left: `${leftPercent}%`,
                    // transform: `translateX(-50%) scale(${scale})`,
                    zIndex: i === selectedIndex ? 1 : 0,
                  }}
                  key={i}
                >
                  {selectedIndex !== null && image.url && isInRange && (
                    <Image
                      src={image.url}
                      fill
                      style={{ objectFit: 'contain' }}
                      alt={alt}
                      quality={40}
                      priority={true}
                      onLoad={() => {
                        handleImageLoaded(i)
                      }}
                      sizes="40vw"
                    />
                  )}
                  {!showLoader[i] && (
                    <div className={styles.loadSpinner}>
                      <AiOutlineLoading3Quarters />
                    </div>
                  )}
                </div>
              )
            })}

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
              setSelectedIndex(null)
            }}
          >
            <IoCloseSharp />
          </Link>
        </div>
        {selectedIndex !== null && (
          <div className={styles.caption}>
            <p className={styles.title}>{title}</p>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  )
}
