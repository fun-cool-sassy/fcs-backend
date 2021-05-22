import { Forbidden } from "http-errors";
import { ArticleRepository } from "@fcs/repository";
import { Article } from "@fcs/entity";
import ArticleCreateForm from "./article-create-form";

class ArticleFactory {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async create(form: ArticleCreateForm): Promise<Article> {
    const article = new Article();

    const { owner, ...others } = form;
    Object.assign(article, others);
    if (owner.id == null) {
      throw new Forbidden("Owner is must defined.");
    }
    article.ownerId = owner.id;

    return this.articleRepository.save(article);
  }
}

export default ArticleFactory;
