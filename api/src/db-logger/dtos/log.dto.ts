import { DbLogType } from '../../common/app.constants'
import { IsNumber, IsOptional, IsString } from 'class-validator'

export class LogDto {
  @IsString()
  log_type: DbLogType

  @IsString()
  @IsOptional()
  error_message?: string

  @IsNumber()
  response_time: number

  @IsString()
  status_code: string
}
