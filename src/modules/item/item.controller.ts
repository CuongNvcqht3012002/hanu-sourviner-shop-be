import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { RolesGuard } from 'src/modules/auth/roleguard'
import { ItemService } from 'src/modules/item/item.service'
import { ROLE_ENUM } from 'src/modules/user/role.enum'

@ApiBearerAuth()
@ApiTags('Item')
@Roles(ROLE_ENUM.USER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @ApiOperation({ summary: 'Find All Items' })
  @Get()
  findAll() {
    return this.itemService.findAll()
  }

  @ApiOperation({ summary: 'Find an Item by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id)
  }
}
