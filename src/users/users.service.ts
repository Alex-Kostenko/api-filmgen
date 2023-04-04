import { Injectable } from '@nestjs/common';
import { IPositiveRequest } from '../../core/types/main';
import { ChangePasswordDTO } from './dto/change-password.dto';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findOneById(userId: string): Promise<UserEntity> {
    return this.userRepository.findOneById(userId);
  }

  async findOneByEmail(userEmail: string): Promise<UserEntity> {
    return this.userRepository.findOnlyPassword(userEmail);
  }

  async update(
    user: UserEntity,
    updateUserDto: UpdateUserDto,
  ): Promise<IPositiveRequest> {
    return this.userRepository.update(user, updateUserDto);
  }

  async findByPayload({ email }): Promise<UserEntity> {
    return this.userRepository.findByPayload(email);
  }

  async changePassword(userId: string, changePassowrdDto: ChangePasswordDTO) {
    return this.userRepository.changePassword(userId, changePassowrdDto);
  }
}
