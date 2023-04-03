import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateCourierDto } from 'src/courier/dto';
import { CourierQueueService } from './courier-queue.service';

@Controller()
export class CourierQueueController {
  constructor(private readonly courierQueueService: CourierQueueService) { }

  @MessagePattern('add-courier-queue')
  createService(@Payload() createCourierDto: CreateCourierDto, @Ctx() context: RmqContext) {
    return this.courierQueueService.createService(createCourierDto, context);
  }
}
