import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustSection } from '@/components/home/TrustSection'
import { ServicesGrid } from '@/components/home/ServicesGrid'
import { ComparisonTable } from '@/components/home/ComparisonTable'
import { CtaSection } from '@/components/home/CtaSection'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AIChatWidget } from '@/components/ai/AIChatWidget'
import { FloatingButtons } from '@/components/lead/FloatingButtons'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <>
      <Header locale={locale} />
      <main id="main-content">
        <HeroSection locale={locale} />
        <TrustSection locale={locale} />
        <ServicesGrid locale={locale} />
        <ComparisonTable locale={locale} />
        <CtaSection locale={locale} />
      </main>
      <Footer locale={locale} />
      <AIChatWidget locale={locale} />
      <FloatingButtons />
    </>
  )
}
