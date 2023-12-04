import { IsString, Length } from 'class-validator'

export class CreateUserDto {
  @Length(3, 20)
  @IsString()
  firstName: string

  @Length(3, 20)
  @IsString()
  lastName: number

  @Length(3, 20)
  @IsString()
  username: string

  @Length(6, 20)
  password: string
}
