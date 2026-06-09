import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils'

export function ComparisonTable({ locale }: { locale: string }) {
  const t = useTranslations('Comparison')

  const rows = [
    'integratedSolution',
    'agronomistConsult',
    'customFormula',
    'droneService',
    'afterSalesSupport',
    'roi',
    'certifiedProducts',
  ]

  return (
    <section className="py-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className={cn('text-primary font-semibold text-sm uppercase tracking-widest mb-2', locale === 'th' && 'font-thai tracking-normal')}>
            {t('eyebrow')}
          </p>
          <h2 className={cn('text-3xl sm:text-4xl font-bold text-gray-900 mb-4', locale === 'th' && 'font-thai')}>
            {t('title')}
          </h2>
          <p className={cn('text-gray-600 max-w-2xl mx-auto', locale === 'th' && 'font-thai')}>
            {t('subtitle')}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header row */}
          <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-200">
            <div className="p-5 text-sm font-semibold text-gray-500">{t('featureCol')}</div>
            <div className="p-5 text-center text-sm font-semibold text-gray-500 border-l border-gray-200">
              {t('othersCol')}
            </div>
            <div className="p-5 text-center border-l border-gray-200 bg-primary/5">
              <div className="text-primary font-bold text-sm">SON AND KLIEN</div>
              <div className={cn('text-xs text-primary/70', locale === 'th' && 'font-thai')}>{t('usLabel')}</div>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, idx) => (
            <div
              key={row}
              className={cn(
                'grid grid-cols-3 border-b border-gray-100 last:border-0',
                idx % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
              )}
            >
              <div className={cn('p-4 text-sm text-gray-700 flex items-center', locale === 'th' && 'font-thai')}>
                {t(`row_${row}`)}
              </div>
              <div className="p-4 flex items-center justify-center border-l border-gray-100">
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <div className="p-4 flex items-center justify-center border-l border-gray-100 bg-primary/5">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className={cn('text-center text-sm text-gray-400 mt-6', locale === 'th' && 'font-thai')}>
          {t('footnote')}
        </p>
      </div>
    </section>
  )
}
