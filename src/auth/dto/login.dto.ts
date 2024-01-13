import { IsString, Length } from 'class-validator'

export class LoginDto {
  @Length(3, 10)
  @IsString()
  username: string

  @Length(6, 15)
  @IsString()
  password: string
}
