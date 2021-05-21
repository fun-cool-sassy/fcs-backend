import { interfaces } from "cheeket";
import { Server } from "socket.io";

const SocketIoToken = Object.freeze({
  Server: Symbol("SocketIo@Server") as interfaces.Token<Server>,
});

export default SocketIoToken;
