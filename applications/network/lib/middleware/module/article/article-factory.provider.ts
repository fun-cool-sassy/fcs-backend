import { interfaces } from "cheeket";
import { ArticleRepository } from "@fcs/repository";
import { ArticleFactory } from "@fcs/article";
import { Broadcaster } from "@fcs/broadcast";
import {
  ProblemMetricUpdater,
  TargetMetricUpdater,
  UserMetricUpdater,
} from "@fcs/metric";

function articleFactoryProvider(
  articleRepositoryToken: interfaces.Token<ArticleRepository>,
  userMetricUpdaterToken: interfaces.Token<UserMetricUpdater>,
  targetMetricUpdaterToken: interfaces.Token<TargetMetricUpdater>,
  problemMetricUpdaterToken: interfaces.Token<ProblemMetricUpdater>,
  broadcasterToken: interfaces.Token<Broadcaster>
): interfaces.Provider<ArticleFactory> {
  return async (context) => {
    const articleRepository = await context.resolve(articleRepositoryToken);

    const userMetricUpdater = await context.resolve(userMetricUpdaterToken);
    const targetMetricUpdater = await context.resolve(targetMetricUpdaterToken);
    const problemMetricUpdater = await context.resolve(
      problemMetricUpdaterToken
    );

    const broadcaster = await context.resolve(broadcasterToken);

    return new ArticleFactory(
      articleRepository,
      userMetricUpdater,
      targetMetricUpdater,
      problemMetricUpdater,
      broadcaster
    );
  };
}

export default articleFactoryProvider;
