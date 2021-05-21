import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { override } from "@course-design/decorators";
import { ParameterizedContext } from "koa";
import { inSingletonScope } from "cheeket";
import State from "../../../state";
import serverProvider from "./server.provider";
import SocketIoToken from "./socket-io.token";

class SocketIoDependencyInitializer implements DependencyInitializer {
  private readonly serverProvider = inSingletonScope(serverProvider());

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.root.isBound(SocketIoToken.Server)) {
      context.containers.root.bind(SocketIoToken.Server, this.serverProvider);
    }
  }
}

export default SocketIoDependencyInitializer;
