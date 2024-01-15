import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'
import { Request } from 'express'
import { DbLoggerService } from '../db-logger/db-logger.service'
import { DbLogType } from '../common/app.constants'
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

  async writeToDb(
    req: Request,
    logType: DbLogType,
    resStatusCode: number,
    responseTime: number,
    errMessage?: string
  ) {
    await this.dbLoggerService.insertLogToDb(req, {
      log_type: logType,
      error_message: errMessage,
      response_time: responseTime,
      status_code: resStatusCode?.toString()
    })
  }
}
