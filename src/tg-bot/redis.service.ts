import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys, sessionPrefix } from '../common/app.constants'
import { Redis } from '@telegraf/session/redis'
import { SessionStore } from '@telegraf/session/types'

@Injectable()
export class RedisService {
  public readonly redisStore: SessionStore<unknown>

  constructor(readonly configService: ConfigService) {
    const redisUrl = configService.get(EnvVariablesKeys.redisUrl)
    if (!redisUrl) {
      throw new Error('Error while connecting to Redis.')
    }
    this.redisStore = Redis<unknown>({
      prefix: sessionPrefix,
      url: redisUrl
    })
  }
}
