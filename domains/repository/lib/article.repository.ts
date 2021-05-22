import { Between, EntityManager } from "typeorm";
import { Article, Location } from "@fcs/entity";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import Repository from "./repository";

class ArticleRepository extends Repository<Article> {
  constructor(entityManager: EntityManager) {
    super(entityManager, Article);
  }

  async findAndCountNear(
    options: FindManyOptions<Article> & {
      location?: Location;
      far?: number;
    }
  ): Promise<[Article[], number]> {
    const { location, far } = options;
    if (location != null && far != null) {
      const { latitude, longitude } = location;

      return this.findAndCount({
        ...options,
        where: {
          latitude: Between(latitude - far, latitude + far),
          longitude: Between(longitude - far, longitude + far),
        },
      });
    }

    return this.findAndCount(options);
  }
}

export default ArticleRepository;
