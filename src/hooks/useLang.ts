'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Lang } from '@/types'

const LANG_KEY = 'cc101-lang'

export function useLang() {
  const [lang, setLangState] = useState<Lang>('ja')

  useEffect(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null
    if (saved === 'ko' || saved === 'en' || saved === 'ja') {
      setLangState(saved)
    } else {
      // Auto-detect browser language
      const browserLang: Lang = 'ja'
      setLangState(browserLang)
    }
  }, [])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(LANG_KEY, l)
  }, [])

  const toggle = useCallback(() => {
    const order: Lang[] = ['ko', 'en', 'ja']
    setLang(order[(order.indexOf(lang) + 1) % order.length])
  }, [lang, setLang])

  return { lang, setLang, toggle }
}
