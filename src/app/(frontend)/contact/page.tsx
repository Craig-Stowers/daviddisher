import React from 'react'
import styles from './Contact.module.css'
import { FaFacebook } from 'react-icons/fa'

export default async function BioPage() {
  return (
    <div className="page biopage">
      <ul className={styles.contactList}>
        <li>
          <div className={styles.listLabel}>Email:</div>
          <div className={styles.listEntry}>
            <a href="mailto:davidadisher@gmail.com">davidadisher@gmail.com</a>
          </div>
        </li>
        <li>
          <div className={styles.listLabel}>Phone:</div>
          <div className={styles.listEntry}>
            <a href="tel:+61415676349">0415 676 349</a>
          </div>
        </li>
        <li>
          <div className={styles.listLabel}>Social Media:</div>
          <div className={`${styles.listEntry} ${styles.socialIcon}`}>
            <a
              href="https://www.facebook.com/profile.php?id=100027589553958"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebook />
            </a>
          </div>
        </li>
      </ul>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
