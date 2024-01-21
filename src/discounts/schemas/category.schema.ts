import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
  @Prop({ isRequired: true })
  title: string

  @Prop({ isRequired: true })
  description: string

  @Prop({ isRequired: true, unique: true })
  slot: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
