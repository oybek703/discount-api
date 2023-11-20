import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import { AvailableLocales } from '@/common/constants'

export const locales = Object.keys(AvailableLocales)

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales
})
