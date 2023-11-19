import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { envFilePath } from './common/utils'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getDbConfig } from './configs/db.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...getDbConfig(),
        entities: [],
        autoLoadEntities: true
      })
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
