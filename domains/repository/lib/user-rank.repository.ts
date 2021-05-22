import { EntityManager } from "typeorm";
import { Article, User, UserRank } from "@fcs/entity";
import { camelCase, snakeCase } from "object-change-case";

function parseRaw(raw: Omit<UserRank, "id">): UserRank {
  return {
    id: raw.userId,
    ...raw,
  };
}

class UserRankRepository {
  constructor(private readonly entityManager: EntityManager) {}

  async find(start: number, size: number): Promise<UserRank[]> {
    const queryBuilder = this.entityManager.createQueryBuilder();

    const raw = await queryBuilder
      .select()
      .select("user.id", "user_id")
      .addSelect("COUNT(*)", "article_count")
      .addSelect("ROW_NUMBER () OVER (ORDER BY COUNT(*) DESC)", "rank")
      .from(User, "user")
      .leftJoin(Article, "article", "article.owner_id = user.id")
      .groupBy("article.owner_id")
      .orderBy("COUNT(*)", "DESC")
      .skip(start - 1)
      .take(size)
      .getRawMany();

    return raw.map((element) =>
      parseRaw(camelCase({ ...element }) as Omit<UserRank, "id">)
    );
  }

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

    return parseRaw(camelCase({ ...raw }) as Omit<UserRank, "id">);
  }
}

export default UserRankRepository;
