import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/loginUser.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async registerUser(registerUserDto: RegisterUserDto) {
    // hash password here before sending to user service
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );
    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hashedPassword,
    });
    console.log('User created:', user);
    const payload = {
      sub: user._id,
    };

    return {
      message: 'User created successfully',
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
  //login user
  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByEmail(loginUserDto.email);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      return { message: 'Invalid credentials' };
    }
    const payload = {
      sub: user._id,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      message: 'Login successful',
      accessToken,
    };
  }
}
