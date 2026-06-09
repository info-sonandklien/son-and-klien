'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function FloatingButtons() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const lineUrl = process.env.NEXT_PUBLIC_LINE_OA_URL ?? 'https://line.me/R/ti/p/'

  return (
    <div className={cn('fixed left-4 bottom-6 z-40 flex flex-col gap-3 transition-all duration-300', visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none')}>
      {/* LINE button */}
      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 bg-[#06C755] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        aria-label="Chat on LINE"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.952 11.207C19.952 6.583 15.538 2.831 10.08 2.831 4.623 2.831.209 6.583.209 11.207c0 4.173 3.701 7.66 8.7 8.325.339.073.8.223.917.512.105.261.069.671.034.937l-.148.888c-.045.261-.209 1.021.895.557 1.104-.465 5.955-3.507 8.125-6.006 1.499-1.643 2.22-3.31 2.22-5.213z" />
        </svg>
      </a>

      {/* Phone button */}
      <a
        href={`tel:${process.env.NEXT_PUBLIC_PHONE ?? '021234567'}`}
        className="w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        aria-label="Call us"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </a>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className="w-12 h-12 bg-gray-700 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center"
        aria-label="Scroll to top"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </div>
  )
}
