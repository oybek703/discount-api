import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys } from './common/app.constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const port = configService.get(EnvVariablesKeys.port)
  await app.listen(port)
}

;(async () => bootstrap())()
