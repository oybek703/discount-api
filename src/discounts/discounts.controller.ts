import { Body, Controller, Post, Put, UseInterceptors } from '@nestjs/common'
import { CreateDiscountDto } from './dto/create-discount.dto'
import { DiscountsService } from './discounts.service'
import { LoggerInterceptor } from '../interceptors/logger.interceptor'
import { DbLoggerInterceptor } from '../interceptors/db-logger.interceptor'

@Controller('discounts')
@UseInterceptors(DbLoggerInterceptor, LoggerInterceptor)
export class DiscountsController {
  constructor(private readonly discountService: DiscountsService) {}

  @Post()
  async createDiscount(@Body() body: CreateDiscountDto) {
    return this.discountService.upsertSchema(body)
  }

  @Put()
  async updateDiscount(@Body() body: CreateDiscountDto) {
    return this.discountService.upsertSchema(body)
  }
}
