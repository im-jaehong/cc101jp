'use client'

import type { Lang } from '@/types'

interface LangToggleProps {
  lang: Lang
  onLangChange: (lang: Lang) => void
}

const langs: { value: Lang; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日本語' },
]

export function LangToggle({ lang, onLangChange }: LangToggleProps) {
  return (
    <div
      className="flex h-9 items-center rounded-md border border-zinc-300 bg-zinc-100 text-sm font-medium dark:border-zinc-700 dark:bg-zinc-800"
      role="radiogroup"
      aria-label="Language"
    >
      {langs.map(({ value, label }, i) => (
        <span key={value} className="flex items-center">
          {i > 0 && <span className="text-zinc-400 dark:text-zinc-600">/</span>}
          <button
            onClick={() => onLangChange(value)}
            disabled={lang === value}
            className={`px-2 py-1 transition-colors ${
              lang === value
                ? 'text-zinc-900 dark:text-white cursor-default'
                : 'text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white cursor-pointer'
            }`}
            role="radio"
            aria-checked={lang === value}
            aria-label={label}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  )
}
