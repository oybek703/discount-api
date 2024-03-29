import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from '../../users/schemas/user.schema'
import { DiscountStatus, ILocation } from '../../interfaces/discount.interfaces'
import { Category } from './category.schema'

export type DiscountDocument = HydratedDocument<Discount>

@Schema({ timestamps: true })
export class Discount {
  @Prop({ isRequired: true })
  title: string

  @Prop({ isRequired: true })
  description: string

  @Prop({ isRequired: true, type: [String] })
  images: string[]

  @Prop({
    isRequired: true,
    type: String,
    enum: Object.keys(DiscountStatus),
    default: DiscountStatus.OPEN
  })
  status: DiscountStatus

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: Category

  @Prop({ isRequired: true })
  tgUserId: string

  @Prop({ type: ILocation })
  location: ILocation
}

export const DiscountSchema = SchemaFactory.createForClass(Discount)
