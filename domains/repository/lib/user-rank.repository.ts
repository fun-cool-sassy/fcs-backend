import { EntityManager } from "typeorm";
import { Article, User, UserRank } from "@fcs/entity";
import { snakeCase } from "object-change-case";

class UserRankRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async findOne(id: string): Promise<UserRank> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select()
      .select("user.id", "user_id")
      .addSelect("COUNT(*)", "article_count")
      .addSelect("ROW_NUMBER () OVER (ORDER BY COUNT(*) DESC)", "rank")
      .from(User, "user")
      .leftJoin(Article, "article", "article.owner_id = user.id")
      .andWhere(
        "user.id = :user_id",
        snakeCase({
          userId: id,
        }) as Record<string, unknown>
      )
      .groupBy("article.owner_id")
      .getRawOne();

    return raw as UserRank;
  }
}

export default UserRankRepository;
