import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'
import { TgBotService } from '../tg-bot/tg-bot.service'

@Injectable()
export class TgBotLoggerInterceptor implements NestInterceptor {
  constructor(@Inject(TgBotService) private readonly tgBotService: TgBotService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const executionContext = TelegrafExecutionContext.create(context)
    const ctx = executionContext.getContext<BotContext>()
    return next.handle().pipe(tap(fromPromise(this.tgBotService.insertTgLogToDb(ctx))))
  }
}
