import { AlbumProvider } from './AlbumProvider'
import ImageViewer from './image/[imageId]/_components/ImageViewer'
import { getAlbumData } from '@/lib/getData'
import Gallery from '../../../_gallery/Gallery'
import GalleryGrid from '@/app/(frontend)/_gallery/GalleryGrid'

import { preloadImages } from '@/lib/imageCache'

export default async function AlbumLayout(props) {
  const newParams = await props.params

  const album = (await getAlbumData({ slug: newParams.slug })) || null

  // const preloadUrls = album.images
  //   .map((image) => {
  //     // ✅ Only return `image.url` if `image` is an object and has `url`
  //     if (typeof image === 'object' && 'url' in image) {
  //       return image.url
  //     }
  //     return null // Fallback for invalid cases
  //   })
  //   .filter((url): url is string => url !== null) // ✅ Remove null values

  // await preloadImages(preloadUrls)

  const isPreRender = typeof window === 'undefined'

  console.log('layout isPreRender', isPreRender)

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
        <ImageViewer isPreRender={isPreRender} />
      </AlbumProvider>
    </div>
  )
}
