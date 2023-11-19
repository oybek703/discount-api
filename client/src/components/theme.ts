'use client'
import { createTheme } from '@mui/material'

export const customTheme = createTheme({
  palette: {
    primary: {
      main: '#397E74'
    },
    secondary: {
      main: 'rgba(0,192,77,0.96)'
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
