import { Module, MiddlewareConsumer } from '@nestjs/common'
import databaseConfig from 'config/database.config'
import authConfig from 'config/auth.config'
import appConfig from 'config/app.config'
import mailConfig from 'config/mail.config'
import fileConfig from 'config/file.config'
// import { MailerModule } from '@nestjs-modules/mailer'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from 'database/typeorm-config.service'
import { DataSource } from 'typeorm'
import { AppLoggerMiddleware } from 'middlewares/logger.middleware'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler'
import { AppController } from 'modules/app/app.controller'
import { AppService } from 'modules/app/app.service'
import { APP_GUARD } from '@nestjs/core'
import { ItemModule } from 'src/modules/item/item.module'
import { CartModule } from 'src/modules/cart/cart.module'
import { OrderModule } from 'src/modules/order/order.module'
import { DiscountModule } from 'src/modules/discount/discount.module'
import { AuthModule } from 'src/modules/auth/auth.module'

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig, appConfig, mailConfig, fileConfig],
      envFilePath: ['.env'],
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('app.throttleTTL'),
        limit: config.get('app.throttleLimit'),
      }),
    }),

    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize()
        return dataSource
      },
    }),

    // MailerModule.forRootAsync({
    //   useClass: MailConfigService,
    // }),

    AuthModule,
    ItemModule,
    CartModule,
    OrderModule,
    DiscountModule,
  ],

  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
