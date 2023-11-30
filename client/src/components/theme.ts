'use client'
import { createTheme } from '@mui/material'
import { BaseColors } from '@/common/constants'

export const customTheme = createTheme({
  palette: {
    primary: {
      main: BaseColors.primary
    },
    secondary: {
      main: BaseColors.secondary
    }
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'sans-serif'
    ].join(',')
  }
})
