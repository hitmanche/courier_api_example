import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCourierDto {
  @ApiProperty({
    type: Number,
    description: 'CourierId is a required property',
  })
  @IsNumber()
  @IsNotEmpty()
  courierId: number;

  @ApiProperty({
    type: String,
    description: 'Latitude is a required property',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  latitude: string;

  @ApiProperty({
    type: String,
    description: 'Longtitude is a required property',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  longtitude: string;
}