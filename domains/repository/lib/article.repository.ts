import { Between, EntityManager } from "typeorm";
import { Article, Location } from "@fcs/entity";

import { FindConditions } from "typeorm/find-options/FindConditions";
import Repository from "./repository";

class ArticleRepository extends Repository<Article> {
  constructor(entityManager: EntityManager) {
    super(entityManager, Article);
  }

  findNear(
    location: Location,
    far: number,
    conditions?: FindConditions<Article>
  ): Promise<Article[]> {
    const { latitude, longitude } = location;

    return this.find({
      ...conditions,
      latitude: Between(latitude - far, latitude + far),
      longitude: Between(longitude - far, longitude + far),
    });
  }
}

export default ArticleRepository;
