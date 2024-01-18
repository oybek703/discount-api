import { Injectable } from '@nestjs/common'
import type { I18n } from 'telegraf-i18n'
import { resolve } from 'path'
import { I18nLanguages } from '../common/app.constants'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const TelegrafI18n: typeof I18n = require('telegraf-i18n')

@Injectable()
export class TgBotI18nService {
  public readonly i18n: I18n

  constructor() {
    this.i18n = new TelegrafI18n({
      useSession: true,
      defaultLanguageOnMissing: true,
      directory: resolve(__dirname, './locales'),
      defaultLanguage: I18nLanguages.ru
    })
  }
}
