import React from 'react'
import { useTranslations } from 'next-intl'
import { LocalizationKeys } from '@/common/constants'

const Page = () => {
  const t = useTranslations()
  return (
    <>
      <h1>{t(LocalizationKeys.shopsLink)}</h1>
    </>
  )
}

export default Page
