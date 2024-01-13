import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type RedisSessionType from 'telegraf-session-redis'
import { EnvVariablesKeys, sessionPrefix } from '../common/app.constants'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RedisSession = require('telegraf-session-redis')

@Injectable()
export class RedisService {
  public readonly session: RedisSessionType

  constructor(readonly configService: ConfigService) {
    const redisHost = configService.get(EnvVariablesKeys.redisHost)
    const redisPort = configService.get(EnvVariablesKeys.redisPort)
    if (!redisHost || !redisPort) {
      throw new Error('Error while connecting to Redis.')
    }
    this.session = new RedisSession({
      store: {
        host: redisHost,
        port: redisPort,
        prefix: sessionPrefix
      },
      ttl: 3 * 3600
    })
  }
}
