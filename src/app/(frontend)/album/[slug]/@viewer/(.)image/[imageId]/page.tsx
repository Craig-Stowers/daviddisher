import ImageViewer from './ImageViewer'

export default async function PhotoModal(props) {
  // return <Modal>{photoId}</Modal>;
  const params = await props.params
  //console.log('PhotoModal', params)

  const index = Number(params.imageId)
  const slug = params.slug

  return (
    <div>
      <ImageViewer index={index} slug={slug} />
    </div>
  )
}
