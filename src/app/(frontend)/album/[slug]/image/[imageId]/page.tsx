import ImageViewer from './_components/ImageViewer'
import { getAlbumData } from '@/lib/fetchAlbum'

export default async function ImagePage({ params }) {
  const { slug, imageId } = await params

  // Fetch album data server-side
  const albumData = await getAlbumData({ slug })
  const images = albumData.images
  const currentImage = images[parseInt(imageId)]

  return <ImageViewer key={'viewer'} image={currentImage} />
}
