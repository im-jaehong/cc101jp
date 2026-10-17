// Downloads subsetted Noto Sans fonts for the OG image (src/app/[lang]/opengraph-image.tsx).
// Re-run after changing src/lib/og-text.json:  node scripts/og-fonts.mjs
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

const root = process.cwd()
const text = JSON.parse(await readFile(join(root, 'src/lib/og-text.json'), 'utf8'))
const outDir = join(root, 'src/assets/og-fonts')
await mkdir(outDir, { recursive: true })

// Characters that every image can contain, regardless of language.
const common = 'CC101cc101jp.vercel.app/koenja0123456789 ·/-'
const chars = (langs) =>
  [...new Set((common + langs.flatMap((l) => [text[l].title, text[l].subtitle, text[l].credit, ...text[l].badges]).join('')))].join('')

const families = {
  NotoSansKR: { query: 'Noto+Sans+KR', text: chars(['ko', 'en']) },
  NotoSansJP: { query: 'Noto+Sans+JP', text: chars(['ja', 'en']) },
}

for (const [name, { query, text: subset }] of Object.entries(families)) {
  const url = `https://fonts.googleapis.com/css2?family=${query}:wght@400;700&text=${encodeURIComponent(subset)}`
  // A legacy UA makes Google Fonts return TTF/WOFF (not WOFF2), which satori can read.
  const css = await (await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:20.0) Gecko/20100101 Firefox/20.0' } })).text()
  const blocks = css.match(/@font-face\s*{[^}]*}/g) ?? []
  for (const block of blocks) {
    const weight = block.match(/font-weight:\s*(\d+)/)?.[1]
    const src = block.match(/url\((https:[^)]+)\)\s*format\('(truetype|opentype|woff)'\)/)
    if (!weight || !src) throw new Error(`Unexpected @font-face block for ${name}:\n${block}`)
    const buf = Buffer.from(await (await fetch(src[1])).arrayBuffer())
    const file = join(outDir, `${name}-${weight}.${src[2] === 'woff' ? 'woff' : 'ttf'}`)
    await writeFile(file, buf)
    console.log(`${file}  ${buf.length} bytes`)
  }
}
