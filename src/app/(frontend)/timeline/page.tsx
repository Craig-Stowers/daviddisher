import React from 'react'
import { getGlobals } from '@/lib/getData'

import styles from './Timeline.module.css'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function TimelinePage() {
  const timelineData = await getGlobals('site-settings')

  const sections = timelineData?.sections

  const renderSubSection = (subSection) => {
    return (
      <div className={styles.subSection} key={subSection.id}>
        <h4>{subSection.title}</h4>

        <ul>
          {subSection.entries &&
            subSection.entries.map((entry) => {
              return (
                <li key={entry.id}>
                  <RichText data={entry.text} />
                </li>
              )
            })}
        </ul>
      </div>
    )
  }

  const renderSection = (section) => {
    return (
      <div className={styles.section} key={section.id}>
        <h2>{section.title}</h2>
        {section['sub-section'] &&
          section['sub-section'].map((subSection) => renderSubSection(subSection))}

        {/* <RichText>{section.content}</RichText> */}
      </div>
    )
  }

  return (
    <div className={`page ${styles.content}`}>
      <div className={styles.sections}>
        <div>{sections && sections.map((section, i) => renderSection(section))}</div>
      </div>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
