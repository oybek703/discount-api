import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { RegisterDto } from './dto/register.dto'
import { compare } from 'bcrypt'
import { COMMON_ERRORS } from '../common/app.constants'
import { User, UserDocument } from '../users/schemas/user.schema'
import { LoginDto } from './dto/login.dto'
import { JwtService } from '@nestjs/jwt'
import { IJwtPayload } from '../interfaces/auth.interfaces'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async register(body: RegisterDto) {
    const newUser = await this.usersService.create(body)
    delete newUser.password
    return newUser
  }

  async login(body: LoginDto) {
    const user = await this.validateUser(body)
    const payload: IJwtPayload = { id: user?.id }
    return { token: this.jwtService.sign(payload) }
  }

  async validateUser(params: LoginDto): Promise<UserDocument | null> {
    const { username, password } = params
    const user = await this.userModel.findOne({ username })
    if (!user) throw new BadRequestException(COMMON_ERRORS.userDoesNotExist)
    const passwordValid = await compare(password, user.password)
    if (user && passwordValid) return user
  }
}
