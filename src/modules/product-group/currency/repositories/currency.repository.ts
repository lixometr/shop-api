import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { CurrencyName } from '../currency.constants';
import { Currency } from '../entities/currency.entity';

@EntityRepository(Currency)
export class CurrencyRepository extends DefaultRepository<Currency> {
    public name = CurrencyName
}
