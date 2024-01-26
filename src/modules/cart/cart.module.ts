import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CartController } from 'src/modules/cart/cart.controller'
import { Cart } from 'src/modules/cart/cart.entity'
import { CartService } from 'src/modules/cart/cart.service'

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  controllers: [CartController],
  providers: [CartService],
  exports: [CartService],
})
export class CartModule {}
