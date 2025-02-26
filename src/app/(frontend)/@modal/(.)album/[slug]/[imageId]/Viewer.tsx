'use client'

import { useAlbum } from '@/app/(frontend)/AlbumProvider'
import { AlbumDataType } from '@/app/(frontend)/AlbumProvider'

const Viewer = () => {
  const albumData = useAlbum()
  if (!albumData) {
    return <div>Loading...</div>
  }
  const { album }: { album: AlbumDataType } = albumData

  console.log('album', album)

  return (
    <div>
      <h1>Viewer here</h1>
    </div>
  )
}

export default Viewer
