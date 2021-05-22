import { interfaces } from "cheeket";
import { UserMetricRepository } from "@fcs/repository";
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
