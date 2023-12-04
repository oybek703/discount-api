import React, { Fragment } from 'react'
import { Metadata } from 'next'
import { ILocalParams } from '@/interfaces/i18n.interfaces'
import { getTranslations } from 'next-intl/server'
import { AppRoutePaths, LocalizationKeys } from '@/common/constants'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'
import { redirect } from '@/navigation'

export async function generateMetadata({ params }: { params: ILocalParams }): Promise<Metadata> {
  const { locale } = params
  const t = await getTranslations({ locale })
  return {
    title: t(LocalizationKeys.profileBtn)
  }
}

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect(AppRoutePaths.login)
  return <Fragment>{children}</Fragment>
}
