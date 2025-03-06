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
      admin: {
        components: {
          Field: './collections/components/AutoFillAltTitle',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        components: {
          Field: './collections/components/AutoFillAltTitle',
        },
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      admin: {
        components: {
          Field: './collections/components/AutoFillSubTitle',
        },
      },
    },
  ],
  upload: true,
}

// import { CollectionConfig } from 'payload'

// const Artwork: CollectionConfig = {
//   slug: 'artwork',
//   labels: {
//     singular: 'Artwork',
//     plural: 'Artwork',
//   },
//   access: {
//     read: () => true,
//   },

//   fields: [
//     {
//       name: 'alt',
//       type: 'text',
//       required: true,
//       admin: {
//         components: {
//           Field: './components/AutoFillAltTitle',
//         },
//       },
//     },
//     {
//       name: 'title',
//       type: 'text',
//       required: true,
//     },
//     {
//       name: 'subtitle',
//       type: 'text',
//       required: false,
//     },
//   ],
//   upload: true,
// }

// export default Artwork
