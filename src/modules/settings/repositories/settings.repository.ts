import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';
import { SettingsName } from '../settings.constants';

@EntityRepository(Settings)
export class SettingsRepository extends DefaultRepository<Settings> {
    public name = SettingsName
}
