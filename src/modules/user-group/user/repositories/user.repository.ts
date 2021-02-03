import { DefaultRepository, User } from 'src/internal';
import { EntityRepository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends DefaultRepository<User> {
    
}
