import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Not, Repository } from 'typeorm';

import { RegisterUserDto } from '../auth/dto/register-user.dto';
import { IPositiveRequest } from '../../core/types/main';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { IUpdateUser } from './types/main';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private userEntity: Repository<UserEntity>,
  ) {}

  async create(registerUserDto: RegisterUserDto): Promise<IPositiveRequest> {
    const user = await this.userEntity.findOne({
      where: { email: registerUserDto.email },
    });

    if (user || user.username === registerUserDto.username) {
      throw new BadRequestException('Email or username is already exist');
    }

    const newUser = new UserEntity();
    Object.assign(newUser, registerUserDto);

    await this.userEntity.insert(newUser);

    return { success: true };
  }

  async findOneById(userId: string): Promise<UserEntity> {
    const searchUser = await this.userEntity.findOne({ where: { id: userId } });

    if (!searchUser) {
      throw new NotFoundException('User not found');
    }
    return searchUser;
  }

  async findOnlyPassword(userEmail: string): Promise<UserEntity> {
    const user = await this.userEntity.findOne({
      where: { email: userEmail },
      select: {
        password: true,
        id: true,
        email: true,
      },
    });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
    return user;
  }

  async findOneByEmail(userEmail: string): Promise<IUpdateUser> {
    const user = await this.userEntity.findOne({
      where: { email: userEmail },
      select: {
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }

  async update(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<IPositiveRequest> {
    const { email, username } = updateUserDto;
    const serchUser = await this.findOneById(user.id);

    if (email) {
      const equalEmail = await this.userEntity.findOne({
        where: { email: email, id: Not(user.id) },
      });
      if (equalEmail) {
        throw new BadRequestException('Email is already exist!');
      }
    }

    if (username) {
      const equalUsername = await this.userEntity.findOne({
        where: { email: email, id: Not(user.id) },
      });
      if (equalUsername) {
        throw new BadRequestException('Username is already exist!');
      }
    }

    Object.assign(serchUser, updateUserDto);
    console.log(serchUser);

    await this.userEntity.save(serchUser);

    return { success: true };
  }

  async findByPayload(email: string): Promise<UserEntity> {
    const searchUser = await this.userEntity.findOne({
      where: { email },
    });

    if (!searchUser) {
      throw new UnauthorizedException('Invalid token');
    }
    return searchUser;
  }

  async updateRefreshToken(
    userId: string,
    token: string,
  ): Promise<IPositiveRequest> {
    await this.userEntity
      .createQueryBuilder()
      .update('users')
      .set({ refreshToken: token })
      .where({ id: userId })
      .execute();

    return { success: true };
  }

  async changePassword(
    userId: string,
    changePassowrdDto: ChangePasswordDTO,
  ): Promise<IPositiveRequest> {
    const user = await this.findOneById(userId);

    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.NOT_FOUND,
      );
    }

    const isPassEquals = await bcrypt.compare(
      changePassowrdDto.currentPassword,
      user.password,
    );

    if (!isPassEquals) {
      throw new BadRequestException('Current password is incorrect!');
    }

    if (changePassowrdDto.currentPassword === changePassowrdDto.newPassword) {
      throw new BadRequestException('Current password is equal new password!');
    }

    user.password = await bcrypt.hash(changePassowrdDto.newPassword, 10);

    await this.userEntity.save(user);

    return {
      success: true,
    };
  }
}
