'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Lang } from '@/types'

const LANG_KEY = 'cc101-lang'

export function useLang() {
  const [lang, setLangState] = useState<Lang>('ko')

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null
    if (saved === 'ko' || saved === 'en') {
      setLangState(saved)
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.startsWith('ko') ? 'ko' : 'en'
      setLangState(browserLang)
    }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(LANG_KEY, l)
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === 'ko' ? 'en' : 'ko')
  }, [lang, setLang])

  return { lang, setLang, toggle }
}
