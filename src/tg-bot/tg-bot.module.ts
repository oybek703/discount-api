import { Logger, Module } from '@nestjs/common'
import { TgBotService } from './tg-bot.service'
import { TgBotUpdate } from './tg-bot.update'
import { RedisService } from './redis.service'
import { UserInfoWizard } from './scenes/user-info.wizard'
import { TgBotI18nService } from './tg-bot-i18n.service'
import { MongooseModule } from '@nestjs/mongoose'
import { TgUser, TgUserSchema } from './schemas/tg-user.schema'
import { ChangeLanguageWizard } from './scenes/change-language.wizard'
import { DiscountsModule } from '../discounts/discounts.module'
import { AddDiscountWizard } from './scenes/add-discount.wizard'
import { Category, CategorySchema } from '../discounts/schemas/category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TgUser.name, schema: TgUserSchema },
      { name: Category.name, schema: CategorySchema }
    ]),
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
