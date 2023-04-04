import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  username?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;
}
