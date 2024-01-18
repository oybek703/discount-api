import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { DbLoggerService } from '../db-logger/db-logger.service'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'
import { TgBotLogDto } from '../db-logger/dtos/tg-bot-log.dto'

@Injectable()
export class TgBotLoggerInterceptor implements NestInterceptor {
  constructor(@Inject(DbLoggerService) private readonly dbLoggerService: DbLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = TelegrafExecutionContext.create(context)
    const { message } = ctx.getContext<BotContext>()
    const tgBotDto: TgBotLogDto = {
      chatId: String(message.chat.id),
      isBot: message.from.is_bot,
      tgId: String(message.from.id),
      firstName: message.from.first_name,
      username: message.from.username,
      messageId: String(message.message_id),
      // @ts-ignore
      text: message.text
    }
    return next.handle().pipe(tap(fromPromise(this.dbLoggerService.insertTgLogToDb(tgBotDto))))
  }
}
