import { CacheModule, Module } from '@nestjs/common';
import { CourierQueueService } from './courier-queue.service';
import { CourierQueueController } from './courier-queue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CourierDatabaseName, CourierSchema } from 'src/courier/entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisClientOptions } from 'redis';
import * as redisStore from "cache-manager-redis-store";
import { ConfigurationService } from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get('REDISURL'),
        ttl: 60 * 60
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (_configService: ConfigService) => ({
        uri: _configService.get('MONGODBURL'),
        retryDelay: 500,
        retryAttempts: 3,
        useNewUrlParser: true,
        autoIndex: true,
        autoCreate: true,
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: CourierDatabaseName, schema: CourierSchema }]),
  ],
  controllers: [CourierQueueController],
  providers: [CourierQueueService, ConfigurationService]
})
export class CourierQueueModule { }
