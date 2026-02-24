import { Suspense } from 'react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getSectionMetas, getAllSectionMarkdowns } from '@/lib/content'
import { PageClient } from '@/components/PageClient'
import { SectionBlock } from '@/components/SectionBlock'
import type { Lang } from '@/types'

interface PageProps {
  searchParams: Promise<{ lang?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const { lang: langParam } = await searchParams
  const lang = (langParam === 'en' ? 'en' : 'ko') as Lang

  const sections = getSectionMetas()
  const sectionContents = getAllSectionMarkdowns(lang)

  return (
    <Suspense>
      <PageClient lang={lang} sections={sections}>
        {sectionContents.map(({ meta, markdown }) => {
          const title = lang === 'ko' ? meta.title_ko : meta.title_en
          const description = lang === 'ko' ? meta.description_ko : meta.description_en
          const badge = lang === 'ko' ? meta.badge : (meta.badge_en ?? meta.badge)

          return (
            <SectionBlock
              key={meta.id}
              id={meta.id}
              order={meta.order}
              tier={meta.tier}
              title={title}
              description={description}
              badge={badge}
              lang={lang}
            >
              <MDXRemote
                source={markdown}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
              />
            </SectionBlock>
          )
        })}
      </PageClient>
    </Suspense>
  )
}
