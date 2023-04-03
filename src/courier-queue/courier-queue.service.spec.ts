import { Test, TestingModule } from '@nestjs/testing';
import { CourierQueueService } from './courier-queue.service';

describe('CourierQueueService', () => {
  let service: CourierQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourierQueueService],
    }).compile();

    service = module.get<CourierQueueService>(CourierQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
