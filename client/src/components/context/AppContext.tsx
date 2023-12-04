'use client'
import React, { FC, createContext, PropsWithChildren, useState } from 'react'
import { AvailableLocales } from '@/common/constants'
import { AlertColor } from '@mui/material'

export interface ISnackbarProps {
  open: boolean
  message?: string | JSX.Element
  severity?: AlertColor
}

export interface IAppContextState {
  drawer: boolean
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>

  appLocale: AvailableLocales
  setAppLocale: React.Dispatch<React.SetStateAction<AvailableLocales>>

  snackbar?: ISnackbarProps
  setSnackbar: (data: ISnackbarProps) => void
}

const defaultFunc = () => {}

const initialState: IAppContextState = {
  drawer: false,
  setDrawer: defaultFunc,

  appLocale: AvailableLocales.ru,
  setAppLocale: defaultFunc,

  setSnackbar: defaultFunc
}

export const AppContext = createContext<IAppContextState>(initialState)

export const AppContextProvider: FC<PropsWithChildren & { locale: AvailableLocales }> = ({
  children,
  locale
}) => {
  const [appLocale, setAppLocale] = useState<AvailableLocales>(locale)
  const [drawer, setDrawer] = useState<boolean>(false)
  const [snackbar, setSnackbar] = useState<ISnackbarProps>({ open: false })
  return (
    <AppContext.Provider
      value={{ drawer, setDrawer, appLocale, setAppLocale, snackbar, setSnackbar }}
    >
      {children}
    </AppContext.Provider>
  )
}
