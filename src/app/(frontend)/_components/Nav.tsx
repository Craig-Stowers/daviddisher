'use client'

import Link from 'next/link'
import styles from './Nav.module.css'
import { usePathname } from 'next/navigation'
const Nav = () => {
  const pathname = usePathname()

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <h1 className={styles.logo}>
          <Link href="/">David Disher</Link>
        </h1>
        <ul>
          <li className={pathname.startsWith('/artwork') ? styles.active : ''}>
            <Link href="/artwork">Artwork</Link>
          </li>
          <li className={pathname.startsWith('/about') ? styles.active : ''}>
            <Link href="/about">About</Link>
          </li>
          <li className={pathname.startsWith('/timeline') ? styles.active : ''}>
            <Link href="/timeline">Timeline</Link>
          </li>
          <li className={pathname.startsWith('/contact') ? styles.active : ''}>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Nav
