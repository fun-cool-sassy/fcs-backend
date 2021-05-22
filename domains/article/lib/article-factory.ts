import {ArticleRepository} from "@fcs/repository";
import {Article} from "@fcs/entity";
import ArticleCreateForm from "./article-create-form";

class ArticleFactory {
  constructor(
    private readonly articleRepository: ArticleRepository
  ) {}

  async create(form: ArticleCreateForm): Promise<Article> {
    const article = new Article();

    Object.assign(article, form);

    return this.articleRepository.save(article);
  }
}

export default ArticleFactory;
