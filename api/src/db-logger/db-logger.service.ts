import { Injectable, Logger } from '@nestjs/common'
import { LogDto } from './dtos/log.dto'
import { Request } from 'express'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Log } from './schemas/logs.schema'

@Injectable()
export class DbLoggerService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<Log>,
    private readonly logger: Logger
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
}
