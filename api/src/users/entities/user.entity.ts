import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ isRequired: true })
  firstName: string

  @Prop({ isRequired: true })
  lastName: string

  @Prop({
    isRequired: true,
    unique: true
  })
  username: string

  @Prop({ isRequired: true })
  password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
