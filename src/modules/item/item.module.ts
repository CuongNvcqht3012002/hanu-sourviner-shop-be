import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from 'src/modules/image/image.entity'
import { AdminItemController } from 'src/modules/item/admin.item.controller'
import { ItemController } from 'src/modules/item/item.controller'
import { Item } from 'src/modules/item/item.entity'
import { ItemService } from 'src/modules/item/item.service'

@Module({
  imports: [TypeOrmModule.forFeature([Item, Image])],
  controllers: [ItemController, AdminItemController],
  providers: [ItemService],
  exports: [ItemService],
})
export class ItemModule {}
