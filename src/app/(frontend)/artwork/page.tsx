import React from 'react'

import { getAllAlbums } from '@/lib/getData'

import GalleryServer from '@/app/(frontend)/_gallery/GalleryServer'
export default async function Artwork() {
  const albums = await getAllAlbums()
  const images = albums.map((album) => album.coverImage)
  const slugs = albums.map((album) => album.slug)
  const titles = albums.map((album) => album.name)

  console.log('alltitles', titles)

  return (
    <div className="page artwork">
      <h2>ALBUMS</h2>
      {albums.length === 0 && <p>No albums found</p>}
      {albums.length > 0 && (
        <GalleryServer
          images={images}
          getUrlFromIndex={(index) => {
            return `artwork/album/${slugs[index]}`
          }}
          getTitleFromIndex={(index) => {
            console.log('fetched title', index, titles[index])
            return titles[index]
          }}
        />
      )}
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
