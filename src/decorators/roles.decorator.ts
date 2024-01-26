import { SetMetadata } from '@nestjs/common'
import { ROLE_ENUM } from 'src/modules/user/role.enum'

export const RoleKey = 'roles'
export const Roles = (...roles: ROLE_ENUM[]) => SetMetadata(RoleKey, roles)
