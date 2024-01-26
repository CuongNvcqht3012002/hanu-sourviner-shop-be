import { Module } from '@nestjs/common'
import { DiscountController } from 'src/modules/discount/discount.controller'
import { DiscountService } from 'src/modules/discount/discount.service'

@Module({ controllers: [DiscountController], providers: [DiscountService] })
export class DiscountModule {}
