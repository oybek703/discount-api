import type { Metadata } from 'next'
import './globals.css'
import { Fragment } from 'react'
import { Grid, ThemeProvider } from '@mui/material'
import { customTheme } from '@/components/theme'
import Header from '@/components/layout/Header'
import Main from '@/components/layout/Main'
import Footer from '@/components/layout/Footer'
import { ILocalParams } from '@/interfaces/i18n.interfaces'
import { AvailableLocales, BaseColors } from '@/common/constants'
import { locales } from '@/navigation'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import NextTopLoader from 'nextjs-toploader'

export const metadata: Metadata = {
  title: 'TopAksiya',
  description: "Aksiya, chegirma hamda do'konlar katalogi"
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: ILocalParams
}) {
  const { locale = AvailableLocales.ru } = params
  if (!locales.includes(locale)) notFound()
  let messages
  try {
    messages = (await import(`../../../locales/${locale}.json`)).default
  } catch (error) {
    console.log(error)
    notFound()
  }
  return (
    <Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/public/favicon.ico" />
      <html lang={locale}>
        <body>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider theme={customTheme}>
              <NextTopLoader
                color={BaseColors.secondary}
                initialPosition={0.08}
                crawlSpeed={200}
                height={4}
                crawl={true}
                showSpinner={false}
                easing="ease"
                speed={400}
                shadow={`0 0 10px ${BaseColors.secondary},0 0 5px ${BaseColors.secondary}`}
              />
              <Grid id="container">
                <Header currentLocale={locale} />
                <Main>{children}</Main>
                <Footer />
              </Grid>
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </Fragment>
  )
}
