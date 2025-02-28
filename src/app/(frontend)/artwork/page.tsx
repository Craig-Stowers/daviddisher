import React from 'react'

import { getAllAlbums } from '@/lib/fetchAlbum'

import GalleryServer from '@/app/(frontend)/_gallery/GalleryServer'
export default async function Artwork() {
  const albums = await getAllAlbums()

  const images = albums.map((album) => album.coverImage)
  const slugs = albums.map((album) => album.slug)

  return (
    <div className="artwork">
      <div className="content">
        <h2>albums</h2>
        <GalleryServer
          images={images}
          getUrlFromIndex={(index) => {
            return `artwork/album/${slugs[index]}`
          }}
        />
      </div>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
