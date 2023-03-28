import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../core/entities/base.entity';

@Entity('genres')
export class GenreEntity extends BaseEntity {
  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '400', nullable: false })
  name: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '400', nullable: true })
  name_eng: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '400', nullable: true })
  name_ukr: string;
}
