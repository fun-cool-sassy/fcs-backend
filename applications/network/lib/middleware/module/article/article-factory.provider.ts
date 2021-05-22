import { interfaces } from "cheeket";
import { ArticleRepository } from "@fcs/repository";
import { ArticleFactory } from "@fcs/article";
import { Broadcaster } from "@fcs/broadcast";
import { UserMetricUpdater } from "@fcs/metric";

function articleFactoryProvider(
  articleRepositoryToken: interfaces.Token<ArticleRepository>,
  userMetricUpdaterToken: interfaces.Token<UserMetricUpdater>,
  broadcasterToken: interfaces.Token<Broadcaster>
): interfaces.Provider<ArticleFactory> {
  return async (context) => {
    const articleRepository = await context.resolve(articleRepositoryToken);
    const userMetricUpdater = await context.resolve(userMetricUpdaterToken);
    const broadcaster = await context.resolve(broadcasterToken);

    return new ArticleFactory(
      articleRepository,
      userMetricUpdater,
      broadcaster
    );
  };
}

export default articleFactoryProvider;
