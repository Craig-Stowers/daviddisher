import React from 'react'
import { getGlobals } from '@/lib/getData'
import Image from 'next/image'

export default async function Logo() {
  const siteSettings = await getGlobals('site-settings')

  const potraitSrc = siteSettings?.portrait?.url || null
  return (
    <div
      style={{
        width: '480px',
        height: '204px',

        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '660px',
          height: '204px',

          filter: 'invert(100%)',
          overflow: 'hidden',
          position: 'absolute',
          transform: 'translateX(-54px)',
        }}
      >
        {potraitSrc && (
          <Image
            src={siteSettings.portrait.url}
            objectFit="cover"
            alt="douch"
            layout={'fill'}
            objectPosition={'50% 27%'}
          />
        )}
      </div>
    </div>
  )
}
