import React from 'react'

export default async function BioPage() {
  return (
    <div className="biopage">
      <div className="content">
        <h2>Here is the bio</h2>
      </div>
    </div>
  )
}

export const revalidate = 120 // Cache the page for 120 seconds before refreshing
