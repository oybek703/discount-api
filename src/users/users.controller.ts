import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { UsersService } from './users.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { DbLoggerInterceptor } from '../interceptors/db-logger.interceptor'
import { AuthGuard } from '../auth/guards/jwt.guard'
import { LoggerInterceptor } from '../interceptors/logger.interceptor'

@UseInterceptors(DbLoggerInterceptor, LoggerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.usersService.getByUsername(username)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @Delete(':id')
  @UseInterceptors(LoggerInterceptor)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id)
  }
}
