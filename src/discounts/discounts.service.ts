import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Discount, DiscountDocument } from './schemas/discount.schema'
import { Model } from 'mongoose'
import { CreateDiscountDto } from './dto/create-discount.dto'

@Injectable()
export class DiscountsService {
  constructor(
    @InjectModel(Discount.name) private readonly discountModel: Model<DiscountDocument>
  ) {}

  async upsertSchema(body: CreateDiscountDto) {
    const discount = new this.discountModel()
    discount.title = body.title
    discount.description = body.description
    discount.status = body.status
    discount.image = body.image
    await discount.save()
    return discount
  }
}