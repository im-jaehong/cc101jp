'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Nav } from './Nav'
import { Sidebar } from './Sidebar'
import { Footer } from './Footer'
import { Hero } from './Hero'
import type { SectionMeta, Lang } from '@/types'
import { trackLanguageToggle } from '@/lib/analytics'

interface PageClientProps {
  lang: Lang
  sections: SectionMeta[]
  children: React.ReactNode
}

export function PageClient({ lang, sections, children }: PageClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleLang = useCallback(() => {
    const next = lang === 'ko' ? 'en' : 'ko'
    trackLanguageToggle({ from: lang, to: next })
    const params = new URLSearchParams(searchParams.toString())
    params.set('lang', next)
    router.push(`?${params.toString()}`, { scroll: false })
  }, [lang, router, searchParams])

  return (
    <>
      <Nav
        lang={lang}
        onToggle={toggleLang}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen((v) => !v)}
      />

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer panel */}
          <div className="absolute right-0 top-14 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-l border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {lang === 'ko' ? '목차' : 'Contents'}
            </p>
            <Sidebar sections={sections} lang={lang} onLinkClick={() => setMobileMenuOpen(false)} isMobile={true} />
          </div>
        </div>
      )}

      <Hero lang={lang} />

      <div className="mx-auto flex max-w-screen-xl">
        {/* Sidebar */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-zinc-200 p-4 lg:block dark:border-zinc-800">
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
