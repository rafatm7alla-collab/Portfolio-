'use client'

import type { ReactNode } from 'react'
import { ShaderBackground } from '@/components/ui/plasma-shader'

/**
 * Work page header — the contact page's silver plasma panel at a shorter
 * height, holding only the title. The projects preview sits below it.
 */
export function WorkHeroPanel({ children }: { children: ReactNode }) {
  return (
    <div className="cb-panel wh-panel">
      <div aria-hidden="true" className="cb-plasma">
        <ShaderBackground className="h-full w-full" />
      </div>
      <div className="wh-inner">{children}</div>
    </div>
  )
}
