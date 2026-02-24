'use client'

import type { Lang } from '@/types'

interface LangToggleProps {
  lang: Lang
  onToggle: () => void
}

export function LangToggle({ lang, onToggle }: LangToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
      aria-label="Toggle language"
    >
      <span className={lang === 'ko' ? 'text-white' : 'text-zinc-500'}>한국어</span>
      <span className="text-zinc-600">/</span>
      <span className={lang === 'en' ? 'text-white' : 'text-zinc-500'}>EN</span>
    </button>
  )
}
