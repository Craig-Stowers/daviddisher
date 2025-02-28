import { AlbumProvider } from './AlbumProvider'
import ImageViewer from './image/[imageId]/_components/ImageViewer'
import { getAlbumData } from '@/lib/getData'
import GalleryServer from '../../../_gallery/GalleryServer'

export default async function AlbumLayout(props) {
  const newParams = await props.params

  const album = (await getAlbumData({ slug: newParams.slug })) || null

  console.log('album', album)

  return (
    <div className="page">
      <h2>{album.name}</h2>
      <GalleryServer
        images={album.images}
        getUrlFromIndex={(index) => {
          return `/artwork/album/${newParams.slug}/image/${index}`
        }}
        getTitleFromIndex={(index) => {
          const title = typeof album?.images[index] === 'object' ? album.images[index].title : ''
          return title
        }}
      />

      <AlbumProvider albumData={album}>
        {props.children}
        <ImageViewer />
      </AlbumProvider>
    </div>
  )
}
