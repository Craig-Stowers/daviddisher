'use client'
import React from 'react'
import { FieldProps } from 'payload/dist/fields/config/types'

const VisualMediaSelector: React.FC<FieldProps> = (props) => {
  console.log('VisualMediaSelector props:', props)
  // Try using onChange, or fallback to setValue if onChange is undefined:
  const updateValue = typeof props.onChange === 'function' ? props.onChange : props.setValue

  // Use a fallback if neither is provided
  const safeUpdate =
    typeof updateValue === 'function'
      ? updateValue
      : () => console.warn('No update callback provided')

  const items = props.value || []

  const toggleSelect = (mediaId: string) => {
    let newSelected: string[]
    if (items.includes(mediaId)) {
      newSelected = items.filter((id: string) => id !== mediaId)
    } else {
      newSelected = [...items, mediaId]
    }
    safeUpdate(newSelected)
  }

  return (
    <div className="visual-media-selector" style={{ display: 'flex', flexWrap: 'wrap' }}>
      {Array.isArray(items) && items.length > 0 ? (
        items.map((item: any) => (
          <div
            key={item.id}
            onClick={() => toggleSelect(item.id)}
            style={{
              cursor: 'pointer',
              border: '1px solid gray',
              margin: '4px',
              padding: '4px',
              width: '100px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={item.url}
              alt={item.alt || 'Media'}
              style={{ maxWidth: '90px', maxHeight: '90px' }}
            />
          </div>
        ))
      ) : (
        <p>No images selected</p>
      )}
    </div>
  )
}

export default VisualMediaSelector
