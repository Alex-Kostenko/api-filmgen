import {
  Controller,
  Post,
  Body,
  Get,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRepository } from '../users/user.repository';

import { IPositiveRequest, TokenType } from '../../core/types/main';
import { User } from '../users/decorator/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { IUpdateUser } from 'users/types/main';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  @ApiOperation({ summary: 'Log in' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Invalid email or password',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: CreateAuthDto,
  })
  @ApiBody({ type: LoginUserDTO })
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDTO): Promise<TokenType> {
    return await this.authService.login(loginUserDto);
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiBody({ type: RegisterUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success: true',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Email is already exist',
  })
  @Post('register')
  async create(
    @Body() createUserDto: RegisterUserDto,
  ): Promise<IPositiveRequest> {
    return this.authService.create(createUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: RegisterUserDto,
  })
  @UseGuards(JWTAuthGuard)
  @Get('profile')
  getProfile(@User() user: UserEntity): Promise<IUpdateUser> {
    return this.userRepository.findOneByEmail(user.email);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JWTAuthGuard)
  @Get('logout')
  async logout(@User() user: UserEntity): Promise<IPositiveRequest> {
    return this.authService.logout(user.id);
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@Req() req): Promise<TokenType> {
    const token: string = req.user.refreshToken;

    const decode = await this.jwtService.verify(token, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return this.authService.refreshTokens(decode.id, token);
  }
}
