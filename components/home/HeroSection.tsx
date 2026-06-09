'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function HeroSection({ locale }: { locale: string }) {
  const t = useTranslations('Hero')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#0B7A3E] via-[#0d8f48] to-[#2FA84F] pt-20">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Floating shapes */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-white animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className={locale === 'th' ? 'font-thai' : ''}>{t('badge')}</span>
            </div>

            {/* Headline */}
            <h1
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6',
                locale === 'th' && 'font-thai text-3xl sm:text-4xl lg:text-5xl'
              )}
            >
              {t('headline')}
            </h1>

            {/* Sub-headline */}
            <p
              className={cn(
                'text-lg sm:text-xl text-white/85 mb-8 max-w-xl',
                locale === 'th' && 'font-thai'
              )}
            >
              {t('subheadline')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/consultation`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-gray-900 font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl text-base"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={locale === 'th' ? 'font-thai' : ''}>{t('ctaPrimary')}</span>
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-base"
              >
                <span className={locale === 'th' ? 'font-thai' : ''}>{t('ctaSecondary')}</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              {[
                { num: t('stat1Num'), label: t('stat1Label') },
                { num: t('stat2Num'), label: t('stat2Label') },
                { num: t('stat3Num'), label: t('stat3Label') },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-2xl sm:text-3xl font-bold text-accent">{s.num}</div>
                  <div className={cn('text-xs sm:text-sm text-white/75 mt-1', locale === 'th' && 'font-thai')}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual card */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main card */}
              <div className="bg-white/15 backdrop-blur-md border border-white/25 rounded-3xl p-8 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold">{t('cardTitle')}</div>
                    <div className="text-sm text-white/70 font-thai">{t('cardSubtitle')}</div>
                  </div>
                </div>

                {/* Mini chart bars */}
                <div className="space-y-3">
                  {[
                    { label: locale === 'th' ? 'ข้าว' : 'Rice', pct: 85 },
                    { label: locale === 'th' ? 'ข้าวโพด' : 'Corn', pct: 72 },
                    { label: locale === 'th' ? 'มันสำปะหลัง' : 'Cassava', pct: 68 },
                    { label: locale === 'th' ? 'อ้อย' : 'Sugarcane', pct: 91 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={locale === 'th' ? 'font-thai' : ''}>{item.label}</span>
                        <span className="text-accent font-bold">+{item.pct}%</span>
                      </div>
                      <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent to-accent/70 rounded-full"
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-white/60 font-thai text-center">
                  {t('cardCaption')}
                </p>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-500">ISO 9001:2015</div>
                  <div className="text-sm font-bold text-gray-900">Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 50 960 10 720 30C480 50 240 10 0 20L0 60Z" fill="#F8FAF7" />
        </svg>
      </div>
    </section>
  )
}
