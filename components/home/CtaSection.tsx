import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function CtaSection({ locale }: { locale: string }) {
  const t = useTranslations('CTA')

  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-primary via-[#0d8f48] to-secondary rounded-3xl p-10 sm:p-16 text-white text-center overflow-hidden">
          {/* BG decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative">
            <p className={cn('text-accent font-semibold text-sm uppercase tracking-widest mb-3', locale === 'th' && 'font-thai tracking-normal')}>
              {t('eyebrow')}
            </p>
            <h2 className={cn('text-3xl sm:text-4xl font-bold mb-4', locale === 'th' && 'font-thai')}>
              {t('title')}
            </h2>
            <p className={cn('text-white/85 max-w-xl mx-auto mb-8 text-lg', locale === 'th' && 'font-thai')}>
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${locale}/consultation`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-gray-900 font-bold rounded-xl hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className={locale === 'th' ? 'font-thai' : ''}>{t('primaryBtn')}</span>
              </Link>
              <a
                href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '021234567'}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className={locale === 'th' ? 'font-thai' : ''}>{t('phoneBtn')}</span>
              </a>
            </div>

            {/* Reassurance */}
            <p className={cn('mt-6 text-white/60 text-sm', locale === 'th' && 'font-thai')}>
              {t('disclaimer')}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
