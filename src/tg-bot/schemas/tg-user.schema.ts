import { HydratedDocument } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type TgUserDocument = HydratedDocument<TgUser>

@Schema({ timestamps: true, collection: 'tg_users' })
export class TgUser {
  @Prop({ isRequired: true })
  firstName: string

  @Prop()
  lastName: string

  @Prop({
    isRequired: true,
    unique: true
  })
  username: string

  @Prop({ isRequired: true })
  tg_user_id: string

  @Prop()
  phone_number: string

  @Prop({ type: Boolean, default: false })
  is_deleted: boolean
}

export const TgUserSchema = SchemaFactory.createForClass(TgUser)
