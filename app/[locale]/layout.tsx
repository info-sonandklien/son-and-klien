import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Noto_Sans_Thai } from 'next/font/google'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import '../globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  return {
    title: { default: t('title'), template: `%s | SON AND KLIEN` },
    description: t('description'),
    keywords: t('keywords'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://sonandklien.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: { th: '/th', en: '/en' },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'th' ? 'th_TH' : 'en_US',
      siteName: 'SON AND KLIEN',
      title: t('title'),
      description: t('description'),
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'SON AND KLIEN' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
    robots: { index: true, follow: true },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  const messages = await getMessages()

  return (
    <html
      lang={locale === 'th' ? 'th' : 'en'}
      className={`${inter.variable} ${notoSansThai.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
