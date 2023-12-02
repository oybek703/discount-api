import { MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys } from '../common/app.constants'

export const getMongoConfig = (configService: ConfigService): MongooseModuleFactoryOptions => {
  const dbURI = configService.get(EnvVariablesKeys.dbURI)
  return { uri: dbURI }
}
