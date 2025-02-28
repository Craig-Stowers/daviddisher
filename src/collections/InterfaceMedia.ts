import { CollectionConfig } from 'payload'

const InterfaceMedia: CollectionConfig = {
  slug: 'interface-media',
  labels: {
    singular: 'Interface Image',
    plural: 'Interface Images',
  },
  access: {
    read: () => true,
  },
  // upload: {
  //   staticDir: 'media/interface',
  //   mimeTypes: ['image/*'],
  // },
  // admin: {
  //   group: 'Media',
  //   defaultColumns: ['filename', 'updatedAt'],
  // },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
    },
  ],
}

export default InterfaceMedia
