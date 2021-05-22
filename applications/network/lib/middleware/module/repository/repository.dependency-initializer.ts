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

  private readonly userMetricRepository = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, UserMetricRepository)
  );

  private readonly userRankRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, UserRankRepository)
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
        this.userMetricRepository
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
  }
}

export default RepositoryDependencyInitializer;
