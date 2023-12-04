import { ConflictException, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { COMMON_ERRORS } from '../common/app.constants'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findOne({ username: createUserDto.username })
    if (existingUser)
      throw new ConflictException(`${COMMON_ERRORS.userNameExists} ${createUserDto.username}`)
    const newUser = new this.userModel(createUserDto)
    return newUser.save()
  }

  findAll() {
    return `This action returns all users`
  }

  getByUsername(username: string) {
    return this.userModel.findOne({ username }).select('firstName lastName username createdAt')
  }

  findOne(userId: string) {
    return this.userModel.findById(userId)
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
