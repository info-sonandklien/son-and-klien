import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations('Footer')

  const services = [
    { key: 'soil', href: '/services/soil-analysis' },
    { key: 'fertilizer', href: '/services/fertilizer' },
    { key: 'pesticide', href: '/services/pesticide' },
    { key: 'seeds', href: '/services/seeds' },
    { key: 'equipment', href: '/services/equipment' },
    { key: 'drone', href: '/services/drone' },
    { key: 'consulting', href: '/services/consulting' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S&K</span>
              </div>
              <div>
                <div className="text-white font-bold text-sm">SON AND KLIEN</div>
                <div className="text-primary text-xs font-thai">Co., Ltd.</div>
              </div>
            </div>
            <p className={cn('text-sm text-gray-400 leading-relaxed mb-4', locale === 'th' && 'font-thai')}>
              {t('tagline')}
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              <a
                href={process.env.NEXT_PUBLIC_LINE_OA_URL ?? '#'}
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-colors"
                aria-label="LINE OA"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.952 11.207C19.952 6.583 15.538 2.831 10.08 2.831 4.623 2.831.209 6.583.209 11.207c0 4.173 3.701 7.66 8.7 8.325.339.073.8.223.917.512.105.261.069.671.034.937l-.148.888c-.045.261-.209 1.021.895.557 1.104-.465 5.955-3.507 8.125-6.006 1.499-1.643 2.22-3.31 2.22-5.213z" />
                </svg>
              </a>
              <a
                href={process.env.NEXT_PUBLIC_FACEBOOK_URL ?? '#'}
                className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className={cn('text-white font-bold mb-4 text-sm', locale === 'th' && 'font-thai')}>
              {t('servicesTitle')}
            </h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.key}>
                  <Link
                    href={`/${locale}${s.href}`}
                    className={cn('text-sm text-gray-400 hover:text-white transition-colors', locale === 'th' && 'font-thai')}
                  >
                    {t(`service_${s.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={cn('text-white font-bold mb-4 text-sm', locale === 'th' && 'font-thai')}>
              {t('companyTitle')}
            </h3>
            <ul className="space-y-2">
              {['about', 'team', 'blog', 'careers', 'contact'].map((page) => (
                <li key={page}>
                  <Link
                    href={`/${locale}/${page}`}
                    className={cn('text-sm text-gray-400 hover:text-white transition-colors', locale === 'th' && 'font-thai')}
                  >
                    {t(`page_${page}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={cn('text-white font-bold mb-4 text-sm', locale === 'th' && 'font-thai')}>
              {t('contactTitle')}
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className={cn('leading-relaxed', locale === 'th' && 'font-thai')}>{t('address')}</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${process.env.NEXT_PUBLIC_PHONE}`} className="hover:text-white transition-colors">
                  {process.env.NEXT_PUBLIC_PHONE ?? '02-123-4567'}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`} className="hover:text-white transition-colors">
                  {process.env.NEXT_PUBLIC_EMAIL ?? 'info@sonandklien.com'}
                </a>
              </li>
              <li className={cn('text-gray-500 text-xs', locale === 'th' && 'font-thai')}>
                {t('hours')}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={cn('text-xs text-gray-500', locale === 'th' && 'font-thai')}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex gap-4">
            {['privacy', 'terms', 'pdpa'].map((page) => (
              <Link
                key={page}
                href={`/${locale}/${page}`}
                className={cn('text-xs text-gray-500 hover:text-gray-300 transition-colors', locale === 'th' && 'font-thai')}
              >
                {t(`link_${page}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
