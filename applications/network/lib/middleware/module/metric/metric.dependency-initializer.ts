import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import { inContainerScope } from "cheeket";
import {
  ArticleRepository,
  UserMetricRepository,
  UserRankRepository,
  UserRepository,
} from "@fcs/repository";

import State from "../../../state";
import { TypeormToken } from "../typeorm";
import userMetricUpdaterProvider from "./user-metric-updater.provider";
import {RepositoryToken} from "../repository";
import MetricToken from "./metric.token";

class MetricDependencyInitializer implements DependencyInitializer {
  private readonly userMetricUpdaterProvider = inContainerScope(
    userMetricUpdaterProvider(RepositoryToken.UserMetricRepository)
  );

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.context.isBound(MetricToken.UserMetricUpdater)) {
      context.containers.context.bind(
        MetricToken.UserMetricUpdater,
        this.userMetricUpdaterProvider
      );
    }
  }
}

export default MetricDependencyInitializer;
