import { Column, Entity, ManyToOne } from 'typeorm'
import { CoreEntity } from 'src/utils/core/core-entity'
import { Item } from 'src/modules/item/item.entity'

@Entity()
export class Image extends CoreEntity {
  @Column()
  path: string

  @ManyToOne(() => Item, (item) => item.images)
  item: Item
}
