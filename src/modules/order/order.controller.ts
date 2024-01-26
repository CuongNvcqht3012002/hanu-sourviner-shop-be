import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { CreateOrderDto } from 'src/modules/order/dto/create-order.dto'
import { OrderService } from 'src/modules/order/order.service' // Import your OrderService

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':id')
  getOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id)
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(null, createOrderDto)
  }

  @Put(':id')
  updateOrder(@Param('id') id: string, @Body() updateOrderDto: CreateOrderDto) {
    return this.orderService.updateOrder(id, updateOrderDto)
  }
}
