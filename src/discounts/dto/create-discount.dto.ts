import { IsEnum, IsNotEmptyObject, IsOptional, Length } from 'class-validator'
import { DiscountStatus } from '../../interfaces/discount.interfaces'
import { Location } from '../schemas/location.schema'

export class CreateDiscountDto {
  @Length(3, 128)
  title: string

  @Length(3, 256)
  description: string

  @IsOptional()
  image: string

  @IsEnum(DiscountStatus)
  @IsOptional()
  status: DiscountStatus

  @IsNotEmptyObject()
  location: Location
}
