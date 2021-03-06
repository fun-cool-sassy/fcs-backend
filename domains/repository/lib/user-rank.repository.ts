import { EntityManager } from "typeorm";
import { User, UserMetric, UserRank } from "@fcs/entity";
import { camelCase, snakeCase } from "object-change-case";

class UserRankRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async find(start: number, size: number): Promise<UserRank[]> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select("user_metrics.id", "id")
      .addSelect("user_metrics.user_id", "user_id")
      .addSelect("users.username", "username")
      .addSelect("user_metrics.article_count", "article_count")
      .addSelect(
        "ROW_NUMBER () OVER (ORDER BY user_metrics.article_count DESC)",
        "rank"
      )
      .from(UserMetric, "user_metrics")
      .leftJoin(User, "users", "users.id = user_metrics.user_id")
      .orderBy("user_metrics.updated_at", "DESC")
      .addOrderBy("user_metrics.article_count", "DESC")
      .skip(start - 1)
      .take(size)
      .getRawMany();

    return raw.map((element) => camelCase({ ...element }) as UserRank);
  }

  async findOneByUserId(userId: string): Promise<UserRank> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select("user_metrics.id", "id")
      .addSelect("user_metrics.user_id", "user_id")
      .addSelect("users.username", "username")
      .addSelect("user_metrics.article_count", "article_count")
      .addSelect(
        "ROW_NUMBER () OVER (ORDER BY user_metrics.article_count DESC)",
        "rank"
      )
      .from(UserMetric, "user_metrics")
      .leftJoin(User, "users", "users.id = user_metrics.user_id")
      .andWhere(
        "user_metrics.user_id = :user_id",
        snakeCase({
          userId,
        }) as Record<string, unknown>
      )
      .getRawOne();

    return camelCase({ ...raw }) as UserRank;
  }
}

export default UserRankRepository;
