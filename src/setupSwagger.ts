import { INestApplication } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

export default function (app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Hanu Souviner Shop's Document")
    .setDescription('The Hanu Souviner Shop API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  })
}
