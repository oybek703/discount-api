import { Markup } from 'telegraf'
import { LanguageTexts } from '../common/app.constants'
import { BotContext } from '../interfaces/tg-bot.interfaces'

export const languageKeyboard = Markup.keyboard([
  [LanguageTexts.ruLang, LanguageTexts.uzLang],
  [LanguageTexts.enLang]
]).resize()

export const mainMenuKeyboard = (ctx: BotContext) =>
  Markup.keyboard([
    ctx.i18n.t(LanguageTexts.addDiscount),
    ctx.i18n.t(LanguageTexts.changeLanguage)
  ]).resize()

export const sendNumberKeyboard = (ctx: BotContext) =>
  Markup.keyboard([
    { text: ctx.i18n.t(LanguageTexts.sendNumberBtnText), request_contact: true }
  ]).resize()
