import { CollectionConfig } from 'payload'

export const Albums: CollectionConfig = {
  slug: 'albums',
  // admin: {
  //   defaultColumns: ['name'],
  // },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      index: true, // Adds an index to the field
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true, // Ensures unique URLs
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0, // Default value of 0
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'coverImage',
      type: 'relationship',
      relationTo: 'artwork',
      required: false, // Optional cover image
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'artwork',
      hasMany: true, // Multiple images per album
    },
  ],

  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.name && !data.slug) {
          data.slug = data.name
            .toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with dashes
            .replace(/[^a-z0-9-]/g, '') // Remove special characters
            .trim()
        }
      },
    ],
  },
}
