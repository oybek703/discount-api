import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { genSalt, hash } from 'bcrypt'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
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

UserSchema.pre('save', async function (next) {
  try {
    // check if current password is modified
    if (this.password && this.isModified('password')) {
      const salt = await genSalt(10)
      this.password = await hash(this.password, salt)
    }
    next()
  } catch (err) {
    next(err)
  }
})
