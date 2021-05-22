import { Between, EntityManager } from "typeorm";
import { Article, Location } from "@fcs/entity";

import { FindConditions } from "typeorm/find-options/FindConditions";
import Repository from "./repository";

class ArticleRepository extends Repository<Article> {
  constructor(entityManager: EntityManager) {
    super(entityManager, Article);
  }

  async findNear(
    location: Location,
    far: number,
    conditions?: FindConditions<Article>
  ): Promise<Article[]> {
    const { latitude, longitude } = location;

    const articles = await this.find({
      ...conditions,
      latitude: Between(latitude - far, latitude + far),
      longitude: Between(longitude - far, longitude + far),
    });

    const squaredFar = far ** 2;
    return articles.filter((article) => {
      const diffOfLatitude = Math.abs(latitude - article.longitude);
      const diffOfLongitude = Math.abs(longitude - article.longitude);

      return diffOfLatitude ** 2 + diffOfLongitude ** 2 <= squaredFar;
    });
  }
}

export default ArticleRepository;
