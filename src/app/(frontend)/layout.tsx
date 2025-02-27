import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Art by David Disher',
  title: 'David Disher Art',
}

import Link from 'next/link'

// export default async function RootLayout(props: { children: React.ReactNode }) {
//   const { children } = props

//   return (
//     <html lang="en">
//       <body>
//         <main>{children}</main>
//       </body>
//     </html>
//   )
// }

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          <h1>
            <Link href="/">David Disher</Link>
          </h1>
          <ul>
            <li>
              <Link href="/artwork">ARTWORK</Link>
            </li>
            <li>
              <Link href="/biography">BIOGRAPHY</Link>
            </li>
            <li>
              <Link href="/contact">CONTACT</Link>
            </li>
          </ul>
        </nav>
        {props.children}

        <div id="modal-root" />
      </body>
    </html>
  )
}
