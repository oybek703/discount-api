import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { TelegrafArgumentsHost } from 'nestjs-telegraf'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { TgBotService } from './tg-bot.service'

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TelegrafExceptionFilter.name)

  constructor(private readonly tgBotService: TgBotService) {}

  async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host)
    const ctx = telegrafHost.getContext<BotContext>()
    await this.tgBotService.catchException(exception, ctx, this.logger)
  }
}
