import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EmailRegisterDto } from 'src/modules/auth/dto/email-register.dto'
import { UpdateInfoDto } from 'src/modules/user/dto/update-info.dto'
import { User } from 'src/modules/user/user.entity'
import { HttpNotFound } from 'src/utils/throw-exception'
import * as bcrypt from 'bcryptjs'
import { FindOptionsWhere, Repository } from 'typeorm'
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOneBy(where : FindOptionsWhere<User>) {
    const entity = await this.userRepository.findOne({
      where,
    })
    if (!entity) HttpNotFound()
    return entity
  }

  async create(createUserDto : EmailRegisterDto) {
    const user = this.userRepository.create(createUserDto);
    user.password = await this._hashPassword(user.password);
    return await this.userRepository.save(user);
  }

  async _hashPassword(password : string) {
    const salt = await bcrypt.genSalt()
    return await bcrypt.hash(password, salt)
  }

  async update(id: string, updateInfoDto: QueryDeepPartialEntity<User>) {
    const result = await this.userRepository.update(id, updateInfoDto)
    if (result.affected === 0) HttpNotFound(`User with id ${id} not found`)
    return await this.findOneBy({id})
  }
}
