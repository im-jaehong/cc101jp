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

export function getSectionMarkdown(section: SectionMeta, lang: Lang): string {
  const filePath = path.join(contentDir, lang === 'ko' ? section.file_ko : section.file_en)

  let raw = ''
  try {
    raw = fs.readFileSync(filePath, 'utf-8')
  } catch {
    // Fallback to Korean if English not available
    try {
      const fallbackPath = path.join(contentDir, section.file_ko)
      raw = fs.readFileSync(fallbackPath, 'utf-8')
    } catch {
      return `# ${lang === 'ko' ? section.title_ko : section.title_en}\n\n콘텐츠 준비 중입니다.`
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
