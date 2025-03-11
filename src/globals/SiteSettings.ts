import { GlobalConfig } from 'payload'

import { TimelineBlock } from '@/blocks/TimelineSection'

const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'frontPageArt',
      type: 'upload',
      relationTo: 'artwork',
      required: false,
      label: 'Front Page Art',
    },
    {
      name: 'bio',
      type: 'richText',
      required: false,
      label: 'Bio',
    },
    // {
    //   name: 'bioImage',
    //   type: 'upload',
    //   relationTo: 'interface-media',
    //   required: false,
    //   label: 'Bio Image',
    // },
    {
      name: 'portrait',
      type: 'upload',
      relationTo: 'artwork',
      required: false,
      label: 'Bio Image',
    },
    {
      name: 'email',
      type: 'email',
      required: false,
      label: 'Contact Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: false,
      label: 'Phone Number',
    },
    {
      name: 'links',
      type: 'array',
      label: 'Social & External Links',
      fields: [
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'interface-media',
          required: false,
          label: 'Icon',
        },
      ],
    },

    {
      name: 'sections',
      type: 'array',
      label: 'Timeline Sections',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'content',
          type: 'array',
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
          admin: {
            isSortable: true,
          },
        },
      ],
    },
  ],
}

export default SiteSettings
