import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { FieldType } from 'movies/enums/main';

import { GetByIdsDto } from '../../genres/dto/get-by-ids.dto';

export class FilterMoviesDto extends GetByIdsDto {
  @Expose()
  @ApiProperty({
    enum: FieldType,
    required: true,
  })
  @IsNotEmpty()
  @IsEnum(FieldType)
  @Transform(
    ({ value }) => (typeof value === 'number' ? FieldType[value] : value),
    { toClassOnly: true },
  )
  @Transform(
    ({ value }) => (typeof value === 'string' ? FieldType[value] : value),
    { toPlainOnly: true },
  )
  field: FieldType;

  @ApiProperty({ type: Number, nullable: true, example: 2021 })
  @IsNotEmpty()
  @IsInt()
  from: number;

  @ApiProperty({ type: Number, nullable: true, example: 2023 })
  @IsNotEmpty()
  @IsInt()
  to: number;
}
