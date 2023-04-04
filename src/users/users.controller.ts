import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { IPositiveRequest } from '../../core/types/main';

import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

import { User } from './decorator/user.decorator';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserEntity,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @Get(':userId')
  async findOne(@Param('userId') userId: string): Promise<UserEntity> {
    return this.usersService.findOneById(userId);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiBody({ type: UpdateUserDto })
  @ApiOperation({ summary: 'Update user data' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
  })
  @UseGuards(JWTAuthGuard)
  @Patch('update-user')
  async update(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<IPositiveRequest> {
    return this.usersService.update(user, updateUserDto);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Change password' })
  @Patch('change-password')
  @UseGuards(JWTAuthGuard)
  async changePassowrd(
    @User() user: UserEntity,
    @Body() changePassowrdDto: ChangePasswordDTO,
  ) {
    return await this.usersService.changePassword(user.id, changePassowrdDto);
  }
}
