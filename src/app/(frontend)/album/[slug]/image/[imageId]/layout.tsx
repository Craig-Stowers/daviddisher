import { getAlbumData } from '@/lib/fetchAlbum'

import ImageNavigation from './_components/ImageNavigation'
import ImageViewer from './_components/ImageViewer'
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
      <ImageNavigation images={albumData.images} slug={slug} imageId={imageIdNumber} />
      <ImageViewer image={albumData.images[imageIdNumber]} />
      {/* <div className="image-container">{children}</div> */}
    </div>
  )
}
