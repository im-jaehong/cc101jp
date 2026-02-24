'use client'

import type { Lang } from '@/types'

interface HeroProps {
  lang: Lang
}

export function Hero({ lang }: HeroProps) {
  const ko = lang === 'ko'

  return (
    <section className="relative overflow-hidden border-b border-zinc-200 bg-white pb-16 pt-32 dark:border-zinc-800 dark:bg-zinc-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[800px] rounded-full bg-orange-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center lg:px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-500 dark:text-orange-400">
          <span className="font-mono">▸</span>
          <span>{ko ? 'Claude Code 한국어 입문 가이드' : 'Claude Code Korean Beginner Guide'}</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          {ko ? (
            <>
              <span className="text-orange-500 dark:text-orange-400">Claude Code</span>로{' '}
              <br className="hidden sm:block" />
              AI 코딩 시작하기
            </>
          ) : (
            <>
              Get Started with{' '}
              <br className="hidden sm:block" />
              <span className="text-orange-500 dark:text-orange-400">Claude Code</span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mb-10 text-lg text-zinc-500 sm:text-xl dark:text-zinc-400">
          {ko
            ? '설치부터 CLAUDE.md, MCP, Skills까지 — 공식 문서 기반으로 쉽게 정리한 한국어 가이드'
            : 'From installation to CLAUDE.md, MCP, and Skills — a beginner-friendly guide based on official docs'}
        </p>

        {/* Terminal preview */}
        <div className="mx-auto mb-10 max-w-lg rounded-xl border border-zinc-200 bg-zinc-50 text-left shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-2xl">
          <div className="flex items-center gap-1.5 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <div className="h-3 w-3 rounded-full bg-red-500/60" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <div className="h-3 w-3 rounded-full bg-green-500/60" />
            <span className="ml-2 font-mono text-xs text-zinc-400 dark:text-zinc-600">Terminal</span>
          </div>
          <div className="p-4 font-mono text-sm">
            <div className="text-zinc-400 dark:text-zinc-500">$ curl -fsSL https://claude.ai/install.sh | sh</div>
            <div className="mt-1 text-green-600 dark:text-green-400">✓ Claude Code installed successfully</div>
            <div className="mt-2 text-zinc-400 dark:text-zinc-500">$ claude</div>
            <div className="mt-1 text-orange-500 dark:text-orange-400">
              {ko ? '> 무엇을 만들어 드릴까요?' : '> What would you like to build?'}
            </div>
            <div className="mt-1 flex items-center gap-1 text-zinc-900 dark:text-white">
              <span className="animate-pulse">█</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <a
            href="#01-what-is-cc"
            className="min-w-[10rem] rounded-lg bg-orange-500 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-400"
          >
            {ko ? '가이드 시작 →' : 'Start Guide →'}
          </a>
          <a
            href="https://docs.anthropic.com/en/docs/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-[10rem] rounded-lg border border-zinc-300 px-6 py-3 text-center text-sm font-semibold text-zinc-600 transition-colors hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white"
          >
            {ko ? '공식 문서' : 'Official Docs'}
          </a>
        </div>

        {/* Stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-zinc-400 dark:text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400">16</span>
            <span>{ko ? '섹션' : 'Sections'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400">57</span>
            <span>{ko ? '공식 문서 기반' : 'Official Docs Based'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500 dark:text-orange-400">KO</span>
            <span>/</span>
            <span className="text-orange-500 dark:text-orange-400">EN</span>
          </div>
        </div>
      </div>
    </section>
  )
}
