import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class GetProfileDto {
  @ApiProperty({ type: String, required: true })
  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  username: string;

  @ApiProperty({ type: String, name: 'email', required: true })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
