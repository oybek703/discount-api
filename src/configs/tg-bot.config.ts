import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys } from '../common/app.constants'
import { TelegrafModuleOptions } from 'nestjs-telegraf'
import { RedisService } from '../tg-bot/redis.service'
import { TgBotI18nService } from '../tg-bot/tg-bot-i18n.service'

export const getTgBotConfig = async (
  configService: ConfigService,
  redisService: RedisService,
  tgBotI18nService: TgBotI18nService
): Promise<TelegrafModuleOptions> => {
  const tgBotToken = configService.get(EnvVariablesKeys.tgBotToken)
  if (!tgBotToken) throw new Error(`${EnvVariablesKeys.tgBotToken} is required!`)
  return {
    token: tgBotToken,
    middlewares: [redisService.session, tgBotI18nService.i18n.middleware()]
  }
}
