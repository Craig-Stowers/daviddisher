import { getAlbumData } from '@/lib/fetchAlbum'

import ImageNavigation from './_components/ImageNavigation'
import ImageViewer from './_components/ImageViewer'
import { AlbumProvider } from '@/app/(frontend)/AlbumProvider'
export default async function ImageLayout({ children, params }) {
  const { slug, imageId } = await params

  console.log('IMAGE LAYOUT slug', slug)

  // Fetch album data once (server-side)
  const albumData = await getAlbumData({ slug })

  const imageIdNumber = parseInt(imageId)

  //const images = albumData.images

  return (
    <div className="image-layout">
      <h1>Album: {slug}</h1>
      <AlbumProvider album={{ images: albumData.images, slug, selectedIndex: imageIdNumber }}>
        <ImageNavigation images={albumData.images} slug={slug} imageId={imageIdNumber} />
        <ImageViewer />
      </AlbumProvider>

      {/* <div className="image-container">{children}</div> */}
    </div>
  )
}
