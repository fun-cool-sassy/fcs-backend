import { EntityManager } from "typeorm";
import { User } from "@fcs/entity";

import Repository from "./repository";

class UserRepository extends Repository<User> {
  constructor(entityManager: EntityManager) {
    super(entityManager, User);
  }
}

export default UserRepository;
