'use client'

import { useEffect, useRef, useState } from 'react'
import type { SectionMeta, Lang } from '@/types'
import { trackTocClick } from '@/lib/analytics'

interface SidebarProps {
  sections: SectionMeta[]
  lang: Lang
  onLinkClick?: () => void
  isMobile?: boolean
}

export function Sidebar({ sections, lang, onLinkClick, isMobile = false }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [showAdvanced, setShowAdvanced] = useState(true)
  const navRef = useRef<HTMLElement>(null)

  // Auto-scroll sidebar to keep active item visible
  useEffect(() => {
    if (!activeId || !navRef.current) return
    const activeEl = navRef.current.querySelector(`a[href="#${activeId}"]`)
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }, [activeId])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0% -70% 0%' }
    )

    sections.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections])

  const coreSections = sections.filter((s) => s.tier === 'core')
  const advancedSections = sections.filter((s) => s.tier === 'advanced')

  return (
    <nav ref={navRef} className="flex flex-col gap-1">
      {/* Core sections */}
      <div className="mb-2">
        <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          {lang === 'ko' ? '기초 필수' : 'Core Essentials'}
        </p>
        {coreSections.map((section) => (
          <SidebarItem key={section.id} section={section} lang={lang} isActive={activeId === section.id} onLinkClick={onLinkClick} isMobile={isMobile} />
        ))}
      </div>

      {/* Advanced sections */}
      <div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mb-2 flex w-full items-center justify-between px-2 text-xs font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300"
        >
          <span>{lang === 'ko' ? '고급 확장' : 'Advanced'}</span>
          <span className="text-zinc-300 dark:text-zinc-600">{showAdvanced ? '▾' : '▸'}</span>
        </button>
        {showAdvanced &&
          advancedSections.map((section) => (
            <SidebarItem key={section.id} section={section} lang={lang} isActive={activeId === section.id} onLinkClick={onLinkClick} isMobile={isMobile} />
          ))}
      </div>
    </nav>
  )
}

function SidebarItem({
  section,
  lang,
  isActive,
  onLinkClick,
  isMobile = false,
}: {
  section: SectionMeta
  lang: Lang
  isActive: boolean
  onLinkClick?: () => void
  isMobile?: boolean
}) {
  const title = lang === 'ko' ? section.title_ko : section.title_en

  const handleClick = () => {
    trackTocClick({ target_section: section.id, is_mobile: isMobile, lang })
    onLinkClick?.()
  }

  return (
    <a
      href={`#${section.id}`}
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors ${
        isActive
          ? 'bg-orange-500/10 text-orange-500 dark:text-orange-400'
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-200'
      }`}
    >
      <span className="w-5 text-center font-mono text-xs text-zinc-300 dark:text-zinc-600">
        {String(section.order).padStart(2, '0')}
      </span>
      <span className="truncate">{title}</span>
      {section.badge && (
        <span className="ml-auto shrink-0 rounded bg-orange-500/20 px-1 py-0.5 text-xs text-orange-500 dark:text-orange-400">
          {lang === 'ko' ? section.badge : (section.badge_en ?? section.badge)}
        </span>
      )}
    </a>
  )
}
