const removeImageExtension = (filename) => {
  return filename.replace(/\.(jpg|jpeg|png|gif|webp|tiff|bmp|svg|heic|avif)$/i, '')
}

const removeDash = (filename) => {
  return filename.replace(/-/g, ' ') // Replace all hyphens with spaces
}

const removeDate = (filename) => {
  const match = filename.match(/^(\d{4})[\s._-]*(.*)/)
  if (match) {
    return [match[2], match[1]]
  }
  return [filename, null] // No year found, return original name
}

const removeResolution = (filename) => {
  const match = filename.match(/[-_\s]?(\d{2,4}x\d{2,4})$/) // Match "120x84" at the end
  if (!match) return [filename, null]

  const cleanedFilename = filename.replace(match[0], '').trim() // Remove the matched resolution
  const resolution = match[1] // Extract resolution

  return [cleanedFilename, resolution]
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

export const getFormattedTitles = (filename) => {
  const noExtension = removeImageExtension(filename)
  const [strippedResolution, resolution] = removeResolution(noExtension)

  const [strippedDate, date] = removeDate(strippedResolution)
  // const cleanedFilename = toTitleCase(
  //   removeResolution(removeLeadingYear(removeDash(removeImageExtension(filename)))).cleanedFilename,
  // )

  const formattedFilename = toTitleCase(removeDash(strippedDate))

  const testDate = '2020-10-08'

  const formatedDate = testDate ? new Date(testDate).toISOString() : null

  console.log('formatted date', formatedDate)

  return {
    title: formattedFilename,
    alt: formattedFilename,
    subtitle: resolution,
    releaseDate: formatedDate,
  }
}
