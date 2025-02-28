'use client'

import Link from 'next/link'
import styles from './Nav.module.css'
import { usePathname } from 'next/navigation'
const Nav = () => {
  const pathname = usePathname()

  return (
    <nav className={styles.nav}>
      <h1>
        <Link href="/">David Disher</Link>
      </h1>
      <ul>
        <li className={pathname.startsWith('/artwork') ? styles.active : ''}>
          <Link href="/artwork">ARTWORK</Link>
        </li>
        <li className={pathname.startsWith('/biography') ? styles.active : ''}>
          <Link href="/biography">BIOGRAPHY</Link>
        </li>
        <li className={pathname.startsWith('/contact') ? styles.active : ''}>
          <Link href="/contact">CONTACT</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
