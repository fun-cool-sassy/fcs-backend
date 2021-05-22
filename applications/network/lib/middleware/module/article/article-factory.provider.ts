import { interfaces } from "cheeket";
import { ArticleRepository } from "@fcs/repository";
import { ArticleFactory } from "@fcs/article";
import { Broadcaster } from "@fcs/broadcast";

function articleFactoryProvider(
  articleRepositoryToken: interfaces.Token<ArticleRepository>,
  broadcasterToken: interfaces.Token<Broadcaster>
): interfaces.Provider<ArticleFactory> {
  return async (context) => {
    const articleRepository = await context.resolve(articleRepositoryToken);
    const broadcaster = await context.resolve(broadcasterToken);

    return new ArticleFactory(articleRepository, broadcaster);
  };
}

export default articleFactoryProvider;
