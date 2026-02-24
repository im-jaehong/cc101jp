'use client'

import type { Lang } from '@/types'

interface FooterProps {
  lang: Lang
}

export function Footer({ lang }: FooterProps) {
  const ko = lang === 'ko'
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Logo */}
          <div className="font-mono text-xl font-bold text-zinc-900 dark:text-white">
            <span className="text-orange-500 dark:text-orange-400">▸</span> CC101
          </div>

          {/* Description */}
          <p className="max-w-md text-sm text-zinc-500">
            {ko
              ? '공식 Claude Code 문서 기반으로 제작된 한국어 입문 가이드입니다. 항상 최신 공식 문서와 함께 확인하세요.'
              : 'A Korean beginner\'s guide based on official Claude Code documentation. Always check with the latest official docs.'}
          </p>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-400 dark:text-zinc-500">
            <a
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              {ko ? '공식 문서' : 'Official Docs'}
            </a>
            <a
              href="https://github.com/anthropics/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://github.com/fivetaku/cc101"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
            >
              ⭐ {ko ? '이 가이드 GitHub' : 'CC101 GitHub'}
            </a>
            <a
              href="https://github.com/anthropics/claude-plugins-official"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-zinc-900 dark:hover:text-white"
            >
              {ko ? '공식 플러그인' : 'Official Plugins'}
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-zinc-300 dark:text-zinc-700">
            © {year} CC101 · cc101.axwith.com ·{' '}
            {ko ? '비공식 커뮤니티 가이드' : 'Unofficial Community Guide'}
          </p>
        </div>
      </div>
    </footer>
  )
}
