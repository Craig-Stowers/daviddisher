import type { CollectionConfig } from 'payload'

export const Artwork: CollectionConfig = {
  slug: 'artwork',
  labels: {
    singular: 'Artwork',
    plural: 'Artwork',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
    },
  ],
  upload: true,
}
