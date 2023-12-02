import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AppRoutePaths } from '@/common/constants'
import { Grid } from '@mui/material'
import { AppContext } from '@/components/context/AppContext'

const Logo = () => {
  const { drawer, setDrawer } = useContext(AppContext)
  const handleClick = () => {
    if (drawer) setDrawer(false)
  }
  return (
    <Grid
      onClick={handleClick}
      container
      component={Link}
      sx={{ alignItems: 'center' }}
      href={AppRoutePaths.home}
    >
      <Image src={'/logo.svg'} alt={'Page logo'} width={90} height={40} priority />
    </Grid>
  )
}

export default Logo
