import { LangSetter } from './LangSetter'

interface LangLayoutProps {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params
  return (
    <>
      <LangSetter lang={lang} />
      {children}
    </>
  )
}
