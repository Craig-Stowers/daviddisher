'use client'
import { createContext, useContext, useState, useEffect } from 'react'

// Define type for image items
export interface ImageItem {
  id: string
  url?: string
  width?: number
  height?: number
  alt?: string
}

// Define type for album data
export interface AlbumDataType {
  slug: string
  images: ImageItem[]
  selectedIndex: number
}

// Create a context for the album
const AlbumContext = createContext(null)

// Provider component to wrap the app
export function AlbumProvider({ children, albumData }) {
  const [album, setAlbum] = useState(albumData)
  const [selectedIndex, setSelectedIndex] = useState(null)
  // const [album, setAlbum] = useState({ slug: null, images: [] })

  useEffect(() => {
    window.scrollTo(0, 0) // Scroll to top of page
  }, [album])

  return (
    <AlbumContext.Provider value={{ album, setAlbum, selectedIndex, setSelectedIndex }}>
      {children}
    </AlbumContext.Provider>
  )
}

// Hook to use the album context
export function useAlbum() {
  return useContext(AlbumContext)
}
