import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AppRoutePaths } from '@/common/constants'
import { Grid } from '@mui/material'

const Logo = () => {
  return (
    <Grid container component={Link} sx={{ alignItems: 'center' }} href={AppRoutePaths.home}>
      <Image src={'/logo.svg'} alt={'Page logo'} width={100} height={40} priority />
    </Grid>
  )
}

export default Logo
