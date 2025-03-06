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
      const filenameWithoutExtension = removeDash(removeImageExtension(newFile))

      //  console.log('filenameWithoutExtension', filenameWithoutExtension)

      setValue(filenameWithoutExtension)
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
