import { Block } from 'payload'

export const TimelineBlock: Block = {
  slug: 'timeline-block',
  labels: {
    singular: 'Timeline Entry',
    plural: 'Timeline Entries',
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

export const SectionBlock: Block = {
  slug: 'section-block',
  labels: {
    singular: 'Timeline Entry',
    plural: 'Timeline Entries',
  },

  fields: [
    {
      name: 'content',
      type: 'blocks',
      blocks: [TimelineBlock], // Add block types here
    },
  ],
}
