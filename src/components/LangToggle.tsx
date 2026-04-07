'use client'

import { useRouter } from 'next/navigation'
import type { Lang } from '@/types'
import { trackLanguageToggle } from '@/lib/analytics'

const LANGS: { value: Lang; label: string }[] = [
  { value: 'ko', label: '한국어' },
  { value: 'en', label: 'EN' },
  { value: 'ja', label: '日本語' },
]

interface LangToggleProps {
  lang: Lang
}

export function LangToggle({ lang }: LangToggleProps) {
  const router = useRouter()

  const handleChange = (target: Lang) => {
    if (target === lang) return
    trackLanguageToggle({ from: lang, to: target })
    router.push(`/${target}`, { scroll: false })
  }

  return (
    <div className="flex h-9 items-center rounded-md border border-zinc-300 dark:border-zinc-700" role="group" aria-label="Language">
      {LANGS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => handleChange(value)}
          aria-current={value === lang ? 'true' : undefined}
          className={`h-full px-2.5 text-sm font-medium transition-colors first:rounded-l-md last:rounded-r-md ${
            value === lang
              ? 'bg-orange-500 text-white dark:bg-orange-500'
              : 'bg-zinc-100 text-zinc-500 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
