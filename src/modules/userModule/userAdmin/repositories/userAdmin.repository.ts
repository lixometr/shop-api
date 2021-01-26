import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { UserAdmin } from '../entities/userAdmin.entity';

@EntityRepository(UserAdmin)
export class UserAdminRepository extends DefaultRepository<UserAdmin> {
    
}
