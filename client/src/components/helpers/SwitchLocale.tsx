'use client'
import React, { useContext } from 'react'
import { Link, usePathname } from '@/navigation'
import { AvailableLocales } from '@/common/constants'
import ButtonGroup from '@mui/material/ButtonGroup'
import { Chip } from '@mui/material'
import { AppContext } from '@/components/context/AppContext'

const ChipLabel = ({ locale }: { locale: AvailableLocales }) => {
  const pathName = usePathname()
  const { appLocale } = useContext(AppContext)
  return (
    <Chip
      sx={{
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: theme => (locale === appLocale ? theme.palette.secondary.main : 'white'),
        color: theme => (locale === appLocale ? 'white' : 'initial')
      }}
      size="small"
      label={locale}
      component={Link}
      locale={locale}
      href={pathName}
    />
  )
}

const SwitchLocale = () => {
  return (
    <ButtonGroup
      sx={{
        backgroundColor: theme => theme.palette.primary.main,
        border: '1px solid white',
        padding: '3px 6px',
        display: 'flex',
        columnGap: '5px'
      }}
      size="small"
    >
      <ChipLabel locale={AvailableLocales.ru} />
      <ChipLabel locale={AvailableLocales.uz} />
      <ChipLabel locale={AvailableLocales.en} />
    </ButtonGroup>
  )
}

export default SwitchLocale
