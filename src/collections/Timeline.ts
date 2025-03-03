import { CollectionConfig } from 'payload'

const Timeline: CollectionConfig = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline Entry',
    plural: 'Timeline Entries',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      required: true,
    },
    {
      name: 'entries',
      label: 'Entries',
      type: 'array',
      admin: {
        isSortable: true,
      },
      fields: [
        {
          name: 'text',
          label: 'Entry',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
export default Timeline
