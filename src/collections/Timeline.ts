import { TimelineBlock } from '@/blocks/TimelineSection'
import { CollectionConfig } from 'payload'

const Timeline: CollectionConfig = {
  slug: 'timeline',
  labels: {
    singular: 'Timeline Entry',
    plural: 'Timeline Entries',
  },

  fields: [
    {
      name: 'content',
      type: 'blocks',
      blocks: [TimelineBlock], // Add block types here
      admin: {
        isSortable: true,
      },
    },
  ],
}
export default Timeline
