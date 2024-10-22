import { Injectable } from '@nestjs/common';
import { decode, JwtPayload, sign } from 'jsonwebtoken';

@Injectable()
export class JwtTokenService {
  private readonly private_key: string = process.env.JWT_SECRET;
  async generateToken(payload: any) {
    return sign(payload, this.private_key, { expiresIn: '5 days' });
  }
  async verifyToken(token: string) {
    const decodedToken = decode(token);
    return decodedToken as JwtPayload;
  }
}
