'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { cn } from '@/lib/utils'

const services = [
  { key: 'soil', href: '/services/soil-analysis' },
  { key: 'fertilizer', href: '/services/fertilizer' },
  { key: 'pesticide', href: '/services/pesticide' },
  { key: 'seeds', href: '/services/seeds' },
  { key: 'equipment', href: '/services/equipment' },
  { key: 'drone', href: '/services/drone' },
  { key: 'consulting', href: '/services/consulting' },
]

export function Header({ locale }: { locale: string }) {
  const t = useTranslations('Navigation')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLocale = locale === 'th' ? 'en' : 'th'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S&K</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-gray-900 text-sm leading-tight">SON AND KLIEN</div>
              <div className="text-primary text-xs font-thai">โซลูชันเกษตรกรรมครบวงจร</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href={`/${locale}`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors"
            >
              {t('home')}
            </Link>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors flex items-center gap-1">
                {t('services')}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 p-3">
                  {services.map((s) => (
                    <Link
                      key={s.key}
                      href={`/${locale}${s.href}`}
                      className="block px-3 py-2 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
                    >
                      {t(`serviceItems.${s.key}`)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href={`/${locale}/about`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors"
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors"
            >
              {t('blog')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary rounded-md transition-colors"
            >
              {t('contact')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <Link
              href={`/${otherLocale}`}
              className="hidden sm:inline-flex items-center px-3 py-1.5 text-xs font-semibold border border-gray-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
            >
              {otherLocale === 'th' ? 'ไทย' : 'EN'}
            </Link>

            {/* CTA button */}
            <Link
              href={`/${locale}/consultation`}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-lg"
            >
              {t('bookConsultation')}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 space-y-1">
            <Link href={`/${locale}`} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              {t('home')}
            </Link>
            <Link href={`/${locale}/about`} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              {t('about')}
            </Link>
            <Link href={`/${locale}/blog`} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              {t('blog')}
            </Link>
            <Link href={`/${locale}/contact`} className="block px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary">
              {t('contact')}
            </Link>
            <div className="pt-2 border-t border-gray-100 flex gap-2 px-4">
              <Link href={`/${otherLocale}`} className="flex-1 text-center py-2 border border-gray-200 rounded-lg text-sm">
                {otherLocale === 'th' ? 'ไทย' : 'EN'}
              </Link>
              <Link href={`/${locale}/consultation`} className="flex-1 text-center py-2 bg-primary text-white rounded-lg text-sm font-semibold">
                {t('bookConsultation')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
