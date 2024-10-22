import { Injectable } from '@nestjs/common';
import { PrismaService } from './utils/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async post_fingerprint_data(finger_print_id: string) {
    const fingerprint = await this.prisma.user.findUnique({
      where: {
        finger_print_id,
      },
    });
    if (!fingerprint) {
      await this.prisma.user
        .create({
          data: {
            finger_print_id,
          },
        })
        .then(async (res) => {
          await this.prisma.seat.create({
            data: {
              user_id: res.id,
            },
          });
          return {
            success: true,
            message: `Fingerprint data saved with seat id ${res.id} !`,
          };
        })
        .catch((err) => {
          return {
            success: false,
            message: 'Error saving fingerprint data !',
          };
        });
    }

    return {
      success: true,
      message: 'Fingerprint data saved successfully !',
    };
  }
}
