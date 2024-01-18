import { Context, Message, Wizard, WizardStep } from 'nestjs-telegraf'
import { I18nLanguages, LanguageTexts, SceneIds } from '../../common/app.constants'
import { BotContext } from '../../interfaces/tg-bot.interfaces'
import { UseFilters, UseInterceptors } from '@nestjs/common'
import { TgBotLoggerInterceptor } from '../../interceptors/tg-bot-logger.interceptor'
import { TelegrafExceptionFilter } from '../tg-bot.filter'
import { languageKeyboard, mainMenuKeyboard } from '../keyboards'
import { InjectModel } from '@nestjs/mongoose'
import { TgUser, TgUserDocument } from '../schemas/tg-user.schema'
import { Model } from 'mongoose'
import { TgBotService } from '../tg-bot.service'

@Wizard(SceneIds.changeLanguage)
@UseFilters(TelegrafExceptionFilter)
export class ChangeLanguageWizard {
  constructor(
    @InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUserDocument>,
    private readonly tgBotService: TgBotService
  ) {}

  // STEP - 1 Give languages keyboard
  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.chooseLanguage), languageKeyboard)
    ctx.wizard.next()
  }

  // STEP - 2 Choose language and update
  @WizardStep(2)
  @UseInterceptors(TgBotLoggerInterceptor)
  async step2(@Context() ctx: BotContext, @Message('text') msg: string) {
    switch (msg) {
      case LanguageTexts.ruLang:
        ctx.i18n.locale(I18nLanguages.ru)
        break
      case LanguageTexts.uzLang:
        ctx.i18n.locale(I18nLanguages.uz)
        break
      case LanguageTexts.enLang:
        ctx.i18n.locale(I18nLanguages.en)
        break
      default:
        break
    }
    await ctx.reply(ctx.i18n.t(LanguageTexts.goodText), mainMenuKeyboard(ctx))
    await ctx.scene.leave()
  }
}
