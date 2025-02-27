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
    <div
      className="image-layout"
      style={{
        color: 'black',
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: '100%',
        width: '100%',
        top: 0,
        position: 'fixed',
      }}
    >
      <AlbumProvider album={{ images: albumData.images, slug, selectedIndex: imageIdNumber }}>
        <ImageViewer />
        <div style={{ position: 'absolute' }}>
          <ImageNavigation images={albumData.images} slug={slug} imageId={imageIdNumber} />
        </div>
      </AlbumProvider>

      {/* <div className="image-container">{children}</div> */}
    </div>
  )
}
