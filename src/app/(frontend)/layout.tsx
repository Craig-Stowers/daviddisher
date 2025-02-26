import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Art by David Disher',
  title: 'David Disher Art',
}

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
          <h1>David Disher</h1>
          <ul>
            <li>Artwork</li>
            <li>Biography</li>
            <li>Links</li>
          </ul>
        </nav>
        {props.children}

        <div id="modal-root" />
      </body>
    </html>
  )
}
