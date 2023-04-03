import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourierDto } from 'src/courier/dto';
import { CourierDatabaseName, CourierDocument } from 'src/courier/entities';
import { Cache } from 'cache-manager';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class CourierQueueService {
  constructor(
    @InjectModel(CourierDatabaseName) private courierModel: Model<CourierDocument>,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) { }

  async createService(createCourierDto: CreateCourierDto, context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    try {
      const courier = await this.courierModel.create(createCourierDto);
      await this.updateCacheValue(this.getCacheKeyName(courier.courierId, courier._id), courier);
      channel.ack(originalMsg);
    }
    catch {
      channel.nack(originalMsg);
    }
  }

  getCacheKeyName = (courierId: number, _id: number): string => `${courierId}_${_id}`;
  updateCacheValue = async (key, data) => {
    return await this.cacheService.set(key, JSON.stringify(data));
  };
}
