import { interfaces } from "cheeket";
import { ArticleRepository, UserMetricRepository } from "@fcs/repository";
import { ArticleFactory } from "@fcs/article";
import { Broadcaster } from "@fcs/broadcast";
import { UserMetricUpdater } from "@fcs/metric";

function userMetricUpdaterProvider(
  userMetricRepositoryToken: interfaces.Token<UserMetricRepository>
): interfaces.Provider<UserMetricUpdater> {
  return async (context) => {
    const userMetricRepository = await context.resolve(
      userMetricRepositoryToken
    );

    return new UserMetricUpdater(userMetricRepository);
  };
}

export default userMetricUpdaterProvider;
