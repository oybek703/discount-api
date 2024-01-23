import { IsEnum, IsNotEmptyObject, IsOptional, Length } from 'class-validator'
import { DiscountStatus, ILocation } from '../../interfaces/discount.interfaces'

export class CreateDiscountDto {
  @Length(3, 128)
  title: string

  @Length(3, 256)
  description: string

  @Length(3, 256)
  category: string

  @IsOptional()
  images: string[]

  @IsEnum(DiscountStatus)
  @IsOptional()
  status: DiscountStatus

  @IsOptional()
  tgUserId?: string

  @IsNotEmptyObject()
  location: ILocation
}
