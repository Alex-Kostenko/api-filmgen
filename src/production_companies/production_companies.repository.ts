import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductionCompanyEntity } from './entities/production_company.entity';

@Injectable()
export class ProductionCompanyRepository {
  constructor(
    @InjectRepository(ProductionCompanyEntity)
    private productionCompanyEntity: Repository<ProductionCompanyEntity>,
  ) {}

  async saveProductionCompanies(
    productionCompanies: ProductionCompanyEntity[],
  ): Promise<void> {
    const saveProductionCompanies = await this.productionCompanyEntity.save(
      productionCompanies,
    );

    if (!saveProductionCompanies)
      throw new BadRequestException('Couldn`t save production companies');
  }
}
