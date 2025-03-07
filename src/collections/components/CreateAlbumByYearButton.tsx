'use client'

import React, { useState } from 'react'

const CreateAlbumByYearButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function createAlbumByYear() {
    try {
      const response = await fetch('/api/albums/generate-by-year', {
        method: 'POST',
        credentials: 'include', // ✅ Ensures auth cookies are sent
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Request failed:', error)
    }
  }

  return (
    <div style={{ marginBottom: '15px' }}>
      <button
        onClick={createAlbumByYear}
        disabled={loading}
        style={{
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Generating...' : 'Create Album by Year'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}

export default CreateAlbumByYearButton
