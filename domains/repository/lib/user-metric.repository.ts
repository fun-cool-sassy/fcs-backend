import { EntityManager } from "typeorm";
import { UserMetric } from "@fcs/entity";

import Repository from "./repository";

class UserMetricRepository extends Repository<UserMetric> {
  constructor(entityManager: EntityManager) {
    super(entityManager, UserMetric);
  }

  findOneByUserId(userId: string): Promise<UserMetric | undefined> {
    return this.findOne({ userId });
  }

  findOneByUserIdOfFail(userId: string): Promise<UserMetric> {
    return this.findOneOrFail({ userId });
  }
}

export default UserMetricRepository;
