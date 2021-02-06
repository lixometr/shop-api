import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { Currency } from '../entities/currency.entity';

@EntityRepository(Currency)
export class CurrencyRepository extends DefaultRepository<Currency> {
    
}
