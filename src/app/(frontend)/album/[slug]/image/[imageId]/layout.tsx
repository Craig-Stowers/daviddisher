// import ImageNavigation from './_components/ImageNavigation'

import Link from 'next/link'

export default async function ImageLayout({ children }) {
  return (
    <div>
      {/* <AlbumProvider album={{ images: albumData.images, slug, selectedIndex: imageIdNumber }}>
        <ImageViewer />
        <div style={{ position: 'absolute' }}>
          <ImageNavigation images={albumData.images} slug={slug} imageId={imageIdNumber} />
        </div>
      </AlbumProvider> */}

      {children}

      {/* <ImageViewer /> */}

      {/* <div className="image-container">{children}</div> */}
    </div>
  )
}
