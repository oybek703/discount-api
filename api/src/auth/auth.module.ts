import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersService } from '../users/users.service'
import { MongooseModule } from '@nestjs/mongoose'
import { User, UserSchema } from '../users/schemas/user.schema'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [AuthService, UsersService],
  controllers: [AuthController]
})
export class AuthModule {}
