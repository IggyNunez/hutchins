'use client'

import { usePathname } from 'next/navigation'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <CustomCursor />
      <SmoothScroll>{children}</SmoothScroll>
    </>
  )
}
