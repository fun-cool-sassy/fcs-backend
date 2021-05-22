import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import { inContainerScope } from "cheeket";
import { UserRepository } from "@fcs/repository";
import State from "../../../state";
import repositoryProvider from "./repository.provider";
import { TypeormToken } from "../typeorm";
import RepositoryToken from "./repository.token";

class RepositoryDependencyInitializer implements DependencyInitializer {
  private readonly userRepositoryProvider = inContainerScope(
    repositoryProvider(TypeormToken.EntityManager, UserRepository)
  );

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.root.isBound(RepositoryToken.UserRepository)) {
      context.containers.root.bind(
        RepositoryToken.UserRepository,
        this.userRepositoryProvider
      );
    }
  }
}

export default RepositoryDependencyInitializer;
