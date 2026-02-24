export type Lang = 'ko' | 'en'

export type SectionTier = 'core' | 'advanced'

export interface SectionMeta {
  id: string
  order: number
  tier: SectionTier
  slug: string
  title_ko: string
  title_en: string
  description_ko: string
  description_en: string
  icon: string
  badge?: string
  badge_en?: string
  file_ko: string
  file_en: string
}

export interface SectionContent {
  meta: SectionMeta
  content: string
}

export interface SectionsConfig {
  site: {
    name: string
    url: string
    description: string
    description_en: string
    version: string
    lastUpdated: string
  }
  sections: SectionMeta[]
  tiers: {
    core: { label_ko: string; label_en: string; description_ko: string; description_en: string; count: number }
    advanced: { label_ko: string; label_en: string; description_ko: string; description_en: string; count: number }
  }
}
