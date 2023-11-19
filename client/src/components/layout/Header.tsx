'use client'
import { AppBar, Button, Grid, Typography } from '@mui/material'
import React, { FC } from 'react'
import Logo from '@/components/helpers/Logo'
import Link from 'next/link'
import { AppRoutePaths } from '@/common/constants'
import { usePathname } from 'next/navigation'
import SearchComponent from '@/components/helpers/Search'
import AccountBtn from '@/components/helpers/AccountBtn'

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
  return (
    <Grid
      sx={{ display: 'flex', flexDirection: 'row' }}
      container
      component="ul"
      columnGap={'10px'}
    >
      <NavLink appRoutePath={AppRoutePaths.home} title="Bosh sahifa" />
      <NavLink appRoutePath={AppRoutePaths.discounts} title="Chegirmalar" />
      <NavLink appRoutePath={AppRoutePaths.about} title="Biz haqimizda" />
      <NavLink appRoutePath={AppRoutePaths.contact} title="Kontakt" />
    </Grid>
  )
}

const Header = () => {
  return (
    <AppBar position="sticky" component="header" sx={{ paddingX: '20px' }}>
      <Grid container sx={{ minHeight: '50px', alignItems: 'center' }}>
        <Grid item xs={2}>
          <Logo />
        </Grid>
        <Grid item xs={6}>
          <NavigationLinks />
        </Grid>
        <Grid item xs={4} justifyContent="flex-end" sx={{ textAlign: 'right' }}>
          <AccountBtn />
        </Grid>
      </Grid>
    </AppBar>
  )
}

export default Header
