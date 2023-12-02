import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envFilePath } from './common/utils'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from './configs/mongo.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    MongooseModule.forRootAsync({ inject: [ConfigService], useFactory: getMongoConfig })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
