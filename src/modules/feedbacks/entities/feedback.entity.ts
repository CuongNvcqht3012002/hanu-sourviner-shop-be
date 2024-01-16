import { CoreEntity } from 'src/utils/core/core-entity'
import { Column } from 'typeorm'
import { STATUS_ENUM } from 'modules/feedbacks/enums/statuses.enum'
import { Expose } from 'class-transformer'
import { CoreEntityMixin } from 'src/utils/core/core-entity.mixin'

@CoreEntityMixin()
export class Feedback extends CoreEntity {
  @Column()
  authorId: string

  @Column({ nullable: true })
  title: string

  @Expose()
  @Column()
  content: string

  @Expose()
  @Column({ default: 5 })
  rating: number

  @Expose()
  @Column({ type: 'enum', enum: STATUS_ENUM, default: STATUS_ENUM.OPENING })
  status: STATUS_ENUM
}
