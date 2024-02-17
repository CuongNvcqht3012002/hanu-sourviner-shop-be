import { Controller, Param, Post, Patch, Delete, Body, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger'
import { CreateItemDto } from 'src/modules/item/dto/create-item.dto'
import { UpdateItemDto } from 'src/modules/item/dto/update-item.dto'
import { ItemService } from 'src/modules/item/item.service'
import { ROLE_ENUM } from 'src/modules/user/role.enum'
import { AuthGuard } from '@nestjs/passport'
import { Roles } from 'src/decorators/roles.decorator'
import { RolesGuard } from 'src/modules/auth/roleguard'

@ApiBearerAuth()
@ApiTags('Item')
@Roles(ROLE_ENUM.ADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('admin/items')
export class AdminItemController {
  constructor(private readonly itemService: ItemService) {}

  // @ApiOperation({ summary: 'Upload Images for an Item' })
  // @Post('upload/:id')
  // @UseInterceptors(FilesInterceptor('images', 10, multerOptions))
  // uploadImages(@Param('id') itemId: string, @UploadedFiles() images: Array<Express.Multer.File>) {
  //   return this.itemService.uploadImages(itemId, images)
  // }

  @ApiOperation({ summary: 'Create an Item' })
  @Post()
  @ApiBody({ type: CreateItemDto })
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemService.create(createItemDto)
  }

  @ApiOperation({ summary: 'Update an Item by ID' })
  @Patch(':id')
  @ApiParam({ name: 'id' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto)
  }

  @ApiOperation({ summary: 'Remove an Item by ID' })
  @Delete(':id')
  @ApiParam({ name: 'id' })
  remove(@Param('id') id: string) {
    return this.itemService.remove(id)
  }
}
