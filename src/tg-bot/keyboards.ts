import { Markup } from 'telegraf'
import { LanguageTexts } from '../common/app.constants'

export const languageKeyboard = Markup.keyboard([
  [LanguageTexts.ruLang, LanguageTexts.uzLang],
  [LanguageTexts.enLang]
]).resize()
