import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Cart } from 'src/modules/cart/cart.entity'
import { CartModule } from 'src/modules/cart/cart.module'
import { Item } from 'src/modules/item/item.entity'
import { OrderItem } from 'src/modules/order/order-item.entity'
import { OrderController } from 'src/modules/order/order.controller'
import { Order } from 'src/modules/order/order.entity'
import { OrderService } from 'src/modules/order/order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Item, Cart]), CartModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
