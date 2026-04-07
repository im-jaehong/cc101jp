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
      className="flex h-9 items-center gap-1 rounded-md border border-zinc-300 bg-zinc-100 px-3 text-sm font-medium text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
      aria-label="Toggle language"
    >
      <span className={lang === 'ko' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}>한국어</span>
      <span className="text-zinc-400 dark:text-zinc-600">/</span>
      <span className={lang === 'en' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}>EN</span>
      <span className="text-zinc-400 dark:text-zinc-600">/</span>
      <span className={lang === 'ja' ? 'text-zinc-900 dark:text-white' : 'text-zinc-400 dark:text-zinc-500'}>日本語</span>
    </button>
  )
}
