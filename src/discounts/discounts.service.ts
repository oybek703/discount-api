import { BadGatewayException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Discount, DiscountDocument } from './schemas/discount.schema'
import { Model } from 'mongoose'
import { CreateDiscountDto } from './dto/create-discount.dto'
import { Category, CategoryDocument } from './schemas/category.schema'
import { COMMON_ERRORS } from '../common/app.constants'

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private readonly discountModel: Model<DiscountDocument>,
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>
  ) {}

  async upsertDiscount(body: CreateDiscountDto) {
    const discountCategory = await this.categoryModel.findOne({ slug: body.category }).exec()
    if (!discountCategory) throw new BadGatewayException(COMMON_ERRORS.invalidCategory)
    const discount = new this.discountModel()
    discount.title = body.title
    discount.description = body.description
    discount.category = discountCategory
    discount.status = body.status
    discount.images = body.images
    discount.location = body.location
    discount.tgUserId = body.tgUserId
    await discount.save()
    return discount
  }
}
