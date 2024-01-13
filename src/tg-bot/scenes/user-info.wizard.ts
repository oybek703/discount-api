import { Wizard, WizardStep, Context } from 'nestjs-telegraf'
import { LanguageTexts, SceneIds } from '../../common/app.constants'
import { Injectable } from '@nestjs/common'
import { BotContext } from '../../interfaces/tg-bot.interfaces'

@Injectable()
@Wizard(SceneIds.getUserInfo)
export class UserInfoWizard {
  @WizardStep(1)
  async step1(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.chooseLanguage))
    ctx.wizard.next()
  }

  @WizardStep(2)
  async step2(@Context() ctx: BotContext) {
    await ctx.reply(ctx.i18n.t(LanguageTexts.pleaseWait))
    await ctx.scene.leave()
  }
}
