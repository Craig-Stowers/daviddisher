import { redirect } from 'next/navigation'
import { headers } from 'next/headers' // Access Next.js headers API

export default async function ImagePage({ params }) {
  return null
  // const album = (await params).slug
  // const imageId = (await params).imageId

  // const response = new Response(null, {
  //   headers: { 'x-image-id': imageId },
  // })

  // //const image = await fetchImageDetails(params.imageSlug);

  // redirect(`/album/${'2000s'}`, response)

  // return (
  //   <div className="full-page-image">
  //     <h5>YOU&apos;RE LOADING IMAGE - {imageId}</h5>
  //     {/* <img src={image.src} alt={image.title} /> */}
  //   </div>
  // )
}
