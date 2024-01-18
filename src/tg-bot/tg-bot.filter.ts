import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { InjectBot, TelegrafArgumentsHost } from 'nestjs-telegraf'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { Telegraf } from 'telegraf'
import { LanguageTexts } from '../common/app.constants'

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TelegrafExceptionFilter.name)

  constructor(@InjectBot() private readonly bot: Telegraf<BotContext>) {}

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host)
    const ctx = telegrafHost.getContext<BotContext>()
    if (exception instanceof Error) {
      this.logger.error(`${exception.message} \n ${exception.stack}`)
    }
    await ctx.reply(ctx.i18n.t(LanguageTexts.tryLater))
  }
}
