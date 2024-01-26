import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger'
import { Roles } from 'src/decorators/roles.decorator'
import { RolesGuard } from 'src/modules/auth/roleguard'
import { UpdateInfoDto } from 'src/modules/user/dto/update-info.dto'
import { ROLE_ENUM } from 'src/modules/user/role.enum'
import { UserService } from 'src/modules/user/user.service'

@ApiBearerAuth()
@ApiTags('User')
@Roles(ROLE_ENUM.USER)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get User Information' })
  @Get()
  get(@Req() req) {
    return this.userService.findOneBy({id : req.user.id})
  }

  @ApiOperation({ summary: 'Update User Information' })
  @Patch()
  @ApiBody({ type: UpdateInfoDto })
  update(@Req() req, updateInfoDto: UpdateInfoDto) {
    return this.userService.update(req.user.id, updateInfoDto)
  }
}
