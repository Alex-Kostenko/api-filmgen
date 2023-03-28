import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { MovieEntity } from '../../movies/entities/movie.entity';

@Entity('users')
export class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '200', nullable: false })
  username: string;

  @ApiProperty({ type: String })
  @Column({
    type: 'varchar',
    length: '200',
    nullable: false,
    unique: true,
  })
  email: string;

  @ApiProperty({ type: String })
  @Column({ type: 'varchar', length: '2000', nullable: false })
  password: string;

  @ApiProperty({ type: String })
  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  refreshToken?: string;

  @ApiProperty({ type: [MovieEntity] })
  @ManyToMany(() => MovieEntity, { onDelete: 'SET NULL' })
  @JoinTable()
  movies: MovieEntity[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
