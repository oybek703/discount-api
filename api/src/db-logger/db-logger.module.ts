import { Global, Logger, Module } from '@nestjs/common'
import { DbLoggerService } from './db-logger.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Log, LogSchema } from './schemas/logs.schema'

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }])],
  providers: [DbLoggerService, Logger],
  exports: [DbLoggerService]
})
export class DbLoggerModule {}
