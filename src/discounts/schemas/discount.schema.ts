import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from '../../users/schemas/user.schema'
import { DiscountStatus, ILocation } from '../../interfaces/discount.interfaces'

export type DiscountDocument = HydratedDocument<Discount>

@Schema({ timestamps: true })
export class Discount {
  @Prop({ isRequired: true })
  title: string

  @Prop({ isRequired: true })
  description: string

  @Prop({ isRequired: true })
  image: string

  @Prop({
    isRequired: true,
    type: String,
    enum: [DiscountStatus.OPEN, DiscountStatus.CLOSED],
    default: DiscountStatus.OPEN
  })
  status: DiscountStatus

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  user: User

  @Prop({ type: ILocation })
  location: ILocation
}

export const DiscountSchema = SchemaFactory.createForClass(Discount)
