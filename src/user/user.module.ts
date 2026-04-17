import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema, UserSchema } from './schema/user.schema';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserSchema.name, schema: userSchema }]),
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
