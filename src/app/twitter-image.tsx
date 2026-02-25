import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CC101 — Claude Code 한국어 입문 가이드'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'monospace',
          position: 'relative',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid rgba(249,115,22,0.4)',
            borderRadius: 999,
            padding: '6px 18px',
            marginBottom: 32,
            color: '#f97316',
            fontSize: 18,
          }}
        >
          <span>▸</span>
          <span>Claude Code 한국어 입문 가이드</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: '-2px',
            marginBottom: 16,
          }}
        >
          <span style={{ color: '#f97316' }}>CC</span>
          <span style={{ color: '#ffffff' }}>101</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: '#a1a1aa',
            fontSize: 26,
            textAlign: 'center',
            marginBottom: 48,
            maxWidth: 700,
          }}
        >
          설치부터 CLAUDE.md, MCP, Skills, Hooks까지
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 40,
            fontSize: 18,
            color: '#71717a',
          }}
        >
          <span>
            <span style={{ color: '#f97316', fontWeight: 700 }}>20</span> 섹션
          </span>
          <span style={{ color: '#3f3f46' }}>·</span>
          <span>
            <span style={{ color: '#f97316', fontWeight: 700 }}>57</span> 공식 문서 기반
          </span>
          <span style={{ color: '#3f3f46' }}>·</span>
          <span style={{ color: '#f97316', fontWeight: 700 }}>한 / EN</span>
        </div>

        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            color: '#3f3f46',
            fontSize: 18,
          }}
        >
          cc101.axwith.com
        </div>
      </div>
    ),
    { ...size }
  )
}
