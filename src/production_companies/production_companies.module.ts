import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductionCompanyEntity } from './entities/production_company.entity';
import { ProductionCompanyRepository } from './production_companies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionCompanyEntity])],
  providers: [ProductionCompanyRepository],
  exports: [ProductionCompanyRepository],
})
export class ProductionCompaniesModule {}
