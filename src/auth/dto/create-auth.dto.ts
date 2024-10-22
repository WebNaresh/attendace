import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'The First Name of the User',
    type: String,
    required: true,
    example: 'Naresh',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'The Middle Name of the User',
    type: String,
    required: false,
    example: 'Mangesh',
  })
  @IsString()
  @IsOptional()
  middleName: string;

  @ApiProperty({
    description: 'The Last Name of the User',
    type: String,
    required: true,
    example: 'Bhosale',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'The Email of the User',
    type: String,
    required: true,
    example: 'nareshbhosale73@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'The Phone Number of the User',
    type: String,
    required: true,
    example: '9378988565',
  })
  @IsString()
  @MaxLength(10)
  @MinLength(10)
  phone_no: string;
}
export class LoginDto {
  @ApiProperty({
    description: 'The Email of the User',
    type: String,
    required: true,
    example: 'nareshbhosale73@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Temporary otp',
    type: String,
    required: true,
    example: '123456',
  })
  @IsString()
  otp: string;
}
