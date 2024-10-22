import { Injectable } from '@nestjs/common';
import { CreateFast2SmDto } from './dto/create-fast_2_sm.dto';

@Injectable()
export class Fast2SmsService {
  async send_otp(createFast2SmDto: CreateFast2SmDto) {
    console.log(
      `🚀 ~ file: fast_2_sms.service.ts:7 ~ Fast2SmsService ~ createFast2SmDto:`,
      createFast2SmDto,
    );
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        authorization: process.env.FAST2SMS_API!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'otp',
        numbers: createFast2SmDto.number,
        variables_values: createFast2SmDto.otp,
      }),
    }).then((res) => res.json());

    console.log(response);
  }
}
