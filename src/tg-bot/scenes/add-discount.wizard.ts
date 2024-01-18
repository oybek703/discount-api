import { Context, Wizard, WizardStep, Message, On, Hears } from 'nestjs-telegraf'
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
import { mainMenuKeyboard, sendNumberKeyboard } from '../keyboards'
import { InjectModel } from '@nestjs/mongoose'
import { TgUser, TgUserDocument } from '../schemas/tg-user.schema'
import { Model } from 'mongoose'
import { TgBotService } from '../tg-bot.service'
import { DiscountsService } from '../../discounts/discounts.service'
import { message } from 'telegraf/filters'

@Wizard(SceneIds.addDiscount)
@UseFilters(TelegrafExceptionFilter)
export class AddDiscountWizard {
  constructor(
    @InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUserDocument>,
    private readonly discountsService: DiscountsService,
    private readonly tgBotService: TgBotService
  ) {}

  // STEP - 1 Ask brief title
  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.discountTitle))
    ctx.wizard.next()
  }

  // STEP - 2 Get title and ask detailed description
  @WizardStep(2)
  @UseInterceptors(TgBotLoggerInterceptor)
  async step2(@Context() ctx: BotContext, @Message('text') msg: string) {
    ctx.scene.session.discount.title = msg
    await ctx.reply(ctx.i18n.t(LanguageTexts.discountDescription))
    ctx.wizard.next()
  }

  // STEP - 3 Get description and ask pictures
  @WizardStep(3)
  @UseInterceptors(TgBotLoggerInterceptor)
  async step3(@Context() ctx: BotContext, @Message('text') msg: string) {
    ctx.scene.session.discount.description = msg
    await ctx.reply(ctx.i18n.t(LanguageTexts.discountPicture))
    ctx.wizard.next()
  }

  // STEP - 4 Get pictures and ask location
  @WizardStep(2)
  @On(['photo'])
  @UseInterceptors(TgBotLoggerInterceptor)
  async step4(@Context() ctx: BotContext, @Message('text') msg: string) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.discountLocation), sendNumberKeyboard(ctx))
    ctx.wizard.next()
  }

  // STEP - 4 Get location, save discount
  @WizardStep(4)
  @UseInterceptors(TgBotLoggerInterceptor)
  async step5(@Context() ctx: BotContext, @Message('text') msg: string) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.discountSaveText))
    await ctx.scene.leave()
  }
}
