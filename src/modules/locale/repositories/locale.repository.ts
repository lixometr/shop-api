import { DefaultRepository } from 'src/blueprints/default.repository';
import { Locale, LocaleName } from 'src/internal';
import { EntityRepository } from 'typeorm';

@EntityRepository(Locale)
export class LocaleRepository extends DefaultRepository<Locale> {
    public name = LocaleName
}
