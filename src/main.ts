import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { CourierQueueModule } from './courier-queue/courier-queue.module';

async function bootstrap() {
  const appMicro = await NestFactory.createMicroservice<MicroserviceOptions>(CourierQueueModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQURL],
      queue: process.env.RABBITMQQUEUE,
      noAck: false,
      queueOptions: {
        durable: false
      },
    },
  });
  await appMicro.listen();

  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Courier Swagger')
    .setDescription('Courier API Documentation')
    .setVersion('1.0')
    .addTag('courier')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.APP_PORT);
}
bootstrap();
