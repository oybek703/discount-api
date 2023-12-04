import { IsString, Length } from 'class-validator'

export class CreateUserDto {
  @Length(3, 10)
  @IsString()
  firstName: string

  @Length(3, 10)
  @IsString()
  lastName: number

  @Length(3, 10)
  @IsString()
  username: string

  @Length(6, 10)
  password: string
}
