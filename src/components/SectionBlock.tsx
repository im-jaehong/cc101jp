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
  const [isOpen, setIsOpen] = useState(!isAdvanced)

  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-zinc-800/60 py-12 last:border-0"
    >
      {/* Section header */}
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="shrink-0 font-mono text-2xl font-bold text-zinc-700">
            {String(order).padStart(2, '0')}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-white sm:text-2xl">{title}</h2>
              {badge && (
                <span className="rounded bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-400">
                  {badge}
                </span>
              )}
              {isAdvanced && (
                <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">
                  {lang === 'ko' ? '고급' : 'Advanced'}
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-zinc-500">{description}</p>
          </div>
        </div>

        {isAdvanced && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="shrink-0 rounded-md border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:border-zinc-500 hover:text-white"
          >
            {isOpen
              ? lang === 'ko' ? '접기 ▲' : 'Collapse ▲'
              : lang === 'ko' ? '펼치기 ▼' : 'Expand ▼'}
          </button>
        )}
      </div>

      {/* Section content */}
      {isOpen && (
        <div className="prose prose-invert prose-zinc max-w-none
          prose-headings:font-bold prose-headings:text-white
          prose-h2:text-xl prose-h3:text-lg prose-h4:text-base
          prose-p:text-zinc-300 prose-p:leading-relaxed
          prose-a:text-orange-400 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-white
          prose-code:rounded prose-code:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5
          prose-code:text-orange-300 prose-code:text-sm
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-xl prose-pre:border prose-pre:border-zinc-700 prose-pre:bg-zinc-900
          prose-blockquote:border-orange-500/50 prose-blockquote:text-zinc-400
          prose-table:text-sm prose-th:text-zinc-200 prose-th:bg-zinc-800/50
          prose-td:text-zinc-300 prose-td:border-zinc-800
          prose-li:text-zinc-300 prose-hr:border-zinc-800">
          {children}
        </div>
      )}
    </section>
  )
}
