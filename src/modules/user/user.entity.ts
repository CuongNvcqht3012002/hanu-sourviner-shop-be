import { MaxLength, MinLength } from 'class-validator'
import { Column, Entity } from 'typeorm'
import { Exclude } from 'class-transformer'
import { ROLE_ENUM } from 'src/modules/user/role.enum'
import { CoreEntity } from 'src/utils/core/core-entity'

@Entity()
export class User extends CoreEntity {
  /* -----------------------optional----------------------- */
  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  /* ----------------------mandatory------------------------- */

  // @Column()
  // @IsDate()
  // @MaxDate(new Date('2020-12-31'))
  // dob: Date

  @Column({ unique: true })
  @MinLength(1)
  @MaxLength(20)
  username: string

  @Column()
  @MinLength(7)
  @Exclude()
  password: string

  @Column({ type: 'enum', enum: ROLE_ENUM, default: ROLE_ENUM.USER })
  role: ROLE_ENUM

  @Column({ unique: true })
  email: string

  @Column({ unique: true })
  phone_number: string

  @Column({ default: false })
  receiveInfoAndPolicy: boolean

  @Column({ default: false })
  verified: boolean
}
