import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Discount, DiscountSchema } from './schemas/discount.schema'
import { DiscountsController } from './discounts.controller'
import { DiscountsService } from './discounts.service'
import { Category, CategorySchema } from './schemas/category.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
      { name: Category.name, schema: CategorySchema }
    ])
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService],
  exports: [DiscountsService]
})
export class DiscountsModule {}
