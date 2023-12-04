import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envFilePath } from './common/utils'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from './configs/mongo.config'
import { UsersModule } from './users/users.module'
import { LoggerInterceptor } from './interceptors/logger.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { DbLoggerModule } from './db-logger/db-logger.module'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from './configs/jwt.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    MongooseModule.forRootAsync({ inject: [ConfigService], useFactory: getMongoConfig }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtConfig,
      global: true
    }),
    UsersModule,
    DbLoggerModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor
    }
  ]
})
export class AppModule {}
