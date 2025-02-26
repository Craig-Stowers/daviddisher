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

export default async function RootLayout(props: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html>
      <body>
        {props.children}
        BELLOW CHILDREN
        {props.modal}
        <div id="modal-root" />
      </body>
    </html>
  )
}
