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
  tgUserId: string

  @Prop()
  phoneNumber: string
}

export const TgUserSchema = SchemaFactory.createForClass(TgUser)
