import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EmailService } from 'src/utils/email/email.service';
import { Fast2SmsService } from 'src/utils/fast_2_sms/fast_2_sms.service';
import { JwtTokenService } from 'src/utils/jwt_token/jwt_token.service';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
    private readonly fast2SmsService: Fast2SmsService,
    private readonly jwt_token: JwtTokenService,
  ) {}
  async register(body: CreateAuthDto, otp: string) {
    const db_otp = await this.prisma.otpStore.findUnique({
      where: {
        email: body.email,
      },
    });

    if (db_otp === null || db_otp.otp !== Number(otp)) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
    // await this.prisma.user.create({
    //   data: {
    //     email: body.email,
    //     first_name: body.firstName,
    //     last_name: body.lastName,
    //     middle_name: body.middleName,
    //     phone_no: body.phone_no,
    //   },
    // });

    return {
      message: 'User Registered Successfully',
      success: true,
    };
  }

  async get_signup_otp(email: string) {
    console.log(`🚀 ~ file: auth.service.ts:41 ~ AuthService ~ email:`, email);
    const otp =
      process.env.ENV === 'development'
        ? 123456
        : Math.floor(100000 + Math.random() * 900000);

    await this.prisma.otpStore.upsert({
      where: {
        email: email,
      },
      update: {
        otp: otp,
      },
      create: {
        email: email,
        otp,
      },
    });

    await this.emailService.sendOtp(email, otp);

    return {
      message: 'OTP Sent Successfully',
      success: true,
      otp: process.env.ENV === 'development' ? otp : null,
    };
  }

  async get_login_otp(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user === null) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }

    const otp =
      process.env.ENV === 'development'
        ? 123456
        : Math.floor(100000 + Math.random() * 900000);

    await this.prisma.otpStore.upsert({
      where: {
        email: email,
      },
      update: {
        otp: otp,
      },
      create: {
        email: email,
        otp: otp,
      },
    });
    if (process.env.ENV !== 'development') {
      await this.fast2SmsService.send_otp({
        number: Number(user.phone_no),
        otp: otp,
      });

      await this.emailService.sendOtp(email, otp);
    }

    return {
      message: 'OTP Sent Successfully',
      success: true,
      otp: process.env.ENV === 'development' ? otp : null,
    };
  }

  async login(body: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (user === null) {
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    const db_otp = await this.prisma.otpStore.findUnique({
      where: {
        email: body.email,
      },
    });

    if (db_otp === null || db_otp.otp !== Number(body.otp)) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwt_token.generateToken(user);

    return {
      message: 'Login Successful',
      success: true,
      token: `Bearer ${token}`,
    };
  }
}
