'use client'

import { TextFieldClientComponent } from 'payload'
import React, { useEffect, useState } from 'react'

import { TextField, useField, useFormFields } from '@payloadcms/ui'

import { getFormattedTitles } from '@/lib/getFormattedTitles'

const AutoFillAltTitle: TextFieldClientComponent = ({ path, field, ...props }) => {
  //const { value, setValue } = useField({ path })

  const [filename, setFilename] = useState(null)
  const { value, setValue } = useField({ path })

  const file = useFormFields(([file]) => {
    if (!file) return null
    // console.log('all fields', file)
    return file
  })

  // const filenameField = useFormFields([filename]).filename?.value

  // console.log('filenameField', filenameField)
  // const { value, setValue } = useField({ path: props.path });
  // const { fields, dispatch } = useFormFields();

  useEffect(() => {
    const newFile = (file.file?.value as File | null)?.name || null

    //  console.log('newFile', newFile, 'oldFile', filename)

    if (newFile === filename) return

    setFilename(newFile)

    if (value) return

    if (newFile) {
      const { title } = getFormattedTitles(newFile)
      // const filenameWithoutExtension = toTitleCase(
      //   removeResolution(removeLeadingYear(removeDash(removeImageExtension(newFile))))
      //     .cleanedFilename,
      // )

      //  console.log('filenameWithoutExtension', filenameWithoutExtension)

      setValue(title)
    }
    // setValue(file.name)
    //  console.log('upload alt', siblingData)
    // if (value && value.filename) {
    //   const filenameWithoutExtension = value.filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    //   if (!fields.alt?.value) {
    //     dispatch({ type: 'UPDATE', path: 'alt', value: filenameWithoutExtension });
    //   }
    //   if (!fields.title?.value) {
    //     dispatch({ type: 'UPDATE', path: 'title', value: filenameWithoutExtension });
    //   }
    // }
  }, [file, filename, value])

  //return <input value={value} {...props} />

  return <TextField {...props} path={path} field={field} />
}

export default AutoFillAltTitle
