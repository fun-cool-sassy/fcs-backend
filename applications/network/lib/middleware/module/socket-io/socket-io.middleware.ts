import Application from "koa";
import { use } from "@cheeket/koa";

import Context from "../../../context";
import State from "../../../state";
import SocketIoDependencyInitializer from "./socket-io.dependency-initializer";
import SocketIoToken from "./socket-io.token";

function socketIo(): Application.Middleware<State, Context> {
  return use(new SocketIoDependencyInitializer(), async (context, next) => {
    await context.resolve(SocketIoToken.Server);

    await next();
  });
}

export default socketIo;
