import { GlobalConfig } from 'payload'

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
    {
      name: 'bioImage',
      type: 'upload',
      relationTo: 'interface-media',
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
  ],
}

export default SiteSettings
