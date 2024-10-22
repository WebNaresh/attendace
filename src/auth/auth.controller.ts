import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

class RegisterResponse {
  message: string;
  success: boolean;
}
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register/:otp')
  @ApiBody({
    type: CreateAuthDto,
    description: 'The User Registration Object',
  })
  @ApiParam({
    name: 'otp',
    type: String,
    description: 'The OTP of the User',
    example: '123456',
  })
  @ApiOperation({ summary: 'Register a User' })
  @ApiOkResponse({
    description: 'User Registered Successfully',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP',
  })
  register(@Body() body: CreateAuthDto, @Param('otp') otp: string) {
    return this.authService.register(body, otp);
  }

  @Get('register_otp/:email')
  @ApiOperation({ summary: 'Get OTP' })
  @ApiOkResponse({
    description: 'OTP Sent Successfully',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Email',
  })
  @ApiParam({
    name: 'email',
    type: String,
    description: 'The Email of the User',
    example: 'nareshbhosale73@gmail.com',
  })
  get_signup_otp(@Param('email') email: string) {
    console.log(
      `🚀 ~ file: auth.controller.ts:49 ~ AuthController ~ email:`,
      email,
    );
    return this.authService.get_signup_otp(email);
  }

  @Get('login_otp/:email')
  @ApiOperation({ summary: 'Get OTP' })
  @ApiOkResponse({
    description: 'OTP Sent Successfully',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Email',
  })
  @ApiParam({
    name: 'email',
    type: String,
    description: 'The Email of the User',
    example: 'nareshbhosale73@gmail.com',
  })
  get_login_otp(@Param('email') email: string) {
    console.log(
      `🚀 ~ file: auth.controller.ts:49 ~ AuthController ~ email:`,
      email,
    );
    return this.authService.get_signup_otp(email);
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
    description: 'The User Login Object',
  })
  @ApiOperation({ summary: 'Login a User' })
  @ApiOkResponse({
    description: 'User Logged In Successfully',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid OTP',
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
