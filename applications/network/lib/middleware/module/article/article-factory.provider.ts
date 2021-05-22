import { interfaces } from "cheeket";
import { ArticleRepository } from "@fcs/repository";
import { ArticleFactory } from "@fcs/article";

function articleFactoryProvider(
  articleRepositoryToken: interfaces.Token<ArticleRepository>
): interfaces.Provider<ArticleFactory> {
  return async (context) => {
    const articleRepository = await context.resolve(articleRepositoryToken);
    return new ArticleFactory(articleRepository);
  };
}

export default articleFactoryProvider;
