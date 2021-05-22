import { EntityManager } from "typeorm";
import { ProblemMetric } from "@fcs/entity";

import Repository from "./repository";

class ProblemMetricRepository extends Repository<ProblemMetric> {
  constructor(entityManager: EntityManager) {
    super(entityManager, ProblemMetric);
  }

  findOneByProblem(problem: string): Promise<ProblemMetric | undefined> {
    return this.findOne({ problem });
  }

  findOneByProblemOrFail(problem: string): Promise<ProblemMetric> {
    return this.findOneOrFail({ problem });
  }
}

export default ProblemMetricRepository;
