import { interfaces } from "cheeket";
import { ProblemMetricRepository } from "@fcs/repository";
import { ProblemMetricUpdater } from "@fcs/metric";

function problemMetricUpdaterProvider(
  problemMetricRepositoryToken: interfaces.Token<ProblemMetricRepository>
): interfaces.Provider<ProblemMetricUpdater> {
  return async (context) => {
    const problemMetricRepository = await context.resolve(
      problemMetricRepositoryToken
    );

    return new ProblemMetricUpdater(problemMetricRepository);
  };
}

export default problemMetricUpdaterProvider;
