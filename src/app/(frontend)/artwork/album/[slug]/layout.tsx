import { AlbumProvider } from './AlbumProvider'
import ImageViewer from './image/[imageId]/_components/ImageViewer'
import { getAlbumData } from '@/lib/getData'
import Gallery from '../../../_gallery/Gallery'
import GalleryGrid from '@/app/(frontend)/_gallery/GalleryGrid'

export default async function AlbumLayout(props) {
  const newParams = await props.params

  const album = (await getAlbumData({ slug: newParams.slug })) || null

  return (
    <div className="page">
      <h2>{album.name}</h2>
      <Gallery
        columns={3}
        imageWidth={380}
        // scroll={false}
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
