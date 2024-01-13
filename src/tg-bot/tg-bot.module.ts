import { Logger, Module } from '@nestjs/common'
import { TgBotService } from './tg-bot.service'
import { TgBotUpdate } from './tg-bot.update'
import { RedisService } from './redis.service'
import { UserInfoWizard } from './scenes/user-info.wizard'
import { TgBotI18nService } from './tg-bot-i18n.service'

@Module({
  providers: [TgBotUpdate, TgBotService, Logger, RedisService, UserInfoWizard, TgBotI18nService],
  exports: [RedisService, TgBotI18nService]
})
export class TgBotModule {}
