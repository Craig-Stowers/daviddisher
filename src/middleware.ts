import { NextResponse } from 'next/server'

export function middleware(req) {
  const url = req.nextUrl
  const isClientNavigation = req.headers.get('sec-fetch-dest') === 'document'

  // Allow intercepted routes to work normally
  if (!isClientNavigation && url.pathname.match(/^\/album\/[^/]+\/image\/\d+$/)) {
    return NextResponse.next()
  }

  if (url.pathname.match(/^\/album\/[^/]+\/image\/\d+$/)) {
    const album = url.pathname.split('/')[2]
    const imageId = url.pathname.split('/')[4]

    console.log(`Middleware rewriting. Image ID: ${imageId}`)

    // Instead of redirecting, rewrite the request to `/album/[slug]`
    const response = NextResponse.rewrite(new URL(`/album/${album}`, req.url))
    response.headers.set('x-image-id', imageId) // Keep image ID in headers

    return response
  }

  return NextResponse.next()
}
