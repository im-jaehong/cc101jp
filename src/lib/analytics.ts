/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

function send(event: string, params: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params)
  }
}

export function trackSectionView(params: {
  section_id: string
  section_index: number
  content_type: 'core' | 'advanced'
  lang: string
}) {
  send('section_view', params)
}

export function trackGuideCompletion(params: {
  lang: string
}) {
  send('guide_completion', params)
}

export function trackCtaClick(params: {
  cta_id: string
  destination: string
  from_section?: string
  lang: string
}) {
  send('cta_click', params)
}

export function trackExternalLinkClick(params: {
  link_domain: string
  link_url: string
  from_section: string
}) {
  send('external_link_click', params)
}

export function trackLanguageToggle(params: {
  from: string
  to: string
}) {
  send('language_toggle', params)
}

export function trackTocClick(params: {
  target_section: string
  is_mobile: boolean
  lang: string
}) {
  send('toc_click', params)
}
