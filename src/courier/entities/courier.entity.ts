import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt'


@Schema()
export class CourierEntity {
  @Prop()
  courierId: number;

  @Prop()
  longtitude: string;

  @Prop()
  latitude: string;
}

export const CourierDatabaseName = 'couriers';

export const CourierSchema = SchemaFactory.createForClass(CourierEntity);

export type CourierDocument = CourierEntity & Document;