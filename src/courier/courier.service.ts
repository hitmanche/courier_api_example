import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCourierDto } from './dto';
import { CourierDocument, CourierDatabaseName } from './entities';
import { Cache } from 'cache-manager';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CourierService {
  constructor(
    @InjectModel(CourierDatabaseName) private courierModel: Model<CourierDocument>,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
    @Inject('COURIER_SERVICE') private client: ClientProxy
  ) { }

  async create(createCourierDto: CreateCourierDto) {
    this.client.emit('add-courier-queue', createCourierDto);
    return createCourierDto;
  }

  async findAll() {
    return await this.findKeysGetValues() || await this.courierModel.find({});
  }

  async findCourierId(courierId: number) {
    return await this.findKeysGetValues('*' + courierId + '_*') || await this.courierModel.find({ courierId });
  }

  getCacheKeyName = (courierId: number, _id: number): string => `${courierId}_${_id}`;

  findKeysGetValues = async (filter: string = '*') => {
    const cacheKeys = await this.cacheService?.keys(filter);
    if (cacheKeys && cacheKeys?.length > 0) {
      let cacheValues = await this.cacheService?.mget(cacheKeys);
      if (cacheValues?.length > 0) {
        cacheValues = cacheValues.map(cache => cache = JSON.parse(cache));
        return cacheValues;
      }
      return undefined;
    }
    return undefined;
  }

  getCacheValue = async (key) => {
    return await this.cacheService.get(key);
  };
  updateCacheValue = async (key, data) => {
    return await this.cacheService.set(key, JSON.stringify(data));
  };
  deleteCacheValue = async (key) => {
    return await this.cacheService.delete(key);
  };
}
