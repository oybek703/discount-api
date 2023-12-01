'use client'
import React, { FC, createContext, PropsWithChildren, useState } from 'react'
import { AvailableLocales } from '@/common/constants'

export interface IAppContextState {
  drawer: boolean
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>

  appLocale: AvailableLocales
  setAppLocale: React.Dispatch<React.SetStateAction<AvailableLocales>>
}

const defaultFunc = () => {}

const initialState: IAppContextState = {
  drawer: false,
  setDrawer: defaultFunc,

  appLocale: AvailableLocales.ru,
  setAppLocale: defaultFunc
}

export const AppContext = createContext<IAppContextState>(initialState)

export const AppContextProvider: FC<PropsWithChildren & { locale: AvailableLocales }> = ({
  children,
  locale
}) => {
  const [appLocale, setAppLocale] = useState<AvailableLocales>(locale)
  const [drawer, setDrawer] = useState<boolean>(false)
  return (
    <AppContext.Provider value={{ drawer, setDrawer, appLocale, setAppLocale }}>
      {children}
    </AppContext.Provider>
  )
}
