'use client'

import { useState } from 'react'
import type { Lang } from '@/types'

interface SectionBlockProps {
  id: string
  order: number
  tier: 'core' | 'advanced'
  title: string
  description: string
  badge?: string
  isAdvanced?: boolean
  lang: Lang
  children: React.ReactNode
}

export function SectionBlock({
  id,
  order,
  tier,
  title,
  description,
  badge,
  lang,
  children,
}: SectionBlockProps) {
  const isAdvanced = tier === 'advanced'
  const [isOpen, setIsOpen] = useState(true)

  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-zinc-200 py-12 last:border-0 dark:border-zinc-800/60"
    >
      {/* Section header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="shrink-0 font-mono text-2xl font-bold text-zinc-300 dark:text-zinc-700">
            {String(order).padStart(2, '0')}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-zinc-900 sm:text-2xl dark:text-white">{title}</h2>
              {badge && (
                <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-500 dark:text-orange-400">
                  {badge}
                </span>
              )}
              {isAdvanced && (
                <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500">
                  {lang === 'ko' ? '고급' : 'Advanced'}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-500">{description}</p>
          </div>
        </div>

        {isAdvanced && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0 rounded-md border border-zinc-300 px-3 py-1.5 text-xs text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            {isOpen
              ? lang === 'ko' ? '접기 ▲' : 'Collapse ▲'
              : lang === 'ko' ? '펼치기 ▼' : 'Expand ▼'}
          </button>
        )}
      </div>

      {/* Section content */}
      {isOpen && (
        <div className="prose prose-zinc max-w-none dark:prose-invert
          prose-headings:font-bold
          prose-h2:text-xl prose-h3:text-lg prose-h4:text-base
          prose-p:leading-relaxed
          prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-orange-400
          prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5
          prose-code:text-orange-600 prose-code:text-sm
          prose-code:before:content-none prose-code:after:content-none
          dark:prose-code:bg-zinc-800 dark:prose-code:text-orange-300
          prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-50
          dark:prose-pre:border-zinc-700 dark:prose-pre:bg-zinc-900
          prose-blockquote:border-orange-500/50
          prose-table:text-sm
          prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800">
          {children}
        </div>
      )}
    </section>
  )
}
