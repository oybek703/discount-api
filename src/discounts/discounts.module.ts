import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Discount, DiscountSchema } from './schemas/discount.schema'
import { Location, LocationSchema } from './schemas/location.schema'
import { DiscountsController } from './discounts.controller'
import { DiscountsService } from './discounts.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
      { name: Location.name, schema: LocationSchema }
    ])
  ],
  controllers: [DiscountsController],
  providers: [DiscountsService]
})
export class DiscountsModule {}
