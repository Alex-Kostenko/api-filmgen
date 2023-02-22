import { ApiProperty } from '@nestjs/swagger';
import { PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
  @ApiProperty({ type: Number, default: 34234 })
  @PrimaryColumn()
  id: number;
}
