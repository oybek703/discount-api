import { Global, Logger, Module } from '@nestjs/common'
import { DbLoggerService } from './db-logger.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Log, LogSchema } from './schemas/logs.schema'
import { TgBotLog, TgBotLogSchema } from './schemas/tg-bot-log.schema'

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Log.name, schema: LogSchema },
      { name: TgBotLog.name, schema: TgBotLogSchema }
    ])
  ],
  providers: [DbLoggerService, Logger],
  exports: [DbLoggerService]
})
export class DbLoggerModule {}
