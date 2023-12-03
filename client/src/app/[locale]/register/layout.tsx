import { FC, PropsWithChildren } from 'react'
import { Metadata } from 'next'
import { ILocalParams } from '@/interfaces/i18n.interfaces'
import { getTranslations } from 'next-intl/server'
import { LocalizationKeys } from '@/common/constants'

export async function generateMetadata({ params }: { params: ILocalParams }): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale })
  return {
    title: t(LocalizationKeys.register)
  }
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return children
}

export default Layout
