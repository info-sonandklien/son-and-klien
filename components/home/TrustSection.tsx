import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

const trustItems = [
  {
    key: 'experience',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    key: 'experts',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    key: 'farmers',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    key: 'certified',
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
]

export function TrustSection({ locale }: { locale: string }) {
  const t = useTranslations('Trust')

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <p className={cn('text-primary font-semibold text-sm uppercase tracking-widest mb-2', locale === 'th' && 'font-thai tracking-normal')}>
            {t('eyebrow')}
          </p>
          <h2 className={cn('text-3xl sm:text-4xl font-bold text-gray-900', locale === 'th' && 'font-thai')}>
            {t('title')}
          </h2>
        </div>

        {/* Trust cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item) => (
            <div
              key={item.key}
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{t(`${item.key}Num`)}</div>
              <div className={cn('text-sm font-semibold text-gray-900 mb-1', locale === 'th' && 'font-thai')}>
                {t(`${item.key}Label`)}
              </div>
              <div className={cn('text-xs text-gray-500', locale === 'th' && 'font-thai')}>
                {t(`${item.key}Sub`)}
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos strip */}
        <div className="mt-14 text-center">
          <p className={cn('text-gray-400 text-sm mb-6', locale === 'th' && 'font-thai')}>{t('partnersLabel')}</p>
          <div className="flex items-center justify-center gap-8 flex-wrap opacity-50 grayscale">
            {['DOA', 'BAAC', 'CP', 'DOAE', 'Yara'].map((name) => (
              <div
                key={name}
                className="h-8 px-4 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold text-sm"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
