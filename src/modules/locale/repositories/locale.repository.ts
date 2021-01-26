import { DefaultRepository } from 'src/blueprints/default.repository';
import { Locale } from 'src/internal';
import { EntityRepository } from 'typeorm';

@EntityRepository(Locale)
export class LocaleRepository extends DefaultRepository<Locale> {
    
}
