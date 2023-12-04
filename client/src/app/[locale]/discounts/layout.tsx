import React, { Fragment } from 'react'
import { Metadata } from 'next'
import { ILocalParams } from '@/interfaces/i18n.interfaces'
import { getTranslations } from 'next-intl/server'
import { LocalizationKeys } from '@/common/constants'

export async function generateMetadata({ params }: { params: ILocalParams }): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale })
  return {
    title: t(LocalizationKeys.discountsLink)
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <Fragment>{children}</Fragment>
}
