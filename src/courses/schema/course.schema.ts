import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type CourseDocument = HydratedDocument<CourseScehma>;
@Schema()
export class CourseScehma {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: true })
  isActive: boolean;
}

export const courseScehma = SchemaFactory.createForClass(CourseScehma);
