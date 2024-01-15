import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { DbLoggerService } from '../db-logger/db-logger.service'
import { TelegrafExecutionContext } from 'nestjs-telegraf'
import { BotContext } from '../interfaces/tg-bot.interfaces'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'

@Injectable()
export class TgBotLoggerInterceptor implements NestInterceptor {
  constructor(@Inject(DbLoggerService) private readonly dbLoggerService: DbLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = TelegrafExecutionContext.create(context)
    const { from, message } = ctx.getContext<BotContext>()
    return next
      .handle()
      .pipe(tap(fromPromise(this.dbLoggerService.insertTgLogToDb({ message, from }))))
  }
}
