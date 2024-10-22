import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './utils/email/email.module';
import { Fast2SmsModule } from './utils/fast_2_sms/fast_2_sms.module';
import { JwtTokenModule } from './utils/jwt_token/jwt_token.module';
import { PrismaModule } from './utils/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailModule,
    Fast2SmsModule,
    JwtTokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
