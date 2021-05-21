import { Server } from "socket.io";
import {Container} from "cheeket";

function routes(io: Server, container: Container) {
  io.on("connection",  (socket) => {
    console.debug(socket)
  })
}

export default routes