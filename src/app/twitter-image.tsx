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
          fontFamily: 'monospace',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background:
              'linear-gradient(to right, transparent, #f97316 25%, #f97316 75%, transparent)',
          }}
        />

        {/* Background glow - left */}
        <div
          style={{
            position: 'absolute',
            left: -150,
            top: -150,
            width: 700,
            height: 700,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 65%)',
          }}
        />

        {/* Decorative vertical line */}
        <div
          style={{
            position: 'absolute',
            left: 680,
            top: 60,
            bottom: 60,
            width: 1,
            background:
              'linear-gradient(to bottom, transparent, rgba(249,115,22,0.25) 30%, rgba(249,115,22,0.25) 70%, transparent)',
          }}
        />

        {/* LEFT: Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '70px 72px',
            width: 660,
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(249,115,22,0.35)',
              borderRadius: 999,
              padding: '6px 18px',
              marginBottom: 32,
              color: '#f97316',
              fontSize: 17,
              background: 'rgba(249,115,22,0.06)',
            }}
          >
            <span>▸</span>
            <span>Claude Code 한국어 가이드</span>
          </div>

          {/* Title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              marginBottom: 22,
              lineHeight: 1,
            }}
          >
            <span
              style={{
                color: '#f97316',
                fontSize: 108,
                fontWeight: 900,
                letterSpacing: '-4px',
              }}
            >
              CC
            </span>
            <span
              style={{
                color: '#ffffff',
                fontSize: 108,
                fontWeight: 900,
                letterSpacing: '-4px',
              }}
            >
              101
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: '#a1a1aa',
              fontSize: 23,
              lineHeight: 1.45,
              maxWidth: 460,
              marginBottom: 44,
            }}
          >
            AI Native로 가는 첫 걸음
          </div>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 20,
              fontSize: 16,
              color: '#52525b',
              alignItems: 'center',
            }}
          >
            <span>
              <span style={{ color: '#f97316', fontWeight: 700 }}>20</span>{' '}
              섹션
            </span>
            <span style={{ color: '#3f3f46' }}>·</span>
            <span>공식 문서 기반</span>
            <span style={{ color: '#3f3f46' }}>·</span>
            <span style={{ color: '#f97316', fontWeight: 700 }}>한 / EN</span>
          </div>
        </div>

        {/* RIGHT: Terminal window */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            paddingRight: 64,
          }}
        >
          <div
            style={{
              width: 390,
              background: '#111113',
              border: '1px solid #27272a',
              borderRadius: 14,
              boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Terminal titlebar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '13px 18px',
                borderBottom: '1px solid #27272a',
                background: '#18181b',
                borderRadius: '14px 14px 0 0',
              }}
            >
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: '#ef4444',
                  opacity: 0.75,
                }}
              />
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: '#f59e0b',
                  opacity: 0.75,
                }}
              />
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: '#22c55e',
                  opacity: 0.75,
                }}
              />
              <span
                style={{ color: '#52525b', fontSize: 13, marginLeft: 8 }}
              >
                ~ terminal
              </span>
            </div>

            {/* Terminal body */}
            <div
              style={{
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}
            >
              <div style={{ color: '#52525b', fontSize: 14 }}>
                $ curl -fsSL https://claude.ai/install.sh | sh
              </div>
              <div style={{ color: '#22c55e', fontSize: 14 }}>
                ✓ Claude Code installed successfully
              </div>
              <div style={{ color: '#52525b', fontSize: 14, marginTop: 6 }}>
                $ claude
              </div>
              <div style={{ color: '#f97316', fontSize: 14 }}>
                ▸ 무엇을 만들어 드릴까요?
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  fontSize: 14,
                  color: '#ffffff',
                  marginTop: 2,
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: 9,
                    height: 18,
                    background: '#f97316',
                    opacity: 0.85,
                    borderRadius: 1,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* URL bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 34,
            left: 72,
            color: '#3f3f46',
            fontSize: 16,
          }}
        >
          cc101.axwith.com
        </div>
      </div>
    ),
    { ...size }
  )
}
