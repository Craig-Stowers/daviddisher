export default async function ImagePage({ params }) {
  const album = (await params).slug
  const imageId = (await params).imageId

  console.log('ImagePage', imageId, album)
  //const image = await fetchImageDetails(params.imageSlug);

  return (
    <div className="full-page-image">
      <h5>YOU&apos;RE LOADING IMAGE - {imageId}</h5>
      {/* <img src={image.src} alt={image.title} /> */}
    </div>
  )
}
