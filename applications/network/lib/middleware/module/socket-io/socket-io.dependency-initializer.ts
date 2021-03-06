import { ContainerContext, DependencyInitializer } from "@cheeket/koa";
import { override } from "@course-design/decorators";
import { ParameterizedContext } from "koa";
import { inSingletonScope } from "cheeket";
import State from "../../../state";
import serverProvider from "./server.provider";
import SocketIoToken from "./socket-io.token";
import broadcasterProvider from "./broadcaster.provider";

class SocketIoDependencyInitializer implements DependencyInitializer {
  private readonly serverProvider = inSingletonScope(serverProvider());

  private readonly broadcasterProvider = inSingletonScope(
    broadcasterProvider(SocketIoToken.Server, "/events")
  );

  @override
  init(context: ParameterizedContext<State, ContainerContext>): void {
    if (!context.containers.root.isBound(SocketIoToken.Server)) {
      context.containers.root.bind(SocketIoToken.Server, this.serverProvider);
    }
    if (!context.containers.root.isBound(SocketIoToken.Broadcaster)) {
      context.containers.root.bind(
        SocketIoToken.Broadcaster,
        this.broadcasterProvider
      );
    }
  }
}

export default SocketIoDependencyInitializer;
