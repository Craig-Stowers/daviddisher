import type { CollectionConfig } from 'payload'
import { getFormattedTitles } from '@/lib/getFormattedTitles'

function formatSubtitle(subtitle) {
  if (!subtitle) return null

  return subtitle.replace(/(\d+)x(\d+)/g, '$1 x $2') // Add space between dimensions
}

const toTitleCase = (str) => {
  const smallWords = new Set([
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'if',
    'in',
    'nor',
    'of',
    'on',
    'or',
    'so',
    'the',
    'to',
    'up',
    'yet',
    'with',
  ])

  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      smallWords.has(word) && index !== 0 // Keep small words lowercase, unless first word
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ')
}

function parseFilename(filename) {
  // Remove file extension
  const base = filename.replace(/\.[^/.]+$/, '')

  // Split by "_"
  const parts = base.split('_')

  // Extract date (first part)
  const dateRaw = parts.shift() // Remove the first part (date)
  let date = dateRaw.match(/^[0-9]{4}(-[0-9]{2}){0,2}$/) ? dateRaw : null

  // Format date correctly
  if (date && /^[0-9]{4}$/.test(date)) {
    date = `${date}-01-01` // Default to first day of the year
  } else if (date && /^[0-9]{4}-[0-9]{2}$/.test(date)) {
    date = `${date}-01` // Default to first day of the month
  }

  // Extract subtitle (last part if there are at least 2 remaining parts)
  const subtitle = parts.length > 1 ? parts.pop() : null

  // Title is whatever remains
  const title = parts.join('_')

  // Convert hyphens back to spaces & escape "---" to " - "
  const formattedTitle = title.replace(/---/g, ' - ').replace(/-/g, ' ').trim()

  return {
    date: date || null,
    title: formattedTitle,
    subtitle: subtitle || null,
  }
}

// Example usage

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
      required: false,
      admin: {
        components: {
          Field: './collections/components/AutoFillAltTitle',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      required: false,
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
    {
      name: 'releaseDate',
      type: 'date',

      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy', // 👈 Displays the date as DD/MM/YYYY
        },
      },
      // hooks: {
      //   beforeChange: [
      //     ({ data }) => {
      //       if (data.releaseDate) {
      //         const date = new Date(data.releaseDate)
      //         data.releaseDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01T00:00:00.000Z` // 👈 Forces Day = 01
      //       }
      //     },
      //   ],
      // },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data && data.filename) {
          // const titles = getFormattedTitles(data.filename)

          const { title, subtitle, date } = parseFilename(data.filename)

          const capitalizedTitle = toTitleCase(title)
          const fixedSubtitle = formatSubtitle(subtitle)
          const isoDate = date ? new Date(date).toISOString() : null

          console.log('testFields', date, capitalizedTitle, fixedSubtitle)

          return {
            ...data,

            title: capitalizedTitle,
            alt: capitalizedTitle,
            subtitle: fixedSubtitle,
            releaseDate: isoDate,
          }
        }

        return data
      },
    ],
  },
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
