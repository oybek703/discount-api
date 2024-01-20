import { Module } from '@nestjs/common'
import { envFilePath } from './common/utils'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { getMongoConfig } from './configs/mongo.config'
import { UsersModule } from './users/users.module'
import { DbLoggerModule } from './db-logger/db-logger.module'
import { AuthModule } from './auth/auth.module'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from './configs/jwt.config'
import { DiscountsModule } from './discounts/discounts.module'
import { TgBotModule } from './tg-bot/tg-bot.module'

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
    AuthModule,
    DiscountsModule,
    TgBotModule
  ]
})
export class AppModule {}
