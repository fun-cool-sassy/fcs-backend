import { Between, EntityManager } from "typeorm";
import { Article, Location } from "@fcs/entity";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import Repository from "./repository";

class ArticleRepository extends Repository<Article> {
  constructor(entityManager: EntityManager) {
    super(entityManager, Article);
  }

  async findAndCountNear(
    location: Location,
    far: number,
    options?: FindManyOptions<Article>
  ): Promise<[Article[], number]> {
    const { latitude, longitude } = location;

    return this.findAndCount({
      ...options,
      where: {
        latitude: Between(latitude - far, latitude + far),
        longitude: Between(longitude - far, longitude + far),
      },
    });
  }
}

export default ArticleRepository;
