import { Injectable } from '@nestjs/common';

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
  ): Promise<UserEntity> {
    return this.userRepository.update(user, updateUserDto);
  }

  async findByPayload({ email }): Promise<UserEntity> {
    return this.userRepository.findByPayload(email);
  }
}
