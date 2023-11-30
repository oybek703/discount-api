'use client'
import { AppBar, Button, Grid } from '@mui/material'
import React, { FC } from 'react'
import Logo from '@/components/helpers/Logo'
import { AppRoutePaths, AvailableLocales, LocalizationKeys } from '@/common/constants'
import AccountBtn from '@/components/helpers/AccountBtn'
import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'
import SwitchLocale from '@/components/helpers/SwitchLocale'

interface INavLinkProps {
  appRoutePath: AppRoutePaths
  title: string
}

const NavLink: FC<INavLinkProps> = ({ appRoutePath, title }) => {
  const pathName = usePathname()
  return (
    <Grid component="li" sx={{ listStyleType: 'none', textDecoration: 'none' }}>
      <Button
        color={pathName === appRoutePath ? 'secondary' : 'primary'}
        variant={pathName === appRoutePath ? 'contained' : 'outlined'}
        sx={{
          color: '#fff',
          border: '1px solid #fff',
          borderRadius: '5px',
          textTransform: 'none',
          padding: '3px 12px',
          '&:hover': {
            border: '1px solid #fff'
          }
        }}
        component={Link}
        href={appRoutePath}
      >
        {title}
      </Button>
    </Grid>
  )
}

const NavigationLinks = () => {
  const t = useTranslations()
  return (
    <Grid
      sx={{ display: 'flex', flexDirection: 'row' }}
      container
      component="ul"
      columnGap={'10px'}
    >
      <NavLink appRoutePath={AppRoutePaths.home} title={t(LocalizationKeys.mainLink)} />
      <NavLink appRoutePath={AppRoutePaths.discounts} title={t(LocalizationKeys.discountsLink)} />
      <NavLink appRoutePath={AppRoutePaths.about} title={t(LocalizationKeys.aboutLink)} />
      <NavLink appRoutePath={AppRoutePaths.contacts} title={t(LocalizationKeys.contactsLink)} />
    </Grid>
  )
}

const Header = ({ currentLocale }: { currentLocale: AvailableLocales }) => {
  return (
    <AppBar position="sticky" component="header" sx={{ paddingLeft: '20px' }}>
      <Grid container sx={{ minHeight: '50px', alignItems: 'center' }}>
        <Grid item xs={2}>
          <Logo />
        </Grid>
        <Grid item xs={6}>
          <NavigationLinks />
        </Grid>
        <Grid item xs={4}>
          <Grid container justifyContent="space-around" alignItems="center">
            <SwitchLocale currentLocale={currentLocale} />
            <AccountBtn />
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header
