'use client'
import { AppBar, Button, Drawer, Grid, IconButton, useMediaQuery } from '@mui/material'
import React, { FC, Fragment, useContext, useEffect, useState } from 'react'
import Logo from '@/components/helpers/Logo'
import { AppRoutePaths, LocalizationKeys } from '@/common/constants'
import AccountBtn from '@/components/helpers/AccountBtn'
import { Link, usePathname } from '@/navigation'
import { useTranslations } from 'next-intl'
import SwitchLocale from '@/components/helpers/SwitchLocale'
import MenuIcon from '@mui/icons-material/Menu'
import SearchComponent from '@/components/helpers/Search'
import { AppContext } from '@/components/context/AppContext'

interface INavLinkProps {
  appRoutePath: AppRoutePaths
  title: string
}

const NavLink: FC<INavLinkProps> = ({ appRoutePath, title }) => {
  const pathName = usePathname()
  const { drawer, setDrawer } = useContext(AppContext)
  const handleClick = () => {
    if (drawer) setDrawer(false)
  }
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
          padding: '1px 10px',
          '&:hover': {
            border: '1px solid #fff'
          }
        }}
        onClick={handleClick}
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
    <>
      <NavLink appRoutePath={AppRoutePaths.discounts} title={t(LocalizationKeys.discountsLink)} />
      <NavLink appRoutePath={AppRoutePaths.shops} title={t(LocalizationKeys.shopsLink)} />
      <NavLink appRoutePath={AppRoutePaths.contacts} title={t(LocalizationKeys.contactsLink)} />
    </>
  )
}

const Header = () => {
  const [isRenderFinished, setIsRenderFinished] = useState(false)
  const maxWidth1200 = useMediaQuery('(max-width:1200px)')
  const { drawer, setDrawer, appLocale } = useContext(AppContext)
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setDrawer(open)
  }
  useEffect(() => {
    setIsRenderFinished(true)
  }, [])

  return (
    <Fragment>
      <AppBar position="sticky" component="header" sx={{ pr: '20px', pl: '10px' }}>
        <Grid
          container
          sx={{ minHeight: '50px', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Grid sx={{ flexBasis: '2% !important' }} item xs={2}>
            <Logo />
          </Grid>
          {maxWidth1200 ? (
            <Fragment>
              <Grid item xs={9}>
                <Grid container columnGap="10px" alignItems="center" justifyContent="flex-end">
                  <Grid item xs={10}>
                    <SearchComponent />
                  </Grid>
                  <Grid item xs={1} justifyItems="flex-end">
                    <IconButton onClick={() => setDrawer(true)}>
                      <MenuIcon
                        fontSize="medium"
                        sx={{ cursor: 'pointer', color: 'white', fontSize: '1.2em' }}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Fragment>
          ) : (
            <>
              {isRenderFinished && (
                <Fragment>
                  <Grid item xs={6}>
                    <Grid container alignItems="center">
                      <Grid item xs={6}>
                        <Grid
                          container
                          sx={{ display: 'flex', flexDirection: 'row' }}
                          component="ul"
                          columnGap={'10px'}
                        >
                          <NavigationLinks />
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <SearchComponent />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <Grid container justifyContent="right" columnGap="20px" alignItems="center">
                      <SwitchLocale />
                      <AccountBtn />
                    </Grid>
                  </Grid>
                </Fragment>
              )}
            </>
          )}
        </Grid>
      </AppBar>
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: theme => theme.palette.primary.main,
            padding: '10px 1.5em',
            minWidth: '25%'
          }
        }}
        anchor="left"
        open={drawer}
        onClose={toggleDrawer(false)}
      >
        <Grid container justifyContent="center">
          <Grid>
            <Logo />
            <Grid sx={{ my: '20px' }}>
              <SwitchLocale />
            </Grid>
            <Grid
              container
              sx={{ display: 'flex', flexDirection: 'column', mt: '20px' }}
              component="ul"
              rowGap={'10px'}
            >
              <NavigationLinks />
              <AccountBtn />
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </Fragment>
  )
}

export default Header
