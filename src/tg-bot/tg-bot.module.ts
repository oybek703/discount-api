import { Logger, Module } from '@nestjs/common'
import { TgBotService } from './tg-bot.service'
import { TgBotUpdate } from './tg-bot.update'
import { RedisService } from './redis.service'
import { UserInfoWizard } from './scenes/user-info.wizard'
import { TgBotI18nService } from './tg-bot-i18n.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TgUser, TgUserSchema } from './schemas/tg-user.schema'
import { TelegrafModule } from 'nestjs-telegraf'
import { ConfigService } from '@nestjs/config'
import { getTgBotConfig } from '../configs/tg-bot.config'
import { ChangeLanguageWizard } from './scenes/change-language.wizard'
import { AddDiscountWizard } from './scenes/add-discount.wizard'
import { DiscountsService } from '../discounts/discounts.service'
import { DiscountsModule } from '../discounts/discounts.module'

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      imports: [TgBotModule],
      inject: [ConfigService, RedisService, TgBotI18nService],
      useFactory: getTgBotConfig
    }),
    MongooseModule.forFeature([{ name: TgUser.name, schema: TgUserSchema }]),
    DiscountsModule
  ],
  providers: [
    TgBotUpdate,
    TgBotService,
    Logger,
    RedisService,
    UserInfoWizard,
    TgBotI18nService,
    ChangeLanguageWizard,
    AddDiscountWizard
  ],
  exports: [RedisService, TgBotI18nService]
})
export class TgBotModule {}
