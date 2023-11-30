'use client'
import React from 'react'
import { Link, usePathname } from '@/navigation'
import { AvailableLocales } from '@/common/constants'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Chip } from '@mui/material'

const ChipLabel = ({
  locale,
  currentLocale
}: {
  locale: AvailableLocales
  currentLocale: AvailableLocales
}) => {
  const pathName = usePathname()
  return (
    <Chip
      sx={{
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: theme =>
          locale === currentLocale ? theme.palette.secondary.main : 'white',
        color: theme => (locale === currentLocale ? 'white' : 'initial')
      }}
      size="small"
      label={locale}
      component={Link}
      locale={locale}
      href={pathName}
    />
  )
}

const SwitchLocale = ({ currentLocale }: { currentLocale: AvailableLocales }) => {
  return (
    <ButtonGroup
      sx={{
        backgroundColor: theme => theme.palette.primary.main,
        border: '1px solid white',
        padding: '4px 6px',
        display: 'flex',
        columnGap: '5px'
      }}
      size="small"
    >
      <ChipLabel currentLocale={currentLocale} locale={AvailableLocales.ru} />
      <ChipLabel currentLocale={currentLocale} locale={AvailableLocales.uz} />
      <ChipLabel currentLocale={currentLocale} locale={AvailableLocales.en} />
    </ButtonGroup>
  )
}

export default SwitchLocale
