'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
  return (
    <div data-sanity-studio>
      <NextStudio config={config} />
    </div>
  )
}
