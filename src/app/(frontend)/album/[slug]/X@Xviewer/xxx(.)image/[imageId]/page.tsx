import ImageViewer from './ImageViewer'

export default async function PhotoModal(props) {
  const params = await props.params

  const index = Number(params.imageId)
  const slug = params.slug

  return (
    <div style={{ color: 'black' }}>
      <h1>PHOTO HERE</h1>
      {/* <ImageViewer index={index} slug={slug} /> */}
    </div>
  )
}
