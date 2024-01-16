import { Context, Hears, On, Start, Update } from 'nestjs-telegraf'
import { TgBotService } from './tg-bot.service'
import { Logger, UseFilters, UseInterceptors } from '@nestjs/common'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { LanguageTexts, SceneIds } from '../common/app.constants'
// @ts-expect-error this module has match export
import { match } from 'telegraf-i18n'
import { TgBotLoggerInterceptor } from '../interceptors/tg-bot-logger.interceptor'
import { TelegrafExceptionFilter } from './tg-bot.filter'
import { InjectModel } from '@nestjs/mongoose'
import { TgUser, TgUserDocument } from './schemas/tg-user.schema'
import { Model } from 'mongoose'

@Update()
@UseInterceptors(TgBotLoggerInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class TgBotUpdate {
  private readonly logger = new Logger(TgBotUpdate.name)

  constructor(
    private readonly tgBotService: TgBotService,
    @InjectModel(TgUser.name) private readonly tgUserModel: Model<TgUserDocument>
  ) {}

  @Start()
  async onStart(@Context() ctx: BotContext) {
    const { from } = ctx
    const existingTgUser = await this.tgBotService.findTgUserByPhoneOrId(from.id, '')
    if (!existingTgUser) return await ctx.scene.enter(SceneIds.getUserInfo)
    else await ctx.reply('Welcome')
  }

  @Hears(match(LanguageTexts.addDiscount))
  async onChatStart(@Context() ctx: BotContext) {
    const { id: tgId } = ctx.message.from
    const { username: botUsername } = ctx.botInfo
    await ctx.reply(`Hi ${tgId}, ${botUsername}`)
  }

  @On('text')
  async onOtherText(@Context() ctx: BotContext) {}
}
