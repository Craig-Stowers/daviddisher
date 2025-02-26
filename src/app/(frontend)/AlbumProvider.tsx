'use client'
import { createContext, useContext, useState } from 'react'

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
}

// Create a context for the album
const AlbumContext = createContext(null)

// Provider component to wrap the app
export function AlbumProvider({ children }) {
  const [album, setAlbum] = useState({ slug: null, images: [] })

  return <AlbumContext.Provider value={{ album, setAlbum }}>{children}</AlbumContext.Provider>
}

// Hook to use the album context
export function useAlbum() {
  return useContext(AlbumContext)
}
