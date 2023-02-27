import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('genres')
export class GenreEntity {
  @ApiProperty({ type: Number, default: 34234 })
  @PrimaryColumn()
  id: number;

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
