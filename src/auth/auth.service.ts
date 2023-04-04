import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IPositiveRequest, TokenType } from '../../core/types/main';
import { UserRepository } from '../users/user.repository';

import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async validateUser(payload: any): Promise<RegisterUserDto> {
    return this.userRepository.findByPayload(payload);
  }

  async login(loginUserDTO: LoginUserDTO): Promise<TokenType> {
    const { password: loginPass, email: loginEmail } = loginUserDTO;
    const user = await this.userRepository.findOnlyPassword(loginEmail);

    const { id, password, email } = user;

    const isPassEquals = await bcrypt.compare(loginPass, password);

    if (!isPassEquals) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const tokens: TokenType = await this.getTokens(id, email);
    await this.updateRefreshToken(id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userRepository.updateRefreshToken(userId, hashedRefreshToken);
  }

  async logout(userId: string): Promise<IPositiveRequest> {
    return this.userRepository.updateRefreshToken(userId, null);
  }

  async create(registerUserDto: RegisterUserDto): Promise<IPositiveRequest> {
    return this.userRepository.create(registerUserDto);
  }

  async getTokens(userId: string, email: string): Promise<TokenType> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '2h',
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email: email,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
  ): Promise<TokenType> {
    const user = await this.userRepository.findOneById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
