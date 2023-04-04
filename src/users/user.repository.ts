import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { RegisterUserDto } from '../auth/dto/register-user.dto';

import { IPositiveRequest } from '../../core/types/main';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

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

    if (user) {
      throw new BadRequestException('Email is already exist');
    }
    if (user.username === registerUserDto.username) {
      throw new BadRequestException('Username is already exist');
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
    const user = this.userEntity.findOne({
      where: { email: userEmail },
      select: {
        password: true,
        id: true,
        email: true,
      },
    });

    if (!(await user)) {
      throw new BadRequestException('Invalid email or password');
    }
    return user;
  }

  async findOneByEmail(userEmail: string): Promise<UserEntity> {
    const user = await this.userEntity.findOne({
      where: { email: userEmail },
      select: {
        username: true,
        id: true,
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
  ): Promise<UserEntity> {
    const searchUser = await this.findOneById(user.id);

    if (!searchUser) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email) {
      const equalEmail = await this.findOneByEmail(user.email);

      if (!equalEmail) {
        throw new BadRequestException('Email is already used');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    Object.assign(searchUser, updateUserDto);

    const newUser = await this.userEntity.save(searchUser);

    return newUser;
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
}
