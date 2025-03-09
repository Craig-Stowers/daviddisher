import React from 'react'
import { getTimelineData } from '@/lib/getData'
import Image from 'next/image'
import styles from './Biography.module.css'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function TimelinePage() {
  const timelineData = await getTimelineData()

  console.log('timelinedata', timelineData)

  return (
    <div className={`page ${styles.Biography}`}>
      <h2>TIMELINE</h2>
      <div className={styles.content}></div>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
