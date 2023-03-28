import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { TODO_ANY } from '../../../core/types/main';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: TODO_ANY = ctx.switchToHttp().getRequest();

    return request.user;
  },
);
