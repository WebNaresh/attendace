import { IsNumber } from 'class-validator';

export class CreateFast2SmDto {
  @IsNumber()
  number: number;

  @IsNumber()
  otp: number;
}
