import { Wizard, WizardStep, Context } from 'nestjs-telegraf'
import { LanguageTexts, SceneIds } from '../../common/app.constants'
import { BotContext } from '../../interfaces/tg-bot.interfaces'
import { UseInterceptors } from '@nestjs/common'
import { TgBotLoggerInterceptor } from '../../interceptors/tg-bot-logger.interceptor'

@Wizard(SceneIds.getUserInfo)
export class UserInfoWizard {
  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.enterFullName))
    ctx.wizard.next()
  }

  @WizardStep(2)
  @UseInterceptors(TgBotLoggerInterceptor)
  async step2(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.chatEndedError))
    await ctx.scene.leave()
  }
}
