import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('/fingerprint/:finger_print_id')
  post_fingerprint_data(@Param('finger_print_id') finger_print_id: string) {
    return this.appService.post_fingerprint_data(finger_print_id);
  }
}
