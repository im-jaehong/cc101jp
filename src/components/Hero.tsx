'use client'

import { useState, useEffect, useRef } from 'react'
import type { Lang } from '@/types'

interface HeroProps {
  lang: Lang
}

export function Hero({ lang }: HeroProps) {
  const ko = lang === 'ko'
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePos, setMousePos] = useState({ x: 50, y: 30 })
  const [typedPrompt, setTypedPrompt] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const [phase, setPhase] = useState<'waiting' | 'typing' | 'done'>('waiting')

  const prompt = ko ? '> 무엇을 만들어 드릴까요?' : '> What would you like to build?'

  // Typewriter loop
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>

    if (phase === 'waiting') {
      t = setTimeout(() => setPhase('typing'), 900)
    } else if (phase === 'typing') {
      let i = 0
      const tick = () => {
        i++
        setTypedPrompt(prompt.slice(0, i))
        if (i < prompt.length) {
          t = setTimeout(tick, 55)
        } else {
          setPhase('done')
        }
      }
      t = setTimeout(tick, 0)
    } else {
      // done → restart after pause
      t = setTimeout(() => {
        setTypedPrompt('')
        setPhase('waiting')
      }, 3500)
    }

    return () => clearTimeout(t)
  }, [phase, prompt])

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 520)
    return () => clearInterval(id)
  }, [])

  // Mouse glow tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden border-b border-zinc-200 bg-white pb-16 pt-32 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <style>{`
        @keyframes orb-bg-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40% { transform: translate(35px, -25px) scale(1.07); }
          70% { transform: translate(-20px, 30px) scale(0.95); }
        }
        @keyframes orb-bg-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          35% { transform: translate(-45px, 20px) scale(1.10); }
          70% { transform: translate(25px, -35px) scale(0.92); }
        }
      `}</style>

      {/* Mouse-following glow */}
      <div
        className="pointer-events-none absolute z-0 h-[500px] w-[500px] rounded-full bg-orange-500 blur-[110px] dark:opacity-[0.12] opacity-[0.08]"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'left 1s cubic-bezier(0.25,0.46,0.45,0.94), top 1s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      />

      {/* Static ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full bg-orange-500 opacity-[0.07] blur-[100px] dark:opacity-[0.09]"
          style={{ animation: 'orb-bg-1 10s ease-in-out infinite' }}
        />
        <div
          className="absolute -bottom-36 -right-28 h-[500px] w-[500px] rounded-full bg-amber-400 opacity-[0.05] blur-[100px] dark:opacity-[0.07]"
          style={{ animation: 'orb-bg-2 14s ease-in-out infinite' }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(249,115,22,0.9) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center lg:px-6">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm text-orange-500 dark:text-orange-400">
          <span className="font-mono">▸</span>
          <span>{ko ? 'Claude Code 한국어 입문 가이드' : 'Claude Code Korean Beginner Guide'}</span>
        </div>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white">
          {ko ? (
            <>
              <span className="text-orange-500 dark:text-orange-400">Claude Code</span>로
              <br />
              AI 시작하기
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
          {ko ? (
            <>
              AI Native로 가는 첫 걸음 —{' '}
              <br className="sm:hidden" />
              Claude Code 한국어 실전 가이드
            </>
          ) : (
            'Your first step to going AI Native — a practical guide to Claude Code'
          )}
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
            <div className="text-zinc-400 dark:text-zinc-500">
              $ curl -fsSL https://claude.ai/install.sh | sh
            </div>
            <div className="mt-1 text-green-600 dark:text-green-400">
              ✓ Claude Code installed successfully
            </div>
            <div className="mt-2 text-zinc-400 dark:text-zinc-500">$ claude</div>
            <div className="mt-1 min-h-[1.5rem] text-orange-500 dark:text-orange-400">
              {typedPrompt}
              <span
                className="ml-px inline-block h-[0.9em] w-[8px] translate-y-[1px] rounded-[1px] bg-orange-500 align-middle dark:bg-orange-400"
                style={{ opacity: cursorOn ? 0.85 : 0 }}
              />
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
            <span className="text-orange-500 dark:text-orange-400">20</span>
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
