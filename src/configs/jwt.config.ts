import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys } from '../common/app.constants'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJwtConfig = (configService: ConfigService): JwtModuleOptions => {
  const jwtSecret = configService.get(EnvVariablesKeys.jwtSecret)
  return { secret: jwtSecret, signOptions: { expiresIn: '24h' } }
}
