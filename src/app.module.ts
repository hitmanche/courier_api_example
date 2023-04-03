import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CourierModule } from './courier/courier.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationService } from '../config/config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from "cache-manager-redis-store";
import { RedisClientOptions } from 'redis';
import { CourierQueueModule } from './courier-queue/courier-queue.module';

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
    CourierModule,
    CourierQueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule { }
