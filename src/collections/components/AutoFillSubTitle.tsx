'use client'

import { TextFieldClientComponent } from 'payload'
import React, { useEffect, useState } from 'react'

import { TextField, useField, useFormFields } from '@payloadcms/ui'

const removeImageExtension = (filename) => {
  return filename.replace(/\.(jpg|jpeg|png|gif|webp|tiff|bmp|svg|heic|avif)$/i, '')
}

const removeDash = (filename) => {
  return filename.replace(/-/g, ' ') // Replace all hyphens with spaces
}

const removeLeadingYear = (filename) => {
  return filename.replace(/^\d{4}[\s._-]*/, '') // Removes "YYYY " or "YYYY_" or "YYYY-" or "YYYY."
}

const removeResolution = (filename) => {
  const match = filename.match(/[-_\s]?(\d{2,4}x\d{2,4})$/) // Match "120x84" at the end
  if (!match) return { cleanedFilename: filename, resolution: null }

  const cleanedFilename = filename.replace(match[0], '').trim() // Remove the matched resolution
  const resolution = match[1] // Extract resolution

  return { cleanedFilename, resolution }
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

const AutoFillSubTitle: TextFieldClientComponent = ({ path, field, ...props }) => {
  const [filename, setFilename] = useState(null)
  const { value, setValue } = useField({ path })

  const file = useFormFields(([file]) => {
    if (!file) return null

    return file
  })

  useEffect(() => {
    const newFile = (file.file?.value as File | null)?.name || null

    if (newFile === filename) return

    setFilename(newFile)

    if (value) return

    if (newFile) {
      const subTitle = removeResolution(
        removeLeadingYear(removeDash(removeImageExtension(newFile))),
      ).resolution

      if (subTitle) {
        setValue(subTitle)
      }
    }
  }, [file, filename, value])

  //return <input value={value} {...props} />

  return <TextField {...props} path={path} field={field} />
}

export default AutoFillSubTitle
