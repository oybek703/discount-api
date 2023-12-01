'use client'
import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useTranslations } from 'next-intl'
import { LocalizationKeys } from '@/common/constants'

const Footer = () => {
  const t = useTranslations()
  return (
    <Grid
      container
      component="footer"
      justifyContent="center"
      sx={{ padding: '10px 0', backgroundColor: '#ccc', color: '#1b1b1b' }}
    >
      <Typography align="center" variant="subtitle2">
        ©2023 TOPAKSIYA - {t(LocalizationKeys.footerText)}
      </Typography>
    </Grid>
  )
}

export default Footer
