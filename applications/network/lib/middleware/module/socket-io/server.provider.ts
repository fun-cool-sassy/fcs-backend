import { interfaces } from "cheeket";
import { Server } from "socket.io";
import http from "http";
import { Token as KoaToken } from "@cheeket/koa";

function serverProvider(): interfaces.Provider<Server> {
  return async (context) => {
    const application = await context.resolve(KoaToken.Application);
    const server = http.createServer(application.callback());
    return new Server(server);
  };
}

export default serverProvider;
