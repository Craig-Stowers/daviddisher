import React from 'react'
import { getGlobals } from '@/lib/getData'
import Image from 'next/image'
import styles from './Biography.module.css'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function BioPage() {
  const siteSettings = await getGlobals('site-settings')

  const portrait = siteSettings.portrait
  console.log('siteSettings', siteSettings)

  return (
    <div className={`page ${styles.Biography}`}>
      <div className={styles.content}>
        <div className={styles.portraitContainer}>
          <div
            className={styles.portrait}
            style={{ width: portrait.width * 0.7, height: portrait.height * 0.7 }}
          >
            <Image
              src={portrait.url}
              objectFit="cover"
              alt="douch"
              layout={'fill'}
              objectPosition={'50% 33%'}
            />
          </div>
          <div className={styles.portraitInfo}>
            <p className={styles.title}>{portrait.title}</p>
            <p className={styles.subtitle}>{portrait.subtitle}</p>
          </div>
        </div>

        <div className={styles.bio}>
          <RichText data={siteSettings.bio} />
        </div>
      </div>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
