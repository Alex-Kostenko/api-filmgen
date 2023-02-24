import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserRepository } from 'src/users/user.repository';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepository) {}
  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { userId } = req.params;

    await this.userRepository.updateUserFirstname(userId);

    next();
  }
}
