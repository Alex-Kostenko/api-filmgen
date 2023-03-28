import { ApiProperty } from '@nestjs/swagger';

import { IToken } from '../../auth/types/main';

export class CreateAuthDto implements IToken {
  @ApiProperty({
    type: String,
    name: 'accessToken',
  })
  accessToken: string;
}
