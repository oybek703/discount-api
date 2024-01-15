import { Injectable, Logger } from '@nestjs/common'
import { LogDto } from './dtos/log.dto'
import { Request } from 'express'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Log } from './schemas/logs.schema'
import { TgBotLogDto } from './dtos/tg-bot-log.dto'
import { TgBotLog } from './schemas/tg-bot-log.schema'

@Injectable()
export class DbLoggerService {
  private readonly logger = new Logger(DbLoggerService.name)

  constructor(
    @InjectModel(Log.name) private logModel: Model<Log>,
    @InjectModel(TgBotLog.name) private tgBotLogModel: Model<TgBotLog>
  ) {}

  async insertLogToDb(req: Request, body: LogDto) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const route = req.url
    const method = req.method
    try {
      const newLog = new this.logModel()
      newLog.log_type = body.log_type
      newLog.ip_address = ip?.toString()
      newLog.route = route
      newLog.error_message = body.error_message
      newLog.status_code = body.status_code
      newLog.response_time = body.response_time
      newLog.method = method
      await newLog.save()
      return true
    } catch (e: unknown) {
      this.logger.error(`Error while writing log to db: ${e.toString()}`)
      return false
    }
  }

  async insertTgLogToDb(body: TgBotLogDto) {
    try {
      const newTgBotLog = new this.tgBotLogModel(body)
      await newTgBotLog.save()
      return true
    } catch (e: unknown) {
      this.logger.error(`Error while writing tg-log log to db: ${e.toString()}`)
      return false
    }
  }
}
