'use client'
import { useRouter } from 'next/navigation'
import { useAlbum } from '@/app/(frontend)/AlbumProvider'
import { AlbumDataType } from '@/app/(frontend)/AlbumProvider'
import Link from 'next/link'

const Viewer = ({ index }) => {
  const router = useRouter()
  const albumData = useAlbum()
  if (!albumData) {
    return <div>Loading...</div>
  }
  const { album }: { album: AlbumDataType } = albumData

  const indexNumber = parseInt(index)

  const nextIndex = indexNumber < album.images.length - 1 ? indexNumber + 1 : 0
  const prevIndex = indexNumber > 0 ? indexNumber - 1 : album.images.length - 1

  console.log('album', album)

  function handleClose() {
    router.back()
    //  router.replace(`/album/${album.slug}`) // ✅ Always go back to the album
  }

  return (
    <div>
      <button
        onClick={() => {
          handleClose()
        }}
      >
        Back to album
      </button>

      <h1>
        Viewer here for Index {indexNumber + 1} / {album.images.length}
      </h1>
      <Link href={`/album/${album.slug}/${prevIndex}`}>
        <button>Prev</button>
      </Link>
      <Link href={`/album/${album.slug}/${nextIndex}`}>
        <button>Next</button>
      </Link>
    </div>
  )
}

export default Viewer
