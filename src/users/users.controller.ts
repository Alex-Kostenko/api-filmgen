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

import { JWTAuthGuard } from '../auth/guards/jwt-auth.guard';

import { User } from './decorator/user.decorator';
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
  @Patch()
  async update(
    @User() user: UserEntity,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.update(user, updateUserDto);
  }
}
