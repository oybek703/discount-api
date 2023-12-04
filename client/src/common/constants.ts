export enum AppRoutePaths {
  home = '/',
  discounts = '/discounts',
  shops = '/shops',
  contacts = '/contacts',
  login = '/login',
  register = '/register',
  profile = '/profile'
}

export enum AvailableLocales {
  ru = 'ru',
  uz = 'uz',
  en = 'en'
}

export enum LocalizationKeys {
  discountsLink = 'header.navigation.discounts',
  shopsLink = 'header.navigation.shops',
  contactsLink = 'header.navigation.contacts',
  userAccountBtn = 'header.user.account',
  profileBtn = 'header.user.profile',
  logoutBtn = 'header.user.logout',
  firstName = 'auth.firstName',
  lastName = 'auth.lastName',
  username = 'auth.username',
  password = 'auth.password',
  sendBtn = 'auth.sendBtn',
  authMinLength = 'auth.minLength',
  doNotHaveAccount = 'auth.doNotHaveAccount',
  alreadyHaveAccount = 'auth.alreadyHaveAccount',
  login = 'header.user.login',
  register = 'header.user.register',
  footerText = 'footerText',
  homePageTitle = 'titles.homePageTitle',
  searchPlaceholder = 'searchPlaceholder',
  mainPageKeywords = 'mainPageKeywords'
}

export enum BaseColors {
  primary = '#397E74',
  secondary = 'rgba(55,129,226,0.96)'
}

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const usernameRegex = /^(?=.{4})[a-z][a-z\d]*_?[a-z\d]+$/i
