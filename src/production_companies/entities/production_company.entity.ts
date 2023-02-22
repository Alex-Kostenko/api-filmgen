import { ApiProperty } from '@nestjs/swagger';
import { MovieEntity } from 'movies/entities/movie.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../core/entities/base.entity';

@Entity('production_companies')
export class ProductionCompanyEntity extends BaseEntity {
  constructor(partial: Partial<ProductionCompanyEntity>) {
    super();
    Object.assign(this, partial);
  }

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  logo_path: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  name: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', nullable: true })
  origin_country: string;

  @ManyToMany(() => MovieEntity)
  movies: MovieEntity[];
}
