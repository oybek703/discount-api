import { Body, Controller, Post, UseInterceptors } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { DbLoggerInterceptor } from '../interceptors/db-logger.interceptor'

@UseInterceptors(DbLoggerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body)
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body)
  }
}
