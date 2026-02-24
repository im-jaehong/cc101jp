'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Hero } from './Hero'
import type { SectionMeta, Lang } from '@/types'

interface PageClientProps {
  lang: Lang
  sections: SectionMeta[]
  children: React.ReactNode
}

export function PageClient({ lang, sections, children }: PageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const toggleLang = useCallback(() => {
    const next = lang === 'ko' ? 'en' : 'ko'
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', next)
    router.push(`?${params.toString()}`, { scroll: false })
  }, [lang, router, searchParams])

  return (
    <>
      <Nav lang={lang} onToggle={toggleLang} />

      <Hero lang={lang} />

      <div className="mx-auto flex max-w-screen-xl">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-zinc-800 p-4 lg:block">
          <Sidebar sections={sections} lang={lang} />
        </aside>

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-4 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>

      <Footer lang={lang} />
    </>
  )
}
