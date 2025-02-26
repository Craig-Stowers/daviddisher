// app/album/[albumSlug]/layout.js
'use client'
import { usePathname, useRouter } from 'next/navigation'
//import Modal from "@/components/Modal"; // Floating modal component

export default function AlbumLayout({ children }) {
  const pathname = usePathname()
  console.log('pathname', pathname)
  // const router = useRouter();
  // const isViewingImage = pathname.split("/").length > 3;
  // Detect if in `[imageSlug]` route

  return (
    <div className="relative">
      <h3>album layout here</h3>
      {children} {/* Album grid stays mounted */}
      {/* {isViewingImage && (
        <Modal onClose={() => router.push(pathname.split("/").slice(0, 3).join("/"))}>
         
          <ImageViewer /> 
        </Modal>
      )} */}
    </div>
  )
}
