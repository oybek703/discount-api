import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable, tap, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Request, Response } from 'express'
import { DbLoggerService } from '../db-logger/db-logger.service'
import { DbLogType } from '../common/app.constants'
import { fromPromise } from 'rxjs/internal/observable/innerFrom'

@Injectable()
export class DbLoggerInterceptor implements NestInterceptor {
  constructor(@Inject(DbLoggerService) private readonly dbLoggerService: DbLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const req: Request = context.switchToHttp().getRequest()
    const res: Response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      catchError(err => {
        const responseTime = Date.now() - now
        const resStatusCode = err.status
        let errMessage = err.message
        if (err instanceof BadRequestException || err instanceof ForbiddenException) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          errMessage = String(err.getResponse().message)
        }
        return fromPromise(
          this.writeToDb(req, DbLogType.error, resStatusCode, responseTime, errMessage)
        ).pipe(() => throwError(err))
      }),
      tap(async () => {
        const responseTime = Date.now() - now
        await this.writeToDb(req, DbLogType.success, res.statusCode, responseTime)
      })
    )
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
