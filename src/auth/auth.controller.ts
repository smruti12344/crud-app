import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
@Controller('auth')
export class AuthController {
  //   authService: AuthService;
  //intiallize the auth service
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const result = await this.authService.registerUser(registerUserDto);
    return result;
  }
  // login-functionality
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const result = await this.authService.loginUser(loginUserDto);
    return result;
  }
}
