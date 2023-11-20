import createMiddleware from 'next-intl/middleware'
import { AvailableLocales } from '@/common/constants'
import { locales } from './navigation'

export default createMiddleware({
  locales,
  defaultLocale: AvailableLocales.ru
})

export const config = {
  // Match only internationalized pathNames
  matcher: ['/', '/(ru|uz|en)/:path*']
}
