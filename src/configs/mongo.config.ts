import { MongooseModuleFactoryOptions } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys } from '../common/app.constants'

export const getMongoConfig = (configService: ConfigService): MongooseModuleFactoryOptions => {
  const dbURI = configService.get(EnvVariablesKeys.dbURI)
  const dbName = configService.get(EnvVariablesKeys.dbName)
  const dbUser = configService.get(EnvVariablesKeys.dbUser)
  const dbUserPassword = configService.get(EnvVariablesKeys.dbUserPassword)
  return { uri: dbURI, dbName, user: dbUser, pass: dbUserPassword }
}
