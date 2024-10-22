import { Global, Module } from '@nestjs/common';
import { Fast2SmsService } from './fast_2_sms.service';

@Global()
@Module({
  providers: [Fast2SmsService],
  exports: [Fast2SmsService],
})
export class Fast2SmsModule {}
