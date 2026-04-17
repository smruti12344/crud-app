import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRole } from '../user.type';
export type UserDocument = HydratedDocument<UserSchema>;
@Schema()
export class UserSchema {
  @Prop({ required: true })
  fName: string;
  @Prop({ required: true })
  lName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true })
  password: string;
  @Prop({ default: UserRole.USER })
  role: string;
}
export const userSchema = SchemaFactory.createForClass(UserSchema);
