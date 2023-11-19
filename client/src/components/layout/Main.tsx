import React, { FC, PropsWithChildren } from 'react'
import { Grid } from '@mui/material'

const Main: FC<PropsWithChildren> = ({ children }) => {
  return <Grid component="main">{children}</Grid>
}

export default Main
