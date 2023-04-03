import { Module } from '@nestjs/common';
import { CourierService } from './courier.service';
import { CourierController } from './courier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierSchema, CourierDatabaseName } from './entities/courier.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([{
      name: 'COURIER_SERVICE',
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQURL],
        queue: process.env.RABBITMQQUEUE,
        queueOptions: {
          durable: false
        }
      }
    }]),
    MongooseModule.forFeature([{ name: CourierDatabaseName, schema: CourierSchema }]),
  ],
  controllers: [CourierController],
  providers: [CourierService],
})
export class CourierModule { }
