import { Context, Hears, InjectBot, Start, TELEGRAF_STAGE, Update } from 'nestjs-telegraf'
import { TgBotService } from './tg-bot.service'
import { Inject, Logger, OnModuleInit } from '@nestjs/common'
import { Scenes, Telegraf } from 'telegraf'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { LanguageTexts, SceneIds } from '../common/app.constants'
// @ts-expect-error this module has match export
import { match } from 'telegraf-i18n'

@Update()
export class TgBotUpdate implements OnModuleInit {
  private readonly logger = new Logger(TgBotUpdate.name)

  async onModuleInit() {
    this.bot.catch((err, ctx) => {
      if (err instanceof Error) {
        this.logger.error(`${err.message} \n ${err.stack}`)
      }
      ctx.reply(ctx.i18n.t(LanguageTexts.tryLater))
    })
  }

  constructor(
    private readonly tgBotService: TgBotService,
    @InjectBot() private readonly bot: Telegraf<BotContext>,
    @Inject(TELEGRAF_STAGE) private readonly stage: Scenes.Stage<BotContext>
  ) {
    stage.register()
    bot.use(this.stage.middleware())
  }

  @Start()
  async onStart(@Context() ctx: BotContext) {
    await ctx.scene.enter(SceneIds.getUserInfo)
  }

  @Hears(match(LanguageTexts.startChat))
  async onChatStart(@Context() ctx: BotContext) {
    const { id: tgId } = ctx.message.from
    const { username: botUsername } = ctx.botInfo
    await ctx.reply(`Hi ${tgId}, ${botUsername}`)
  }
}
