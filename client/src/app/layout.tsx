import type { Metadata } from 'next'
import './globals.css'
import { Fragment } from 'react'
import { Grid, ThemeProvider } from '@mui/material'
import { customTheme } from '@/components/theme'
import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'TopAksiya',
  description: "Aksiya, chegirma hamda do'konlar katalogi"
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/public/favicon.ico" />
      <html lang="uz">
        <body>
          <ThemeProvider theme={customTheme}>
            <Grid id="container">
              <Header />
              <Main>{children}</Main>
              <Footer />
            </Grid>
          </ThemeProvider>
        </body>
      </html>
    </Fragment>
  )
}
