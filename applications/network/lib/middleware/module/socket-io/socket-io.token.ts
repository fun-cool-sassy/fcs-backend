import { interfaces } from "cheeket";
import { Server } from "socket.io";
import { Broadcaster } from "@fcs/broadcast";

const SocketIoToken = Object.freeze({
  Server: Symbol("SocketIo@Server") as interfaces.Token<Server>,
  Broadcaster: Symbol("SocketIo@Broadcaster") as interfaces.Token<Broadcaster>,
});

export default SocketIoToken;
