import { config } from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { envFilePath } from './src/common/utils'
import { ConfigService } from '@nestjs/config'
import { EnvVariablesKeys } from './src/common/app.constants'
config({ path: envFilePath })

const configService = new ConfigService({ path: envFilePath })

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get(EnvVariablesKeys.dbHost),
  port: configService.get(EnvVariablesKeys.dbPort),
  username: configService.get(EnvVariablesKeys.dbUserName),
  password: configService.get(EnvVariablesKeys.dbUserPassword),
  database: configService.get(EnvVariablesKeys.dbName),
  entities: [],
  migrations: []
}

const dataSource = new DataSource(dataSourceOptions)

export default dataSource
