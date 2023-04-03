import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CourierService } from './courier.service';
import { CreateCourierDto } from './dto/create-courier.dto';

@ApiTags('courier')
@Controller('courier')
export class CourierController {
  constructor(private readonly courierService: CourierService) { }

  @Post('save-courier-location')
  create(@Body() createCourierDto: CreateCourierDto) {
    return this.courierService.create(createCourierDto);
  }

  @Get('get-all-couriers-last-location')
  findAll() {
    return this.courierService.findAll();
  }

  @Get('get-courier-last-location/:courierId')
  findCourierId(@Param('courierId') courierId: number) {
    return this.courierService.findCourierId(courierId);
  }
}
