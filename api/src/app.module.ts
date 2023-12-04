import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envFilePath } from './common/utils'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from './configs/mongo.config'
import { UsersModule } from './users/users.module'
import { LoggerMiddleware } from './middlewares/logger.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    MongooseModule.forRootAsync({ inject: [ConfigService], useFactory: getMongoConfig }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
