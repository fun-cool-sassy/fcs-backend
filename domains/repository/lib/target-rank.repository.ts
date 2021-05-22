import { EntityManager } from "typeorm";
import { TargetMetric, TargetRank } from "@fcs/entity";
import { camelCase } from "object-change-case";

class TargetRankRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async find(start: number, size: number): Promise<TargetRank[]> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select("target_metrics.id", "id")
      .addSelect("target_metrics.target", "target")
      .addSelect("target_metrics.count", "count")
      .addSelect(
        "ROW_NUMBER () OVER (ORDER BY target_metrics.count DESC)",
        "rank"
      )
      .from(TargetMetric, "target_metrics")
      .orderBy("target_metrics.count", "DESC")
      .addOrderBy("target_metrics.updated_at", "DESC")
      .skip(start - 1)
      .take(size)
      .getRawMany();

    return raw.map((element) => camelCase({ ...element }) as TargetRank);
  }

  async findOneByTarget(target: string): Promise<TargetRank> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select("target_metrics.id", "id")
      .addSelect("target_metrics.target", "target")
      .addSelect("target_metrics.count", "count")
      .addSelect(
        "ROW_NUMBER () OVER (ORDER BY target_metrics.count DESC)",
        "rank"
      )
      .from(TargetMetric, "target_metrics")
      .andWhere("target_metrics.target = :target", {
        target,
      })
      .getRawOne();

    return camelCase({ ...raw }) as TargetRank;
  }
}

export default TargetRankRepository;
