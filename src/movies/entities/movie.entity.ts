import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movies')
export class MovieEntity {
  @ApiProperty({ type: Number, default: 34234 })
  @PrimaryColumn()
  id: number;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean', nullable: false, default: false })
  adult: boolean;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  backdrop_path: string;

  @ApiProperty({ type: Number, isArray: true })
  @Column('int', { array: true })
  genre_ids: number[];

  @ApiProperty({ type: String })
  @Column({ type: 'varchar' })
  original_language: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar' })
  original_title: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: false, default: '' })
  overview: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'real', nullable: false, default: 0.0 })
  popularity: number;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  poster_path: string;

  @ApiProperty({ type: Date, example: '2021-20-20' })
  @Column({ type: 'date' })
  release_date: Date;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean', nullable: false, default: false })
  video: boolean;

  @ApiProperty({ type: Number })
  @Column({ type: 'real', nullable: false, default: 0.0 })
  vote_average: number;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: false, default: 0 })
  vote_count: number;
}
