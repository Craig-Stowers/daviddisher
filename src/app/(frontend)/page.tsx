import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'

import configPromise from '@payload-config'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const media = await payload.find({
    collection: 'media',
    depth: 1,
    limit: 12,
    // page: sanitizedPageNumber,
    overrideAccess: false,
  })

  // console.log('media', media)

  return (
    <div className="home">
      <div className="content">
        <h2>TESTING NEW PAGE</h2>
        {/* <img src="/api/media/file/ALBOTT.jpg" /> */}

        {media.docs.map((item, i) => {
          console.log('item', item)
          return (
            <Image
              key={item.id}
              src={item.url}
              width={item.width}
              height={item.height}
              alt={item.alt}
            />
          )
        })}

        {/* <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        {!user && <h1>Welcome to your new project.</h1>}
        {user && <h1>Welcome back, {user.email}</h1>}
        <div className="links">
          <a
            className="admin"
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            target="_blank"
          >
            Go to admin panel
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Update this page by editing</p>
        <a className="codeLink" href={fileURL}>
          <code>app/(frontend)/page.tsx</code>
        </a>
         */}
      </div>
    </div>
  )
}
