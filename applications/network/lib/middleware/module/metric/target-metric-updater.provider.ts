import { interfaces } from "cheeket";
import { TargetMetricRepository } from "@fcs/repository";
import { TargetMetricUpdater } from "@fcs/metric";

function targetMetricUpdaterProvider(
  targetMetricRepositoryToken: interfaces.Token<TargetMetricRepository>
): interfaces.Provider<TargetMetricUpdater> {
  return async (context) => {
    const targetMetricRepository = await context.resolve(
      targetMetricRepositoryToken
    );

    return new TargetMetricUpdater(targetMetricRepository);
  };
}

export default targetMetricUpdaterProvider;
