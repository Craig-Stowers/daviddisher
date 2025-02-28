import React from 'react'
import './styles.css'
import Nav from './_components/Nav'

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
        <Nav />

        {props.children}

        <div id="modal-root" />
      </body>
    </html>
  )
}
