'use client'
import { Grid } from '@mui/material'
import { useTranslations } from 'next-intl'
import { LocalizationKeys } from '@/common/constants'

export default function Home() {
  const t = useTranslations()
  return (
    <Grid>
      <h1>{t(LocalizationKeys.homePageTitle)}</h1>
    </Grid>
  )
}
