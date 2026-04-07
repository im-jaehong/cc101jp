import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Lang, SectionMeta, SectionsConfig } from '@/types'

const contentDir = path.join(process.cwd(), 'content')

export function getSectionsConfig(): SectionsConfig {
  const configPath = path.join(contentDir, 'sections.json')
  const raw = fs.readFileSync(configPath, 'utf-8')
  return JSON.parse(raw) as SectionsConfig
}

export function getSectionMetas(): SectionMeta[] {
  const config = getSectionsConfig()
  return config.sections.sort((a, b) => a.order - b.order)
}

function getLangFile(section: SectionMeta, lang: Lang): string {
  if (lang === 'ko') return section.file_ko
  if (lang === 'ja') return section.file_ja ?? section.file_ko
  return section.file_en
}

function getLangTitle(section: SectionMeta, lang: Lang): string {
  if (lang === 'ko') return section.title_ko
  if (lang === 'ja') return section.title_ja ?? section.title_ko
  return section.title_en
}

export function getSectionMarkdown(section: SectionMeta, lang: Lang): string {
  const filePath = path.join(contentDir, getLangFile(section, lang))

  let raw = ''
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    // Fallback to Korean if target language not available
    try {
      const fallbackPath = path.join(contentDir, section.file_ko)
      raw = fs.readFileSync(fallbackPath, 'utf-8')
    } catch {
      return `# ${getLangTitle(section, lang)}\n\nコンテンツ準備中です。`
    }
  }

  const { content } = matter(raw)
  return content
}

export function getAllSectionMarkdowns(lang: Lang): Array<{ meta: SectionMeta; markdown: string }> {
  const metas = getSectionMetas()
  return metas.map((meta) => ({
    meta,
    markdown: getSectionMarkdown(meta, lang),
  }))
}
