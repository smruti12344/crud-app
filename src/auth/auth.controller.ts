import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthGuard } from './auth.guard';
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

  //get user profile
  //check if the user is authenticated using the auth guard
  //then return the user profile
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    console.log('Request user object:', req.user);
    const userId = req.user.sub; // Assuming the user ID is stored in the 'sub' property of the JWT payload
    // You can use the userId to fetch the user's profile from the database
    // For example:
    // const userProfile = await this.userService.getUserProfile(userId);
    // return userProfile;
    const userProfile = await this.authService.getUserProfile(userId);
    return userProfile;
  }
}
