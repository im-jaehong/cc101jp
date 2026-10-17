import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import sections from '../../../content/sections.json'
import ogText from '@/lib/og-text.json'
import type { Lang } from '@/types'

// Generated at build time for /ko, /en, /ja (replaces the original CC101 og.png,
// which carried the original domain). Texts live in src/lib/og-text.json; the
// subsetted fonts in src/assets/og-fonts are produced by `node scripts/og-fonts.mjs`.

export const alt = 'CC101 — Claude Code Guide (cc101jp.vercel.app)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
// Only ko/en/ja are generated; other values 404 instead of rendering on demand.
export const dynamicParams = false

export function generateStaticParams() {
  return [{ lang: 'ko' }, { lang: 'en' }, { lang: 'ja' }]
}

async function loadFont(family: string, weight: 400 | 700) {
  const buf = await readFile(join(process.cwd(), 'src/assets/og-fonts', `${family}-${weight}.woff`))
  return new Uint8Array(buf).buffer as ArrayBuffer
}

export default async function OpenGraphImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang: Lang = langParam === 'ko' || langParam === 'en' ? langParam : 'ja'
  const t = ogText[lang]
  const sectionCount = sections.sections.length
  const [regular, bold] = await Promise.all([loadFont(t.font, 400), loadFont(t.font, 700)])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#09090b',
          backgroundImage: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
          color: '#fafafa',
          fontFamily: t.font,
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 24, height: 24, borderRadius: 4, backgroundColor: '#f97316' }} />
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1 }}>CC101</div>
        </div>

        {/* Title block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.15, letterSpacing: -2 }}>{t.title}</div>
          <div style={{ fontSize: 30, color: '#a1a1aa', lineHeight: 1.4 }}>{t.subtitle}</div>
          <div style={{ display: 'flex', gap: 14, marginTop: 8 }}>
            {t.badges.map((badge) => (
              <div
                key={badge}
                style={{
                  display: 'flex',
                  padding: '10px 20px',
                  borderRadius: 999,
                  border: '2px solid #3f3f46',
                  backgroundColor: '#18181b',
                  color: '#e4e4e7',
                  fontSize: 24,
                }}
              >
                {badge.replace('{n}', String(sectionCount))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer: site URL and attribution */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 28,
            borderTop: '2px solid #27272a',
            fontSize: 24,
            color: '#71717a',
          }}
        >
          <div style={{ color: '#f97316', fontWeight: 700 }}>{`cc101jp.vercel.app/${lang}`}</div>
          <div>{t.credit}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: t.font, data: regular, weight: 400, style: 'normal' },
        { name: t.font, data: bold, weight: 700, style: 'normal' },
      ],
    },
  )
}
