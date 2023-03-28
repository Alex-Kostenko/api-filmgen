import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @MaxLength(200)
  username?: string;

  @ApiPropertyOptional({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(4000)
  @IsOptional()
  password?: string;
}
