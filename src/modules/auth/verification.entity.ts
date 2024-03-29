import { CoreEntity } from 'src/utils/core/core-entity'
import { Column, Entity } from 'typeorm'

@Entity()
export class Verification extends CoreEntity {
  @Column()
  token: string

  @Column()
  email: string
}
