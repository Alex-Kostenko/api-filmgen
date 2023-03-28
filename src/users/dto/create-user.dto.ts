import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ type: String, name: 'firstname', required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  username: string;

  @ApiProperty({ type: String, name: 'email', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, name: 'password', required: true })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(4000)
  password: string;
}
