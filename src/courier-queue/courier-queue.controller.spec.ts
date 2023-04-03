import { Test, TestingModule } from '@nestjs/testing';
import { CourierQueueController } from './courier-queue.controller';
import { CourierQueueService } from './courier-queue.service';

describe('CourierQueueController', () => {
  let controller: CourierQueueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourierQueueController],
      providers: [CourierQueueService],
    }).compile();

    controller = module.get<CourierQueueController>(CourierQueueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
