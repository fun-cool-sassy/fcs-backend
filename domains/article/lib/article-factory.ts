import { Forbidden } from "http-errors";
import { ArticleRepository } from "@fcs/repository";
import { Article } from "@fcs/entity";
import { Broadcaster, ResourceEvent } from "@fcs/broadcast";
import { UserMetricUpdater } from "@fcs/metric";
import ArticleCreateForm from "./article-create-form";

class ArticleFactory {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userMetricUpdater: UserMetricUpdater,
    private readonly broadcaster: Broadcaster
  ) {}

  async create(form: ArticleCreateForm): Promise<Article> {
    const article = new Article();

    const { owner, ...others } = form;
    Object.assign(article, others);
    if (owner.id == null) {
      throw new Forbidden("Owner is must defined.");
    }
    article.ownerId = owner.id;

    const saved: Article = await this.articleRepository.save(article);

    await this.userMetricUpdater.update(owner.id, 1);

    this.broadcaster.broadcast(
      new ResourceEvent("create", `/articles/${saved.id}`)
    );
    this.broadcaster.broadcast(
      new ResourceEvent("update", `/user-metric/@${owner.id}`)
    );

    return saved;
  }
}

export default ArticleFactory;
