import { ApiProperty } from '@nestjs/swagger';
import { ProductionCompanyEntity } from 'production_companies/entities/production_company.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity('movies')
export class MovieEntity extends BaseEntity {
  constructor(partial: Partial<MovieEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: Boolean })
  @Column({ type: 'boolean', nullable: false, default: false })
  adult: boolean;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  backdrop_path: string;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: true })
  budget: number;

  @ApiProperty({ type: Number, isArray: true })
  @Column('int', { array: true })
  genre_ids: number[];

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  imdb_id: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  original_language: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
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

  @ApiProperty({ type: [ProductionCompanyEntity] })
  @ManyToMany(() => ProductionCompanyEntity)
  @JoinTable()
  production_companies: ProductionCompanyEntity[];

  @ApiProperty({ type: Date, example: '2021-20-20' })
  @Column({ type: 'date', nullable: true })
  release_date: Date;

  @ApiProperty({ type: Number })
  @Column({ type: 'int', nullable: true })
  runtime: number;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  status: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
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
