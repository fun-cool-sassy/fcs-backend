import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { ParameterizedContext } from "koa";
import { override } from "@course-design/decorators";
import State from "../../../state";

class RepositoryDependencyInitializer implements DependencyInitializer {
  @override
  // eslint-disable-next-line class-methods-use-this
  init(context: ParameterizedContext<State, ContainerContext>): void {}
}

export default RepositoryDependencyInitializer;
