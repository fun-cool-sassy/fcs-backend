import { EntityManager } from "typeorm";
import { ProblemMetric, ProblemRank } from "@fcs/entity";
import { camelCase } from "object-change-case";

class ProblemRankRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async find(start: number, size: number): Promise<ProblemRank[]> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select("problem_metrics.id", "id")
      .addSelect("problem_metrics.problem", "problem")
      .addSelect("problem_metrics.count", "count")
      .addSelect(
        "ROW_NUMBER () OVER (ORDER BY problem_metrics.count DESC)",
        "rank"
      )
      .from(ProblemMetric, "problem_metrics")
      .orderBy("problem_metrics.count", "DESC")
      .skip(start - 1)
      .take(size)
      .getRawMany();

    return raw.map((element) => camelCase({ ...element }) as ProblemRank);
  }

  async findOneByProblem(problem: string): Promise<ProblemRank> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select("problem_metrics.id", "id")
      .addSelect("problem_metrics.problem", "problem")
      .addSelect("problem_metrics.count", "count")
      .addSelect(
        "ROW_NUMBER () OVER (ORDER BY problem_metrics.count DESC)",
        "rank"
      )
      .from(ProblemMetric, "problem_metrics")
      .andWhere("problem_metrics.problem = :problem", {
        problem,
      })
      .getRawOne();

    return camelCase({ ...raw }) as ProblemRank;
  }
}

export default ProblemRankRepository;
