import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import { inContainerScope } from "cheeket";
import {
  ArticleRepository,
  ProblemMetricRepository,
  ProblemRankRepository,
  TargetMetricRepository,
  TargetRankRepository,
  UserMetricRepository,
  UserRankRepository,
  UserRepository,
} from "@fcs/repository";

import State from "../../../state";
import repositoryProvider from "./repository.provider";
import { TypeormToken } from "../typeorm";
import RepositoryToken from "./repository.token";

class RepositoryDependencyInitializer implements DependencyInitializer {
  private readonly userRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, UserRepository)
  );

  private readonly articleRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, ArticleRepository)
  );

  private readonly userMetricRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, UserMetricRepository)
  );

  private readonly userRankRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, UserRankRepository)
  );

  private readonly problemMetricRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, ProblemMetricRepository)
  );

  private readonly problemRankRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, ProblemRankRepository)
  );

  private readonly targetMetricRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, TargetMetricRepository)
  );

  private readonly targetRankRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, TargetRankRepository)
  );

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.context.isBound(RepositoryToken.UserRepository)) {
      context.containers.context.bind(
        RepositoryToken.UserRepository,
        this.userRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(RepositoryToken.ArticleRepository)
    ) {
      context.containers.context.bind(
        RepositoryToken.ArticleRepository,
        this.articleRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(RepositoryToken.UserMetricRepository)
    ) {
      context.containers.context.bind(
        RepositoryToken.UserMetricRepository,
        this.userMetricRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(RepositoryToken.UserRankRepository)
    ) {
      context.containers.context.bind(
        RepositoryToken.UserRankRepository,
        this.userRankRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(
        RepositoryToken.ProblemMetricRepository
      )
    ) {
      context.containers.context.bind(
        RepositoryToken.ProblemMetricRepository,
        this.problemMetricRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(RepositoryToken.ProblemRankRepository)
    ) {
      context.containers.context.bind(
        RepositoryToken.ProblemRankRepository,
        this.problemRankRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(
        RepositoryToken.TargetMetricRepository
      )
    ) {
      context.containers.context.bind(
        RepositoryToken.TargetMetricRepository,
        this.targetMetricRepositoryProvider
      );
    }
    if (
      !context.containers.context.isBound(RepositoryToken.TargetRankRepository)
    ) {
      context.containers.context.bind(
        RepositoryToken.TargetRankRepository,
        this.targetRankRepositoryProvider
      );
    }
  }
}

export default RepositoryDependencyInitializer;
