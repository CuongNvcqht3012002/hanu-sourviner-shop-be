import { Column, Entity, OneToOne } from 'typeorm'
import { CoreEntity } from 'src/utils/core/core-entity'
import { Item } from 'src/modules/item/item.entity'

@Entity()
export class Discount extends CoreEntity {
  @Column()
  itemId: string

  @OneToOne(() => Item)
  item: Item

  @Column()
  amount: number

  @Column()
  expired_date: Date
}
