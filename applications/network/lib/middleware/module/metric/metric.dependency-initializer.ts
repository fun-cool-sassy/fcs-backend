import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import { inContainerScope } from "cheeket";

import State from "../../../state";
import { RepositoryToken } from "../repository";
import MetricToken from "./metric.token";
import userMetricUpdaterProvider from "./user-metric-updater.provider";
import targetMetricUpdaterProvider from "./target-metric-updater.provider";
import problemMetricUpdaterProvider from "./problem-metric-updater.provider";

class MetricDependencyInitializer implements DependencyInitializer {
  private readonly userMetricUpdaterProvider = inContainerScope(
    userMetricUpdaterProvider(RepositoryToken.UserMetricRepository)
  );

  private readonly targetMetricUpdaterProvider = inContainerScope(
    targetMetricUpdaterProvider(RepositoryToken.TargetMetricRepository)
  );

  private readonly problemMetricUpdaterProvider = inContainerScope(
    problemMetricUpdaterProvider(RepositoryToken.ProblemMetricRepository)
  );

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.context.isBound(MetricToken.UserMetricUpdater)) {
      context.containers.context.bind(
        MetricToken.UserMetricUpdater,
        this.userMetricUpdaterProvider
      );
    }
    if (!context.containers.context.isBound(MetricToken.TargetMetricUpdater)) {
      context.containers.context.bind(
        MetricToken.TargetMetricUpdater,
        this.targetMetricUpdaterProvider
      );
    }
    if (!context.containers.context.isBound(MetricToken.ProblemMetricUpdater)) {
      context.containers.context.bind(
        MetricToken.ProblemMetricUpdater,
        this.problemMetricUpdaterProvider
      );
    }
  }
}

export default MetricDependencyInitializer;
