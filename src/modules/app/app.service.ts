import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Đội tình nguyện hiến máu 2C FIT HANU'
  }
}
