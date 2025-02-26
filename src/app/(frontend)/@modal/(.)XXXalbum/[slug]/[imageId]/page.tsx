import Viewer from './Viewer'
export default async function PhotoModal(props) {
  // return <Modal>{photoId}</Modal>;
  const params = await props.params
  console.log('PhotoModal', params)

  return (
    <div>
      <Viewer index={params.imageId} />
    </div>
  )
}
