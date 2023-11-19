import React from 'react'
import { Grid, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Grid
      container
      component="footer"
      justifyContent="center"
      sx={{ padding: '10px 0', backgroundColor: '#ccc', color: '#1b1b1b' }}
    >
      <Typography align="center">
        ©2023 TopAksiya.uz - Aksiyalar, chegirmalar va O&rsquo;zbekistondagi do&rsquo;konlar
        katalogi.
      </Typography>
    </Grid>
  )
}

export default Footer
