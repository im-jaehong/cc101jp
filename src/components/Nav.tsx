'use client'

import Link from 'next/link'
import { LangToggle } from './LangToggle'
import { ThemeToggle } from './ThemeToggle'
import type { Lang } from '@/types'

interface NavProps {
  lang: Lang
  onToggle: () => void
  mobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

export function Nav({ lang, onToggle, mobileMenuOpen, onMobileMenuToggle }: NavProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/90">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 font-mono text-lg font-bold text-zinc-900 dark:text-white">
          <span className="text-orange-500 dark:text-orange-400">▸</span>
          <span>CC101</span>
          <span className="hidden text-xs font-normal text-zinc-400 sm:inline">
            {lang === 'ko' ? 'Claude Code 한국어 가이드' : lang === 'ja' ? 'Claude Code 日本語ガイド' : 'Claude Code Guide'}
          </span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/im-jaehong/cc101jp"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-md border border-zinc-300 bg-zinc-100 px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 sm:flex dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <ThemeToggle />
          <LangToggle lang={lang} onToggle={onToggle} />

          {/* Hamburger — mobile only */}
          <button
            onClick={onMobileMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 lg:hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
