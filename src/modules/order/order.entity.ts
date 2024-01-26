import { STATUS_ENUM } from 'src/modules/order/order-status.enum'
import { User } from 'src/modules/user/user.entity'
import { CoreEntity } from 'src/utils/core/core-entity'
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { OrderItem } from 'src/modules/order/order-item.entity' // Import your OrderItem entity

@Entity()
export class Order extends CoreEntity {
  @ManyToOne(() => User)
  user: User

  @Column({ type: 'enum', enum: STATUS_ENUM, default: STATUS_ENUM.PENDING })
  status: string

  @Column()
  shippingAddress: string

  @Column()
  billingAddress: string

  @Column()
  totalPrice: number

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[]

  @Column({ nullable: true })
  deliveryMethod: string

  @Column({ type: 'text', nullable: true })
  notes: string

  @Column({ nullable: true })
  trackingNumber: string
}
