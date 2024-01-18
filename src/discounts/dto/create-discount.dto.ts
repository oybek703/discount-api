import { IsEnum, IsNotEmptyObject, IsOptional, Length } from 'class-validator'
import { DiscountStatus, ILocation } from '../../interfaces/discount.interfaces'

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
  location: ILocation
}
