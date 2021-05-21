import { interfaces } from "cheeket";
import { Server } from "socket.io";
import { Broadcaster } from "@fcs/broadcast";

function broadcasterProvider(
  serverToken: interfaces.Token<Server>,
  room: string
): interfaces.Provider<Broadcaster> {
  return async (context) => {
    const server = await context.resolve(serverToken);
    return new Broadcaster(server, room);
  };
}

export default broadcasterProvider;
