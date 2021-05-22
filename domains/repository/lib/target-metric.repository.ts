import { EntityManager } from "typeorm";
import { TargetMetric } from "@fcs/entity";

import Repository from "./repository";

class TargetMetricRepository extends Repository<TargetMetric> {
  constructor(entityManager: EntityManager) {
    super(entityManager, TargetMetric);
  }

  findOneByTarget(target: string): Promise<TargetMetric | undefined> {
    return this.findOne({ target });
  }

  findOneByTargetOrFail(target: string): Promise<TargetMetric> {
    return this.findOneOrFail({ target });
  }
}

export default TargetMetricRepository;
