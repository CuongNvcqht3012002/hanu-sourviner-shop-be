import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { CartService } from 'src/modules/cart/cart.service'
import { UpdateItemQuantityDto } from 'src/modules/cart/dto/update-item-quantity.dto'
import { ApiTags, ApiOperation, ApiBody, ApiBearerAuth } from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { ROLE_ENUM } from 'src/modules/user/role.enum'
import { AuthGuard } from '@nestjs/passport'
import { RolesGuard } from 'src/modules/auth/roleguard'

@ApiTags('Cart')
@Controller('cart')
@Roles(ROLE_ENUM.USER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiOperation({ summary: 'Get Cart' })
  @Get()
  getCart(@Req() req) {
    return this.cartService.getCart(req.user.id)
  }

  @ApiOperation({ summary: 'Update Cart Item Quantity' })
  @Post('update-quantity')
  @ApiBody({ type: UpdateItemQuantityDto })
  updateCartItemQuantity(@Req() req, @Body() updateItemQuantityDto: UpdateItemQuantityDto) {
    return this.cartService.updateCartItemQuantity(req.user.id, updateItemQuantityDto)
  }
}
