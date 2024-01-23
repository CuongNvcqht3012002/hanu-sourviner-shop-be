import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Đội hiến máu tình nguyện 2C FIT HANU'
  }
}
