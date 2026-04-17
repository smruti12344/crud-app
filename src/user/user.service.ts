import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from '../auth/dto/registerUser.dto';
import { UserSchema } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserSchema.name) private UserModel: Model<UserSchema>,
  ) {}
  async createUser(registerUserDto: RegisterUserDto) {
    console.log('Creating user with data:', registerUserDto);
    try {
      return await this.UserModel.create({
        fName: registerUserDto.fname,
        lName: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: unknown) {
      console.error('Error creating user:', error);
      const err = error as { code?: number };
      if (err.code === 11000) {
        throw new ConflictException('Email already exists');
      } else {
        throw new Error('Failed to create user');
      }
    }
  }
}
