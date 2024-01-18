import { Context, Wizard, WizardStep, Message, On } from 'nestjs-telegraf'
import {
  foulWordsRegex,
  I18nLanguages,
  LanguageTexts,
  phoneNumberReg,
  SceneIds
} from '../../common/app.constants'
import { BotContext } from '../../interfaces/tg-bot.interfaces'
import { UseFilters, UseInterceptors } from '@nestjs/common'
import { TgBotLoggerInterceptor } from '../../interceptors/tg-bot-logger.interceptor'
import { TelegrafExceptionFilter } from '../tg-bot.filter'
import { languageKeyboard, mainMenuKeyboard, sendNumberKeyboard } from '../keyboards'
import { InjectModel } from '@nestjs/mongoose'
import { TgUser, TgUserDocument } from '../schemas/tg-user.schema'
import { Model } from 'mongoose'
import { TgBotService } from '../tg-bot.service'

@Wizard(SceneIds.getUserInfo)
@UseFilters(TelegrafExceptionFilter)
export class UserInfoWizard {
  constructor(
    @InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUserDocument>,
    private readonly tgBotService: TgBotService
  ) {}

  // STEP - 1 Give language keyboard
  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.chooseLanguage), languageKeyboard)
    ctx.wizard.next()
  }

  // STEP - 2 Choose language
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
    await ctx.reply(ctx.i18n.t(LanguageTexts.sendPhoneNumber), sendNumberKeyboard(ctx))
    ctx.wizard.next()
  }

  // STEP - 3 Get phone number
  @WizardStep(3)
  @On(['contact', 'text'])
  @UseInterceptors(TgBotLoggerInterceptor)
  async step3(@Context() ctx: BotContext, @Message('text') msg: string) {
    // @ts-ignore
    if (!msg) msg = ctx.message?.contact?.phone_number

    if (!phoneNumberReg.test(msg)) {
      await ctx.reply(ctx.i18n.t(LanguageTexts.sendPhoneNumber))
      return
    }
    const tgId = ctx.message.from.id
    const existingTgUser = await this.tgBotService.findTgUserByPhoneOrId(tgId, msg)
    if (existingTgUser) {
      ctx.session.fullName = `${existingTgUser.firstName} ${existingTgUser.lastName}`
      await ctx.reply(
        ctx.i18n.t(LanguageTexts.welcomeUser, { fullName: ctx.session.fullName }),
        mainMenuKeyboard(ctx)
      )
      return ctx.scene.leave()
    }
    ctx.session.phoneNumber = msg
    await ctx.reply(ctx.i18n.t(LanguageTexts.enterFullName))
    ctx.wizard.next()
  }

  // STEP - 4 Get fullName
  @WizardStep(4)
  @UseInterceptors(TgBotLoggerInterceptor)
  async step4(@Context() ctx: BotContext, @Message('text') msg: string) {
    if (!foulWordsRegex.test(msg)) {
      const { id: tgId, username: tgUsername, first_name, last_name } = ctx.message.from
      ctx.session.fullName = msg
      const { phoneNumber } = ctx.session
      await this.tgUserModel.create({
        tgUserId: tgId,
        phoneNumber,
        firstName: first_name,
        lastName: last_name,
        username: tgUsername
      })
      await ctx.reply(
        ctx.i18n.t(LanguageTexts.welcomeUser, { fullName: ctx.session.fullName }),
        mainMenuKeyboard(ctx)
      )
      return ctx.scene.leave()
    }
    await ctx.reply(ctx.i18n.t(LanguageTexts.badUsernameError))
    await ctx.reply(ctx.i18n.t(LanguageTexts.enterFullName))
  }
}
