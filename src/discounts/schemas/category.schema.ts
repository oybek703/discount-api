import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import slugify from 'slugify'

export type CategoryDocument = HydratedDocument<Category>

@Schema({ timestamps: true })
export class Category {
  @Prop({ isRequired: true })
  title: string

  @Prop({ isRequired: false })
  description: string

  @Prop({ isRequired: true, unique: true })
  slug: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name, default: [] })
  subCategories: Category[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.pre('save', async function (next) {
  try {
    if (!this.slug || this?.slug.trim() === '') this.slug = slugify(this.title)
    next()
  } catch (err) {
    next(err)
  }
})
