import { EntityManager } from "typeorm";
import { User } from "@fcs/entity";

import Repository from "./repository";

class UserRepository extends Repository<User> {
  constructor(entityManager: EntityManager) {
    super(entityManager, User);
  }

  findOneByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ username });
  }

  findOneByUsernameOfFail(username: string): Promise<User> {
    return this.findOneOrFail({ username });
  }
}

export default UserRepository;
